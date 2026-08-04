# App Skeleton

Base sem regras de negócio para iniciar projetos com:

- React + Vite + TypeScript no frontend;
- Node.js + Express + TypeScript no backend;
- PostgreSQL;
- backend e banco executados com Docker Compose;
- health check da API e da conexão com o banco.

Não há autenticação, usuários, permissões, entidades, migrations ou seed de negócio.

## Executar o projeto

### Requisitos

- Docker Desktop com Docker Compose;
- Node.js 22 ou superior para executar o frontend.

### 1. Configurar o ambiente

Na pasta `skeleton`, crie o arquivo `.env`:

```powershell
Copy-Item .env.example .env
```

Linux ou macOS:

```bash
cp .env.example .env
```

Altere as senhas antes de usar a base fora do ambiente local.

### 2. Iniciar backend e banco

```bash
docker compose up --build -d
```

Confira os containers:

```bash
docker compose ps
docker compose logs -f backend
```

A API estará em `http://localhost:3333`. O endpoint `http://localhost:3333/health` confirma também a conexão com o PostgreSQL.

### 3. Iniciar o frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

Abra `http://localhost:5173`.

### 4. Encerrar

```bash
docker compose down
```

Esse comando preserva o banco. Para apagar deliberadamente os dados:

```bash
docker compose down --volumes
```

## Desenvolvimento do backend sem container

Deixe apenas o banco ativo:

```bash
docker compose up -d database
cd backend
Copy-Item .env.example .env
npm install
npm run dev
```

## Começar um novo projeto

1. Copie a pasta `skeleton` para o novo repositório.
2. Renomeie os pacotes e o campo `name` do `compose.yaml`.
3. Troque as credenciais do `.env`.
4. Adicione migrations ou um ORM conforme a necessidade do projeto.
5. Crie as rotas e módulos de negócio sem misturá-los com `config` e `lib`.
6. Configure `APP_ORIGIN` com as origens permitidas, separadas por vírgula.
7. No deploy do frontend, configure `VITE_API_URL` com a URL pública da API.

## Estrutura

```text
skeleton/
├── backend/
│   ├── src/config/       # validação/configuração de ambiente
│   ├── src/lib/          # conexão com infraestrutura
│   ├── src/app.ts        # middlewares e rotas-base
│   ├── src/server.ts     # inicialização e encerramento
│   └── Dockerfile
├── frontend/
│   └── src/              # aplicação React mínima
├── compose.yaml
└── .env.example
```

