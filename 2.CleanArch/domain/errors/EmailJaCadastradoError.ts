// ============================================================
// CAMADA: DOMAIN (Errors)
// ------------------------------------------------------------
// Erros de negócio também são conceitos do domínio, não devem
// ser "throw new Error()" genéricos espalhados pelo código.
// ============================================================

export class EmailJaCadastradoError extends Error {
  constructor(email: string) {
    super(`O email "${email}" já está cadastrado`);
    this.name = 'EmailJaCadastradoError';
  }
}
