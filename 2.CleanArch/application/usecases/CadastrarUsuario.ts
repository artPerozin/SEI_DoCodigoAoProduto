// ============================================================
// CAMADA: APPLICATION (Use Cases)
// ------------------------------------------------------------
// Regra: orquestra a regra de negócio (o "verbo" do sistema:
// "cadastrar usuário"). Depende SOMENTE de abstrações do
// domínio (interfaces), nunca de implementações concretas
// (Prisma, Express, Axios, etc). Isso permite trocar o banco
// ou o framework HTTP sem tocar nessa camada.
// ============================================================

import { Usuario } from '../../domain/entities/Usuario';
import { UsuarioRepository } from '../../domain/repositories/UsuarioRepository';
import { EmailJaCadastradoError } from '../../domain/errors/EmailJaCadastradoError';

export interface CadastrarUsuarioInput {
  id: string;
  nome: string;
  email: string;
}

export interface CadastrarUsuarioOutput {
  id: string;
  nome: string;
  email: string;
}

export class CadastrarUsuario {
  // Injeção de dependência: o caso de uso RECEBE a implementação,
  // não a cria. Isso é o que torna o código testável e desacoplado.
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async executar(input: CadastrarUsuarioInput): Promise<CadastrarUsuarioOutput> {
    const usuarioExistente = await this.usuarioRepository.buscarPorEmail(input.email);

    if (usuarioExistente) {
      throw new EmailJaCadastradoError(input.email);
    }

    const usuario = Usuario.criar(input.id, input.nome, input.email);

    await this.usuarioRepository.salvar(usuario);

    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    };
  }
}
