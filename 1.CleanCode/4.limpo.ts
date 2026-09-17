// 4.limpo.ts
// Refatoração de 4.sujo.ts
// Técnica aplicada: Replace Conditional with Polymorphism (Open/Closed Principle)

interface TipoCliente {
  calcularDesconto(valor: number): number;
  calcularPrazoEntregaEmDias(): number;
}

class ClienteVip implements TipoCliente {
  calcularDesconto(valor: number): number {
    return valor > 0 ? valor * 0.15 : 0;
  }

  calcularPrazoEntregaEmDias(): number {
    return 1;
  }
}

class ClienteRegular implements TipoCliente {
  private readonly VALOR_MINIMO_DESCONTO_MAIOR = 100;

  calcularDesconto(valor: number): number {
    if (valor <= 0) return 0;
    return valor > this.VALOR_MINIMO_DESCONTO_MAIOR ? valor * 0.07 : valor * 0.05;
  }

  calcularPrazoEntregaEmDias(): number {
    return 3;
  }
}

class ClienteNovo implements TipoCliente {
  calcularDesconto(_valor: number): number {
    return 0;
  }

  calcularPrazoEntregaEmDias(): number {
    return 5;
  }
}

const clienteVip = new ClienteVip();
console.log(clienteVip.calcularDesconto(200), clienteVip.calcularPrazoEntregaEmDias());

export { TipoCliente, ClienteVip, ClienteRegular, ClienteNovo };
