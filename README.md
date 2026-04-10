# NestJS Starter Exemplar

Projeto base em NestJS para criação de serviços backend com foco em:

- modularidade
- baixo acoplamento
- organização por camadas
- facilidade de evolução

## Executando

```bash
npm install
npm run start:dev
```

## Endpoint inicial

```txt
GET /api/health
```

## Estrutura

- `modules/`: módulos de negócio
- `shared/`: componentes transversais
- `presentation/`: camada HTTP
- `application/`: casos de uso e contratos
- `domain/`: regras puras
- `infra/`: implementações concretas

## Próximos passos

- configuração global
- validation pipe
- exception filter
- logger
- prisma + postgres
- testes unitários e e2e