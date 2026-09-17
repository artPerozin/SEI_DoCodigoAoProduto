// ============================================================
// COMPOSITION ROOT
// ------------------------------------------------------------
// É o único ponto do sistema que conhece TODAS as camadas ao
// mesmo tempo. Aqui a gente "monta" o quebra-cabeça (injeção
// de dependência manual). Nenhuma outra camada faz "new" de
// implementação concreta de outra camada - só aqui.
// ============================================================

import { UsuarioRepositoryMemoria } from './infrastructure/repositories/UsuarioRepositoryMemoria';
import { CadastrarUsuario } from './application/usecases/CadastrarUsuario';
import { UsuarioController } from './infrastructure/http/UsuarioController';

async function main() {
  // 1. Infraestrutura (detalhe concreto)
  const usuarioRepository = new UsuarioRepositoryMemoria();

  // 2. Aplicação (caso de uso) recebe a abstração via injeção
  const cadastrarUsuario = new CadastrarUsuario(usuarioRepository);

  // 3. Interface adapter (controller) recebe o caso de uso
  const usuarioController = new UsuarioController(cadastrarUsuario);

  // Simulando uma requisição HTTP chegando:
  const resposta = await usuarioController.cadastrar({
    body: { id: '1', nome: 'Maria Silva', email: 'maria@teste.com' }
  });

  console.log(resposta);

  // Tentando cadastrar o mesmo email de novo -> deve falhar com 409
  const respostaDuplicada = await usuarioController.cadastrar({
    body: { id: '2', nome: 'Maria Souza', email: 'maria@teste.com' }
  });

  console.log(respostaDuplicada);
}

main();
