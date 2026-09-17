// 1.limpo.ts
// Refatoração de 1.sujo.ts
// Técnicas aplicadas: Extract Method, Replace Nested Conditional with Guard Clauses,
// Remove Dead Code, Remove Duplicated Code, Rename Variable (nomes descritivos)

interface Item {
  preco: number;
  quantidade: number;
}

interface Cliente {
  nome: string;
  tipo: 'vip' | 'regular' | 'novo';
}

interface Pedido {
  itens: Item[];
  cliente: Cliente;
  formaPagamento: 'boleto' | 'cartao' | 'pix';
}

function calcularSubtotal(itens: Item[]): number {
  return itens.reduce((total, item) => total + item.preco * item.quantidade, 0);
}

function aplicarDescontoPorTipoCliente(subtotal: number, cliente: Cliente): number {
  const DESCONTO_VIP = 0.15;
  const DESCONTO_REGULAR = 0.05;
  const VALOR_MINIMO_DESCONTO_REGULAR = 100;

  if (cliente.tipo === 'vip') {
    return subtotal * (1 - DESCONTO_VIP);
  }

  if (cliente.tipo === 'regular' && subtotal > VALOR_MINIMO_DESCONTO_REGULAR) {
    return subtotal * (1 - DESCONTO_REGULAR);
  }

  return subtotal;
}

function aplicarTaxaBoleto(total: number, formaPagamento: Pedido['formaPagamento']): number {
  const TAXA_BOLETO = 0.02;
  return formaPagamento === 'boleto' ? total * (1 + TAXA_BOLETO) : total;
}

function processarPedido(pedido: Pedido): number {
  const subtotal = calcularSubtotal(pedido.itens);
  const totalComDesconto = aplicarDescontoPorTipoCliente(subtotal, pedido.cliente);
  const totalFinal = aplicarTaxaBoleto(totalComDesconto, pedido.formaPagamento);

  console.log(`Pedido do cliente ${pedido.cliente.nome} - Total: R$${totalFinal.toFixed(2)}`);
  return totalFinal;
}

export { processarPedido, calcularSubtotal, aplicarDescontoPorTipoCliente, aplicarTaxaBoleto };
