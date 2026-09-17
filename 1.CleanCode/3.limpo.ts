// 3.limpo.ts
// Refatoração de 3.sujo.ts
// Técnicas aplicadas: Extract Class (Single Responsibility Principle),
// Guard Clauses, Remove Dead Code, Remove Duplicated Code

interface Item {
  preco: number;
  quantidade: number;
  peso?: number;
}

interface Cliente {
  nome: string;
  email: string;
}

class Pedido {
  constructor(
    public readonly itens: Item[],
    public readonly cliente: Cliente,
    public status: string = 'novo'
  ) {}

  calcularTotal(): number {
    return this.itens.reduce((total, item) => total + item.preco * item.quantidade, 0);
  }
}

class CalculadoraFrete {
  private readonly VALOR_POR_KG = 5;

  calcular(pedido: Pedido): number {
    const pesoTotal = pedido.itens.reduce((peso, item) => peso + (item.peso ?? 1), 0);
    return pesoTotal * this.VALOR_POR_KG;
  }
}

class NotificadorEmail {
  enviarConfirmacao(cliente: Cliente): void {
    if (!this.emailValido(cliente.email)) {
      console.log('Email inválido, notificação não enviada.');
      return;
    }
    console.log(`Enviando email para ${cliente.email}`);
  }

  private emailValido(email: string): boolean {
    return email.includes('@');
  }
}

class EmissorNotaFiscal {
  gerar(pedido: Pedido): void {
    console.log(`Gerando nota fiscal para pedido de ${pedido.cliente.nome}`);
  }
}

class PedidoRepository {
  salvar(pedido: Pedido): void {
    console.log('Salvando pedido no banco...');
  }
}

class ServicoPedido {
  constructor(
    private readonly repository: PedidoRepository,
    private readonly notificador: NotificadorEmail,
    private readonly emissorNota: EmissorNotaFiscal,
    private readonly calculadoraFrete: CalculadoraFrete
  ) {}

  finalizar(pedido: Pedido): void {
    const total = pedido.calcularTotal();
    const frete = this.calculadoraFrete.calcular(pedido);

    console.log(`Total: R$${total} | Frete: R$${frete}`);

    this.repository.salvar(pedido);
    this.emissorNota.gerar(pedido);
    this.notificador.enviarConfirmacao(pedido.cliente);
  }
}

const pedido = new Pedido(
  [{ preco: 10, quantidade: 2, peso: 1 }],
  { nome: 'João', email: 'joao@teste.com' }
);

const servico = new ServicoPedido(
  new PedidoRepository(),
  new NotificadorEmail(),
  new EmissorNotaFiscal(),
  new CalculadoraFrete()
);

servico.finalizar(pedido);

export { Pedido, ServicoPedido, CalculadoraFrete, NotificadorEmail, EmissorNotaFiscal, PedidoRepository };
