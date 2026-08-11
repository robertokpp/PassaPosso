# Deploy do PassaPosso no Render

Este guia publica o projeto no Render usando três recursos:

- **Render Postgres** para o banco de dados;
- **Web Service** para a API Node/Express;
- **Static Site** para o frontend React/Vite.

> O repositório é um monorepo. Por isso, configure `backend` e `frontend` como diretórios raiz de serviços diferentes.

## 1. Antes de começar

1. Envie o projeto para um repositório GitHub ou GitLab.
2. Crie uma conta em <https://render.com>.
3. No painel do Render, conecte a conta que possui acesso ao repositório.

O repositório já deve conter as migrations em `backend/prisma/migrations`. Não envie arquivos `.env` nem senhas para o Git.

## 2. Criar o PostgreSQL

No Dashboard do Render:

1. Clique em **New > Postgres**.
2. Escolha um nome, por exemplo `passapasso-db`.
3. Selecione a região e o plano desejados.
4. Crie o banco.
5. Na página do banco, copie a **Internal Database URL**.

Use a URL interna na API quando banco e backend estiverem na mesma conta e região do Render.

> Atualmente, bancos PostgreSQL gratuitos do Render expiram após 30 dias. Para uma aplicação permanente, escolha um plano pago ou outro provedor PostgreSQL.

## 3. Criar a API

Clique em **New > Web Service**, conecte o repositório e preencha:

| Campo | Valor |
| --- | --- |
| Name | `passapasso-api` |
| Language | `Node` |
| Branch | `main` ou a branch utilizada |
| Root Directory | `backend` |
| Build Command | `npm ci --include=dev && npx prisma generate && npm run build` |
| Start Command | `npx prisma migrate deploy && npm start` |
| Health Check Path | `/health` |

Escolha uma versão compatível do Node, preferencialmente **Node 22**.

### Variáveis da API

Adicione em **Environment**:

| Chave | Valor |
| --- | --- |
| `NODE_ENV` | `production` |
| `DATABASE_URL` | Internal Database URL copiada do PostgreSQL |
| `APP_ORIGIN` | URL pública do frontend, preenchida após o passo 4 |

Não é necessário definir `PORT`: o Render fornece essa variável automaticamente e a aplicação já a utiliza.

### Executar as migrations no plano gratuito

O **Pre-Deploy Command** e o **Shell** não estão disponíveis no plano gratuito. Por isso, as migrations fazem parte do Start Command:

```bash
npx prisma migrate deploy && npm start
```

Assim, o Render aplica migrations pendentes antes de iniciar a API em cada deploy ou reinício. O comando `prisma migrate deploy` não recria migrations já aplicadas.

O Build Command usa `--include=dev` porque, neste projeto, Prisma e TypeScript estão em `devDependencies` e são necessários para gerar o client e compilar o backend:

```bash
npm ci --include=dev && npx prisma generate && npm run build
```

Se uma migration falhar, a API não será iniciada e o erro aparecerá nos logs do serviço. Corrija a migration ou a conexão com o banco e faça um novo deploy.

Depois do deploy, teste:

```text
https://passapasso-api.onrender.com/health
```

A resposta esperada é:

```json
{"status":"ok"}
```

Substitua `passapasso-api.onrender.com` pela URL gerada para o seu serviço.

## 4. Criar o frontend

Clique em **New > Static Site**, selecione o mesmo repositório e configure:

| Campo | Valor |
| --- | --- |
| Name | `passapasso` |
| Branch | `main` ou a branch utilizada |
| Root Directory | `frontend` |
| Build Command | `npm ci && npx vite build` |
| Publish Directory | `dist` |

Em **Environment**, adicione:

| Chave | Valor |
| --- | --- |
| `VITE_API_URL` | URL pública da API, sem barra no final |

Exemplo:

```text
VITE_API_URL=https://passapasso-api.onrender.com
```

> `VITE_API_URL` fica incorporada ao JavaScript durante o build. Depois de alterá-la, faça um novo deploy do frontend. Essa variável não deve conter segredos.

### Configurar o React Router

Na página do Static Site, abra **Redirects/Rewrites** e crie a regra:

| Source | Destination | Action |
| --- | --- | --- |
| `/*` | `/index.html` | `Rewrite` |

Sem essa regra, atualizar diretamente uma rota como `/guia/123` retorna 404.

## 5. Liberar o frontend no CORS

Copie a URL final do Static Site, por exemplo:

```text
https://passapasso.onrender.com
```

Volte ao serviço `passapasso-api` e defina:

```text
APP_ORIGIN=https://passapasso.onrender.com
```

Se houver domínio próprio ou mais de uma origem, separe-as por vírgula e não coloque barra no final:

```text
APP_ORIGIN=https://passapasso.onrender.com,https://www.seudominio.com
```

Salve e aguarde o redeploy da API.

## 6. Preservar imagens e vídeos

A API salva os arquivos enviados na pasta relativa `uploads`. O filesystem padrão do Render é efêmero: os arquivos podem desaparecer em deploys, reinícios e, no plano gratuito, quando o serviço entra em suspensão.

Para produção, use uma das opções:

### Opção A — disco persistente do Render

No serviço da API, abra **Disks**, adicione um disco e configure o mount path:

```text
/opt/render/project/src/uploads
```

Use pelo menos o tamanho necessário para as imagens e vídeos. Discos persistentes exigem um serviço pago, só podem ser usados por uma instância e desabilitam deploy sem downtime.

### Opção B — armazenamento de objetos

Altere o backend para enviar os arquivos a um serviço como Cloudinary, Amazon S3 ou Cloudflare R2 e grave no banco apenas a URL. Essa opção é mais adequada caso a API precise escalar para várias instâncias.

## 7. Checklist final

- [ ] O PostgreSQL está disponível.
- [ ] `DATABASE_URL` usa a URL interna do banco.
- [ ] O Start Command contém `npx prisma migrate deploy && npm start`.
- [ ] Os logs confirmam que as migrations foram executadas.
- [ ] `https://URL-DA-API/health` retorna `{"status":"ok"}`.
- [ ] `VITE_API_URL` aponta para a API HTTPS.
- [ ] `APP_ORIGIN` contém a URL exata do frontend.
- [ ] A regra `/* -> /index.html` está configurada como Rewrite.
- [ ] Uploads usam disco persistente ou armazenamento de objetos.
- [ ] Frontend e API foram redeployados depois das variáveis finais.

## Observação sobre o build atual

O comando padrão `npm run build` do frontend executa primeiro a verificação completa do TypeScript. Atualmente, há referências preexistentes ao tipo ausente `UserAPIResponse` em `src/contexts/AuthContext.tsx`. Por isso, este guia usa temporariamente:

```bash
npm ci && npx vite build
```

O Vite gera a aplicação normalmente, mas o ideal é corrigir esse tipo e então trocar o Build Command por:

```bash
npm ci && npm run build
```

## Documentação oficial

- [Deploy de Node/Express](https://render.com/docs/deploy-node-express-app)
- [Monorepos no Render](https://render.com/docs/monorepo-support)
- [Deploy de Static Site e campos de configuração](https://render.com/docs/your-first-deploy)
- [Rewrite para React Router](https://render.com/docs/deploy-create-react-app#using-client-side-routing)
- [Discos persistentes](https://render.com/docs/disks)
- [Limitações do plano gratuito](https://render.com/docs/free)
