// 2.limpo.ts
// Refatoração de 2.sujo.ts
// Técnicas aplicadas: Extract Class, Replace Primitive with Object,
// Remove Duplicated Code, Rename Variable/Method

class Cep {
  private readonly valor: string;

  constructor(valor: string) {
    if (!Cep.ehValido(valor)) {
      throw new Error(`CEP inválido: ${valor}`);
    }
    this.valor = valor;
  }

  static ehValido(valor: string): boolean {
    return valor.length === 8;
  }

  toString(): string {
    return this.valor;
  }
}

class Endereco {
  constructor(
    private readonly rua: string,
    private readonly cidade: string,
    private readonly cep: Cep,
    private readonly estado: string
  ) {}

  formatado(): string {
    return `${this.rua} ${this.cidade} ${this.estado} ${this.cep}`;
  }
}

class Usuario {
  constructor(
    private readonly nome: string,
    private readonly enderecoCobranca: Endereco,
    private readonly enderecoEntrega: Endereco
  ) {}

  get nomeCompleto(): string {
    return this.nome;
  }
}

const enderecoCobranca = new Endereco('Rua A', 'Joinville', new Cep('89201000'), 'SC');
const enderecoEntrega = new Endereco('Rua B', 'Blumenau', new Cep('89010000'), 'SC');
const usuario = new Usuario('Maria', enderecoCobranca, enderecoEntrega);

console.log(enderecoCobranca.formatado());

export { Cep, Endereco, Usuario };
