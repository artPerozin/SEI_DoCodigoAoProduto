# Exemplo de Clean Architecture — Cadastro de Usuário

Este exemplo implementa um caso de uso simples (cadastrar um usuário, impedindo
e-mail duplicado) seguindo as camadas clássicas da Clean Architecture.

## Estrutura de pastas

```
clean-architecture/
├── domain/                          # Camada mais interna (regras de negócio)
│   ├── entities/
│   │   └── Usuario.ts               # Entidade com regras de validação
│   ├── repositories/
│   │   └── UsuarioRepository.ts     # Interface (contrato/porta)
│   └── errors/
│       └── EmailJaCadastradoError.ts
├── application/                     # Casos de uso (orquestração)
│   └── usecases/
│       └── CadastrarUsuario.ts
├── infrastructure/                  # Detalhes técnicos (camada mais externa)
│   ├── repositories/
│   │   └── UsuarioRepositoryMemoria.ts  # Implementação concreta
│   └── http/
│       └── UsuarioController.ts     # Adapta requisição HTTP <-> caso de uso
└── main.ts                          # Composition Root (injeção de dependência)
```

## A Regra de Dependência

A ideia central da Clean Architecture é a **Regra de Dependência**:

> As dependências de código só podem apontar para DENTRO.
> Nada na camada interna pode saber algo sobre a camada externa.

```
┌─────────────────────────────────────────────┐
│         INFRASTRUCTURE (frameworks,          │
│         banco de dados, HTTP, libs)          │
│    ┌─────────────────────────────────────┐   │
│    │      APPLICATION (use cases)         │  │
│    │   ┌───────────────────────────────┐  │  │
│    │   │   DOMAIN (entities, regras)   │  │  │
│    │   └───────────────────────────────┘  │  │
│    └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

- `domain/` não importa nada de `application/` nem de `infrastructure/`.
- `application/` importa apenas `domain/` (e só interfaces, nunca implementações).
- `infrastructure/` é quem importa e implementa as interfaces do domínio.

Isso é possível graças ao **Dependency Inversion Principle**: o `UsuarioRepository`
é uma *interface* definida no domínio, mas *implementada* na infraestrutura
(`UsuarioRepositoryMemoria`). O caso de uso depende da abstração, não da
implementação concreta — por isso é fácil trocar "memória" por Postgres,
Mongo, etc., sem tocar em `domain/` ou `application/`.

## Por que isso importa na prática

1. **Testabilidade**: dá para testar `CadastrarUsuario` com um repositório
   fake em memória, sem precisar de banco de dados real.
2. **Independência de framework**: trocar Express por Fastify, ou Prisma por
   TypeORM, afeta só a camada `infrastructure/` — `domain/` e `application/`
   continuam intocados.
3. **Regras de negócio protegidas**: a validação de e-mail e nome vive na
   entidade `Usuario`, não espalhada em controllers ou repositórios.

## Rodando o exemplo

```bash
npx tsc --outDir dist main.ts domain/**/*.ts application/**/*.ts infrastructure/**/*.ts
node dist/main.js
```

Saída esperada: o primeiro cadastro retorna `201`, e a tentativa de
cadastrar o mesmo e-mail novamente retorna `409` (erro de domínio
`EmailJaCadastradoError`), sem que o controller precise conhecer detalhes
de como essa checagem foi feita.
