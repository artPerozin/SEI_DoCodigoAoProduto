// 2.sujo.ts
// Smells: Primitive Obsession, Data Clumps, Nomes impróprios,
// Loops aninhados desnecessários, Código duplicado

function criaUsr(n: string, r: string, c: string, cep: string, e: string, r2: string, c2: string, cep2: string, e2: string) {
  // r, c, cep, e sempre andam juntos (endereço de cobrança)
  // r2, c2, cep2, e2 também sempre andam juntos (endereço de entrega) -> Data Clump duplicado
  return {
    n,
    r, c, cep, e,
    r2, c2, cep2, e2
  };
}

function valCep(cp: string) {
  // cep é uma string primitiva solta, sem nenhuma regra encapsulada
  if (cp.length === 8) {
    return true;
  } else {
    return false;
  }
}

// mesma validação copiada e colada em outra função - duplicação
function valCep2(cp: string) {
  if (cp.length === 8) {
    return true;
  } else {
    return false;
  }
}

function formataEndereco(u: any) {
  let s = '';
  // loop aninhado sem necessidade nenhuma, só para "percorrer" 2 campos
  const campos = [u.r, u.c];
  for (let i = 0; i < campos.length; i++) {
    for (let j = 0; j < 1; j++) {
      s += campos[i] + ' ';
    }
  }
  return s + u.e + ' ' + u.cep;
}

const usuario1 = criaUsr('Maria', 'Rua A', 'Joinville', '89201000', 'SC', 'Rua B', 'Blumenau', '89010000', 'SC');
console.log(valCep(usuario1.cep), valCep2(usuario1.cep2));
