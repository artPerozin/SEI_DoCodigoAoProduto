// ============================================================
// CAMADA: INTERFACE ADAPTERS (Controllers)
// ------------------------------------------------------------
// Regra: traduz o mundo externo (requisição HTTP, JSON, etc)
// para o formato que o caso de uso entende, e traduz a
// resposta do caso de uso de volta para o formato HTTP.
// NÃO tem regra de negócio aqui - só tradução/orquestração.
// ============================================================

import { CadastrarUsuario } from '../../application/usecases/CadastrarUsuario';
import { EmailJaCadastradoError } from '../../domain/errors/EmailJaCadastradoError';

interface HttpRequest {
  body: {
    id: string;
    nome: string;
    email: string;
  };
}

interface HttpResponse {
  statusCode: number;
  body: unknown;
}

export class UsuarioController {
  constructor(private readonly cadastrarUsuario: CadastrarUsuario) {}

  async cadastrar(request: HttpRequest): Promise<HttpResponse> {
    try {
      const usuario = await this.cadastrarUsuario.executar({
        id: request.body.id,
        nome: request.body.nome,
        email: request.body.email
      });

      return {
        statusCode: 201,
        body: usuario
      };
    } catch (erro) {
      if (erro instanceof EmailJaCadastradoError) {
        return { statusCode: 409, body: { mensagem: erro.message } };
      }

      if (erro instanceof Error) {
        return { statusCode: 400, body: { mensagem: erro.message } };
      }

      return { statusCode: 500, body: { mensagem: 'Erro interno' } };
    }
  }
}
