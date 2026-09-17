// ============================================================
// CAMADA: INFRASTRUCTURE (Frameworks & Drivers)
// ------------------------------------------------------------
// Regra: aqui vivem os DETALHES - banco de dados, ORM, etc.
// Essa classe IMPLEMENTA a interface definida no domínio.
// Se amanhã trocar de "memória" para Postgres/Prisma, só essa
// classe muda - o resto do sistema nem percebe.
// ============================================================

import { Usuario } from '../../domain/entities/Usuario';
import { UsuarioRepository } from '../../domain/repositories/UsuarioRepository';

export class UsuarioRepositoryMemoria implements UsuarioRepository {
  private usuarios: Usuario[] = [];

  async salvar(usuario: Usuario): Promise<void> {
    this.usuarios.push(usuario);
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    const usuario = this.usuarios.find((u) => u.email === email);
    return usuario ?? null;
  }
}

// Exemplo de como seria com Prisma (comentado, só para efeito didático):
//
// export class UsuarioRepositoryPrisma implements UsuarioRepository {
//   constructor(private readonly prisma: PrismaClient) {}
//
//   async salvar(usuario: Usuario): Promise<void> {
//     await this.prisma.usuario.create({ data: { ...usuario } });
//   }
//
//   async buscarPorEmail(email: string): Promise<Usuario | null> {
//     return this.prisma.usuario.findUnique({ where: { email } });
//   }
// }
