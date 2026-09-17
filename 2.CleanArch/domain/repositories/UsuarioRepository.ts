// ============================================================
// CAMADA: DOMAIN (Repository Interface / Porta)
// ------------------------------------------------------------
// Regra: o DOMÍNIO define o CONTRATO (interface), mas não sabe
// e não quer saber COMO os dados são salvos (Postgres? Mongo?
// arquivo? memória?). Isso é "Dependency Inversion Principle":
// a camada de fora (infra) é quem depende dessa interface,
// e não o contrário.
// ============================================================

import { Usuario } from '../entities/Usuario';

export interface UsuarioRepository {
  salvar(usuario: Usuario): Promise<void>;
  buscarPorEmail(email: string): Promise<Usuario | null>;
}
