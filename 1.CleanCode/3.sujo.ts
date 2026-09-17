// 3.sujo.ts
// Smells: God Object/Large Class, Código Morto, Código Duplicado,
// Nomes impróprios, Condicionais aninhadas

class Pedido {
  itens: any[];
  cliente: any;
  status: string;

  constructor(itens: any[], cliente: any) {
    this.itens = itens;
    this.cliente = cliente;
    this.status = 'novo';
  }

  calc() {
    let t = 0;
    for (let i = 0; i < this.itens.length; i++) {
      t += this.itens[i].preco * this.itens[i].quantidade;
    }
    return t;
  }

  // método nunca chamado por ninguém - código morto
  calcAntigo() {
    let t = 0;
    for (let i = 0; i < this.itens.length; i++) {
      t = t + this.itens[i].preco;
    }
    return t * this.itens.length;
  }

  enviaEmail() {
    if (this.cliente) {
      if (this.cliente.email) {
        if (this.cliente.email.includes('@')) {
          console.log('Enviando email para ' + this.cliente.email);
        } else {
          console.log('email invalido');
        }
      }
    }
  }

  geraNota() {
    console.log('Gerando nota fiscal para pedido de ' + this.cliente.nome);
  }

  salva() {
    console.log('Salvando pedido no banco...');
  }

  log() {
    console.log('LOG: pedido processado');
  }

  calcFrete() {
    // lógica de frete duplicada (mesmo cálculo do método calcFrete2)
    let peso = 0;
    for (let i = 0; i < this.itens.length; i++) {
      peso += this.itens[i].peso || 1;
    }
    return peso * 5;
  }

  calcFrete2() {
    let peso = 0;
    for (let i = 0; i < this.itens.length; i++) {
      peso += this.itens[i].peso || 1;
    }
    return peso * 5;
  }
}

const p = new Pedido([{ preco: 10, quantidade: 2, peso: 1 }], { nome: 'João', email: 'joao@teste.com' });
p.calc();
p.enviaEmail();
p.geraNota();
p.salva();
p.log();
