# 🎀 API do Cardápio - Laços Artesanais

API REST desenvolvida em Node.js/Express para gerenciar e exibir produtos de laços artesanais. A arquitetura segue o padrão **MVC Simplificado**, com separação clara entre Models (dados), Controllers (lógica) e Routes (endpoints).

---

## 🏗️ Arquitetura

### Estrutura de Diretórios

```
cardapio-api/
├── server.js                    # Ponto de entrada da aplicação
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
            ├── menu.data.js    # MODEL: Dados em memória
            ├── menu.controller.js  # CONTROLLER: Lógica de negócio
            └── menu.routes.js  # ROUTES: Endpoints da API
```

### Padrão MVC Simplificado

| Componente     | Responsabilidade                         | Arquivo              |
| -------------- | ---------------------------------------- | -------------------- |
| **Model**      | Armazenar e gerenciar dados              | `menu.data.js`       |
| **Controller** | Lógica de negócio e processamento        | `menu.controller.js` |
| **Routes**     | Mapear requisições HTTP para controllers | `menu.routes.js`     |
| **App**        | Configuração global e middlewares        | `app.js`             |
| **Server**     | Inicializar o servidor                   | `server.js`          |

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js >= 14.0.0
- npm >= 6.0.0

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

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:

```env
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:4200
```

**Variáveis disponíveis:**

- `NODE_ENV`: Ambiente de execução (development, production)
- `PORT`: Porta do servidor (padrão: 3000)
- `FRONTEND_URL`: URL do Front-end para configuração CORS em produção

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
  "timestamp": "2025-12-06T12:00:00.000Z"
}
```

---

### 2. Listar Todos os Produtos

**GET** `/api/menu`

Retorna todos os produtos do catálogo.

**Resposta (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nome": "Kit tal mãe tal filha laço Paula",
      "descricao": "Laço Paula de fita esponja no bico de pato \n Dois tamanhos diferentes",
      "preco": 27.0,
      "categoria": "Kit",
      "imagens": ["Talmae_Talfilha.png"]
    },
    {
      "id": 2,
      "nome": "Rosa no bico de pato (par)",
      "descricao": "Flor feita de fita gorgurão, aplique strass no bico de pato 5,5cm",
      "preco": 13.0,
      "categoria": "Laços",
      "imagens": ["RosaNoBico.jpg"]
    }
  ],
  "count": 7
}
```

---

### 3. Obter Produto por ID

**GET** `/api/menu/:id`

Retorna um produto específico pelo ID.

**Parâmetros:**

- `id` (number): ID do produto

**Exemplo:** `/api/menu/1`

**Resposta (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "nome": "Kit tal mãe tal filha laço Paula",
    "descricao": "Laço Paula de fita esponja no bico de pato \n Dois tamanhos diferentes",
    "preco": 27.0,
    "categoria": "Kit",
    "imagens": ["Talmae_Talfilha.png"]
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

Filtra produtos por categoria específica.

**Parâmetros:**

- `categoria` (string): Nome da categoria (ex: "Laços", "Kit")

**Exemplo:** `/api/menu/categoria/Laços`

**Resposta (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "id": 2,
      "nome": "Rosa no bico de pato (par)",
      "descricao": "Flor feita de fita gorgurão, aplique strass no bico de pato 5,5cm",
      "preco": 13.0,
      "categoria": "Laços",
      "imagens": ["RosaNoBico.jpg"]
    },
    {
      "id": 3,
      "nome": "Laço Paula no cetim bordado",
      "descricao": "Laço feito com cetim grosso bordado no bico de pato",
      "preco": 15.0,
      "categoria": "Laços",
      "imagens": ["PaulaBordado.jpg"]
    },
    {
      "id": 5,
      "nome": "Laço Paula",
      "descricao": "Laço feito em fita gorgurão no bico de pato",
      "preco": 12.0,
      "categoria": "Laços",
      "imagens": ["PaulaNormal.jpg"]
    }
  ],
  "count": 5,
  "categoria": "Laços"
}
```

---

### 5. Buscar por Nome

**GET** `/api/menu/busca/:nome`

Busca produtos por nome (busca parcial, case-insensitive).

**Parâmetros:**

- `nome` (string): Termo de busca

**Exemplo:** `/api/menu/busca/Paula`

**Resposta (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nome": "Kit tal mãe tal filha laço Paula",
      "descricao": "Laço Paula de fita esponja no bico de pato \n Dois tamanhos diferentes",
      "preco": 27.0,
      "categoria": "Kit",
      "imagens": ["Talmae_Talfilha.png"]
    },
    {
      "id": 3,
      "nome": "Laço Paula no cetim bordado",
      "descricao": "Laço feito com cetim grosso bordado no bico de pato",
      "preco": 15.0,
      "categoria": "Laços",
      "imagens": ["PaulaBordado.jpg"]
    }
  ],
  "count": 3,
  "busca": "Paula"
}
```

