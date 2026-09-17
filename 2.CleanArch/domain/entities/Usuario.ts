// ============================================================
// CAMADA: DOMAIN (Entities)
// ------------------------------------------------------------
// Regra: não importa NADA de fora (nem banco, nem framework,
// nem HTTP). É o coração do sistema - regras de negócio puras.
// ============================================================

export class Usuario {
  private constructor(
    public readonly id: string,
    public readonly nome: string,
    public readonly email: string
  ) {}

  // Regra de negócio pertence à entidade, não ao banco nem ao controller
  static criar(id: string, nome: string, email: string): Usuario {
    if (!nome || nome.trim().length < 3) {
      throw new Error('Nome deve ter ao menos 3 caracteres');
    }

    if (!Usuario.emailValido(email)) {
      throw new Error('Email inválido');
    }

    return new Usuario(id, nome.trim(), email.toLowerCase());
  }

  private static emailValido(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
