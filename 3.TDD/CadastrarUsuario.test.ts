// CadastrarUsuario.test.ts
//
// Testando a camada de APPLICATION (caso de uso).
// Criamos um repositório "Memory" (test double) implementando a
// interface UsuarioRepository, para isolar o teste de qualquer
// banco de dados real. Isso só é possível porque o caso de uso
// depende de uma ABSTRAÇÃO (interface), e não de uma implementação
// concreta - Dependency Inversion Principle na prática.

import { CadastrarUsuario } from "../2.CleanArch/application/usecases/CadastrarUsuario";
import { Usuario } from "../2.CleanArch/domain/entities/Usuario";
import { EmailJaCadastradoError } from "../2.CleanArch/domain/errors/EmailJaCadastradoError";
import { UsuarioRepository } from "../2.CleanArch/domain/repositories/UsuarioRepository";


class UsuarioRepositoryMemory implements UsuarioRepository {
    public usuariosSalvos: Usuario[] = [];

    async salvar(usuario: Usuario): Promise<void> {
        this.usuariosSalvos.push(usuario);
    }

    async buscarPorEmail(email: string): Promise<Usuario | null> {
        return this.usuariosSalvos.find((u) => u.email === email) ?? null;
    }
}

describe('CadastrarUsuario (caso de uso)', () => {
    let repositorio: UsuarioRepositoryMemory;
    let cadastrarUsuario: CadastrarUsuario;

    beforeEach(() => {
        repositorio = new UsuarioRepositoryMemory();
        cadastrarUsuario = new CadastrarUsuario(repositorio);
    });

    it('deve cadastrar um usuário novo com sucesso', async () => {
        const resultado = await cadastrarUsuario.executar({
            id: '1',
            nome: 'Maria Silva',
            email: 'maria@teste.com'
        });

        expect(resultado).toEqual({
            id: '1',
            nome: 'Maria Silva',
            email: 'maria@teste.com'
        });
    });

    it('deve persistir o usuário no repositório', async () => {
        await cadastrarUsuario.executar({
            id: '1',
            nome: 'Maria Silva',
            email: 'maria@teste.com'
        });

        expect(repositorio.usuariosSalvos).toHaveLength(1);
        expect(repositorio.usuariosSalvos[0].email).toBe('maria@teste.com');
    });

    it('não deve permitir cadastrar dois usuários com o mesmo email', async () => {
        await cadastrarUsuario.executar({
            id: '1',
            nome: 'Maria Silva',
            email: 'maria@teste.com'
        });

        await expect(
            cadastrarUsuario.executar({
                id: '2',
                nome: 'Maria Souza',
                email: 'maria@teste.com'
            })
        ).rejects.toThrow(EmailJaCadastradoError);

        expect(repositorio.usuariosSalvos).toHaveLength(1);
    });

    it('deve propagar erro de validação vindo da entidade (nome inválido)', async () => {
        await expect(
            cadastrarUsuario.executar({ id: '1', nome: 'Jo', email: 'jo@teste.com' })
        ).rejects.toThrow('Nome deve ter ao menos 3 caracteres');
    });
});