---

### 6. Listar Categorias

**GET** `/api/menu/categorias/lista`

Retorna todas as categorias disponíveis no catálogo.

**Resposta (200 OK):**

```json
{
  "success": true,
  "data": ["Kit", "Laços"],
  "count": 2
}
```

---

## 🔒 CORS (Cross-Origin Resource Sharing)

A API está configurada para aceitar requisições de:

- `http://localhost:4200` (desenvolvimento local Angular)
- `http://localhost:3000` (desenvolvimento local alternativo)
- URL definida em `FRONTEND_URL` (produção)

**Configuração em `src/app.js`:**

```javascript
app.use(
  cors({
    origin: [
      "http://localhost:4200",
      "http://localhost:3000",
      process.env.FRONTEND_URL,
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
```

---

## 📊 Estrutura de Dados

### Produto

```typescript
interface MenuItem {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  imagens: string[];
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
# Listar todos os produtos
curl http://localhost:3000/api/menu

# Buscar por categoria
curl http://localhost:3000/api/menu/categoria/Laços

# Buscar por nome
curl http://localhost:3000/api/menu/busca/Paula

# Obter produto específico
curl http://localhost:3000/api/menu/1

# Listar categorias
curl http://localhost:3000/api/menu/categorias/lista
```

### Usando Postman ou Insomnia

1. Importe os endpoints acima
2. Teste cada rota com diferentes parâmetros
3. Verifique os status codes e respostas

---

## 🔧 Middlewares

| Middleware          | Função                                         |
| ------------------- | ---------------------------------------------- |
| `express.json()`    | Parsear corpo de requisições JSON              |
| `cors()`            | Permitir requisições cross-origin              |
| Logging             | Registrar método e caminho de cada requisição  |
| Tratamento de Erros | Capturar e retornar erros de forma padronizada |

---

## 📝 Tratamento de Erros

A API retorna erros padronizados com status HTTP apropriado:

| Status                      | Situação                |
| --------------------------- | ----------------------- |
| `200 OK`                    | Requisição bem-sucedida |
| `404 Not Found`             | Recurso não encontrado  |
| `500 Internal Server Error` | Erro no servidor        |

**Exemplo de resposta de erro:**

```json
{
  "success": false,
  "message": "Item não encontrado"
}
```

---

## 📦 Dependências

- **express** (^5.2.1): Framework web para Node.js
- **cors** (^2.8.5): Middleware para habilitar CORS
- **dotenv** (^17.2.3): Gerenciamento de variáveis de ambiente

---

## 📚 Catálogo de Produtos Atual

A API contém os seguintes produtos:

1. **Kit tal mãe tal filha laço Paula** (R$ 27,00)
2. **Rosa no bico de pato (par)** (R$ 13,00)
3. **Laço Paula no cetim bordado** (R$ 15,00)
4. **Laço Nanda com brilho** (R$ 16,50)
5. **Laço Paula** (R$ 12,00)
6. **Kit porta coque + laço** (R$ 20,00)
7. **Laço franzido** (R$ 12,00)

**Categorias disponíveis:**

- Kit
- Laços

---

**Última atualização:** 6 de Dezembro de 2025  
**Tempo investido:** 15 horas
**Versão:** 1.0.0
