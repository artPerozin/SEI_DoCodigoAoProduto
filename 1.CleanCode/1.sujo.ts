// 1.sujo.ts
// Smells: Long Method, Complex/Nested Conditionals, Nested Loops,
// Dead Code, Duplicated Code, Nomes impróprios (variáveis genéricas: x, y, temp, flag)

function proc(p: any) {
  let t = 0;
  let flag = false;

  // loop aninhado desnecessário (poderia ser um único reduce)
  for (let i = 0; i < p.itens.length; i++) {
    let x = p.itens[i];
    for (let j = 0; j < 1; j++) {
      t = t + x.preco * x.quantidade;
    }
  }

  // if/else aninhado demais
  if (p.cliente) {
    if (p.cliente.tipo === 'vip') {
      if (t > 0) {
        t = t - (t * 0.15);
      } else {
        t = t;
      }
    } else {
      if (p.cliente.tipo === 'regular') {
        if (t > 100) {
          t = t - (t * 0.05);
        } else {
          if (t > 50) {
            // código morto: essa condição nunca resolve nada de fato
            flag = true;
          }
        }
      } else {
        if (p.cliente.tipo === 'novo') {
          t = t;
        }
      }
    }
  }

  // código duplicado (mesma lógica de taxa de pagamento repetida duas vezes)
  if (p.formaPagamento === 'boleto') {
    t = t + (t * 0.02);
  }
  if (p.formaPagamento == 'boleto') {
    t = t + (t * 0.02) * 0; // resquício de bug, código morto
  }

  // variável nunca usada depois - código morto
  let y = t * 2;

  console.log('Pedido do cliente ' + p.cliente.nome + ' - Total: R$' + t);
  return t;
}

// função nunca chamada em lugar nenhum - código morto
function funcaoAntiga(a: number, b: number) {
  return a + b;
}

export { proc };
