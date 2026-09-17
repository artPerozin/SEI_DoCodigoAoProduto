// 4.sujo.ts
// Smells: Switch Statements repetidos, Condicionais aninhadas,
// Código Morto, Nomes impróprios

function calcDesc(tp: string, v: number) {
  let r = 0;
  switch (tp) {
    case 'vip':
      if (v > 0) {
        r = v * 0.15;
      } else {
        r = 0;
      }
      break;
    case 'regular':
      if (v > 0) {
        if (v > 100) {
          r = v * 0.07;
        } else {
          r = v * 0.05;
        }
      }
      break;
    case 'novo':
      r = 0;
      break;
    default:
      // código morto: essa condição nunca é atingida no fluxo real do sistema
      throw new Error('Tipo inválido');
  }
  return r;
}

// mesmo switch repetido em outra função, só mudando o que retorna - duplicação
function calcPrazo(tp: string) {
  let r = 0;
  switch (tp) {
    case 'vip':
      r = 1;
      break;
    case 'regular':
      r = 3;
      break;
    case 'novo':
      r = 5;
      break;
    default:
      throw new Error('Tipo inválido');
  }
  return r;
}

// função antiga que ninguém mais chama - código morto
function calcDescAntigo(tp: string, v: number) {
  if (tp === 'vip') {
    return v * 0.2;
  }
  return 0;
}

console.log(calcDesc('vip', 200), calcPrazo('vip'));
