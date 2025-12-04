# 📚 Documentação Técnica - API do Cardápio (Back-end)

## Visão Geral

A **API do Cardápio** é uma aplicação Node.js/Express que fornece endpoints RESTful para gerenciar e recuperar dados de um cardápio digital. A arquitetura segue o padrão **MVC Simplificado**, com separação clara entre Models (dados), Controllers (lógica) e Routes (endpoints).

---

## 🏗️ Arquitetura

### Estrutura de Diretórios

```
cardapio-api/
├── server.js                    # 🟢 Ponto de entrada da aplicação
├── package.json                 # Dependências e scripts
├── .env                        # Variáveis de ambiente (local)
├── .env.example                # Exemplo de variáveis de ambiente
├── .gitignore                  # Arquivos ignorados pelo Git
│
└── src/
    ├── app.js                  # 🛠 Configurações globais (Express, CORS)
    │
    └── modules/
        └── menu/               # Módulo do Cardápio
            ├── menu.data.js    # 💾 MODEL: Dados em memória
            ├── menu.controller.js  # 🧠 CONTROLLER: Lógica de negócio
            └── menu.routes.js  # 🌐 ROUTES: Endpoints da API
```

### Padrão MVC Simplificado

| Componente | Responsabilidade | Arquivo |
|-----------|------------------|---------|
| **Model** | Armazenar e gerenciar dados | `menu.data.js` |
| **Controller** | Lógica de negócio e processamento | `menu.controller.js` |
| **Routes** | Mapear requisições HTTP para controllers | `menu.routes.js` |
| **App** | Configuração global e middlewares | `app.js` |
| **Server** | Inicializar o servidor | `server.js` |

---

## 🚀 Como Executar

### Instalação de Dependências

```bash
npm install
```

### Executar em Desenvolvimento

```bash
npm start
# ou
npm run dev
```

O servidor iniciará em `http://localhost:3000`

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:4200
```

---

## 📡 Endpoints da API

### 1. Health Check

**GET** `/health`

Verifica se a API está funcionando.

**Resposta (200 OK):**
```json
{
  "status": "OK",
  "message": "API do Cardápio está funcionando",
  "timestamp": "2025-12-02T01:21:22.886Z"
}
```

---

### 2. Listar Todos os Itens

**GET** `/api/menu`

Retorna todos os itens do cardápio.

**Resposta (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nome": "Hambúrguer Clássico",
      "descricao": "Hambúrguer suculento com carne 100% bovina...",
      "preco": 25.90,
      "categoria": "Pratos"
    },
    {
      "id": 2,
      "nome": "Pizza Margherita",
      "descricao": "Pizza tradicional com molho de tomate...",
      "preco": 35.00,
      "categoria": "Pratos"
    }
  ],
  "count": 10
}
```

---

### 3. Obter Item por ID

**GET** `/api/menu/:id`

Retorna um item específico pelo ID.

**Parâmetros:**
- `id` (number): ID do item

**Resposta (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nome": "Hambúrguer Clássico",
    "descricao": "Hambúrguer suculento com carne 100% bovina...",
    "preco": 25.90,
    "categoria": "Pratos"
  }
}
```

**Resposta (404 Not Found):**
```json
{
  "success": false,
  "message": "Item não encontrado"
}
```

---

### 4. Filtrar por Categoria

**GET** `/api/menu/categoria/:categoria`

Filtra itens por categoria específica.

**Parâmetros:**
- `categoria` (string): Nome da categoria (ex: "Bebidas", "Pratos")

**Resposta (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 4,
      "nome": "Refrigerante Coca-Cola",
      "descricao": "Refrigerante gelado - 350ml",
      "preco": 6.50,
      "categoria": "Bebidas"
    },
    {
      "id": 5,
      "nome": "Suco Natural de Laranja",
      "descricao": "Suco fresco espremido na hora - 300ml",
      "preco": 8.00,
      "categoria": "Bebidas"
    }
  ],
  "count": 3,
  "categoria": "Bebidas"
}
```

---

### 5. Buscar por Nome

**GET** `/api/menu/busca/:nome`

Busca itens por nome (busca parcial, case-insensitive).

**Parâmetros:**
- `nome` (string): Termo de busca

**Resposta (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 2,
      "nome": "Pizza Margherita",
      "descricao": "Pizza tradicional com molho de tomate...",
      "preco": 35.00,
      "categoria": "Pratos"
    }
  ],
  "count": 1,
  "busca": "Pizza"
}
```

---

### 6. Listar Categorias

**GET** `/api/menu/categorias/lista`

Retorna todas as categorias disponíveis.

**Resposta (200 OK):**
```json
{
  "success": true,
  "data": [
    "Acompanhamentos",
    "Bebidas",
    "Pratos",
    "Sobremesas"
  ],
  "count": 4
}
```

---

## 🔒 CORS (Cross-Origin Resource Sharing)

A API está configurada para aceitar requisições de:

- `http://localhost:4200` (desenvolvimento local Angular)
- `http://localhost:3000` (desenvolvimento local alternativo)
- `https://*.vercel.app` (qualquer aplicação hospedada no Vercel)
- URL definida em `FRONTEND_URL` (produção)

**Configuração em `src/app.js`:**

```javascript
app.use(cors({
  origin: [
    'http://localhost:4200',
    'http://localhost:3000',
    'https://*.vercel.app',
    process.env.FRONTEND_URL
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200
}));
```

---

## 📊 Estrutura de Dados

### Item do Cardápio

```typescript
interface MenuItem {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
}
```

### Resposta Padrão (Sucesso)

```typescript
interface SuccessResponse {
  success: true;
  data: any;
  count?: number;
  [key: string]: any;
}
```

### Resposta Padrão (Erro)

```typescript
interface ErrorResponse {
  success: false;
  message: string;
  error?: any;
}
```

---

## 🧪 Testando a API

### Usando cURL

```bash
# Listar todos os itens
curl http://localhost:3000/api/menu

# Buscar por categoria
curl http://localhost:3000/api/menu/categoria/Bebidas

# Buscar por nome
curl http://localhost:3000/api/menu/busca/Pizza

# Obter item específico
curl http://localhost:3000/api/menu/1
```

### Usando Postman

1. Importe os endpoints acima no Postman
2. Teste cada rota com diferentes parâmetros
3. Verifique os status codes e respostas

---

## 🔧 Middlewares

| Middleware | Função |
|-----------|--------|
| `express.json()` | Parsear corpo de requisições JSON |
| `cors()` | Permitir requisições cross-origin |
| Logging | Registrar método e caminho de cada requisição |
| Tratamento de Erros | Capturar e retornar erros de forma padronizada |

---

## 📝 Tratamento de Erros

A API retorna erros padronizados com status HTTP apropriado:

| Status | Situação |
|--------|----------|
| `200 OK` | Requisição bem-sucedida |
| `404 Not Found` | Recurso não encontrado |
| `500 Internal Server Error` | Erro no servidor |

---

## 🚀 Deploy no Render

### Passo 1: Preparar o Repositório

1. Inicialize um repositório Git:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Envie para GitHub:
   ```bash
   git push -u origin main
   ```

### Passo 2: Criar Serviço no Render

1. Acesse [render.com](https://render.com)
2. Clique em "New +" → "Web Service"
3. Conecte seu repositório GitHub
4. Configure:
   - **Name:** cardapio-api
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment Variables:**
     ```
     NODE_ENV=production
     PORT=3000
     FRONTEND_URL=https://seu-app.vercel.app
     ```

5. Clique em "Create Web Service"

### Passo 3: Obter URL da API

Após o deploy, você terá uma URL como:
```
https://cardapio-api.onrender.com
```

---

## 📚 Recursos Adicionais

- [Express.js Docs](https://expressjs.com/)
- [CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [RESTful API Best Practices](https://restfulapi.net/)

---

## ✅ Checklist de Implementação

- [x] Estrutura MVC Simplificada
- [x] Endpoints para listar itens
- [x] Endpoint para obter item por ID
- [x] Filtro por categoria
- [x] Busca por nome
- [x] Configuração CORS
- [x] Tratamento de erros
- [x] Variáveis de ambiente
- [x] Documentação técnica
- [ ] Deploy no Render
- [ ] Integração com Front-end Angular

---

**Última atualização:** 2 de Dezembro de 2025  
**Versão:** 1.0.0
