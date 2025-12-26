# 🎀 API do Cardápio - Laços Artesanais

API REST desenvolvida em **NestJS/TypeScript** para gerenciar e exibir produtos de laços artesanais. A aplicação utiliza **MongoDB** como banco de dados com **Mongoose** como ODM, seguindo os princípios de arquitetura modular do NestJS com padrões de desenvolvimento enterprise-grade.

---

## 🏗️ Arquitetura

### Estrutura de Diretórios

```
cardapio-server/
├── src/
│   ├── main.ts                 # Bootstrap da aplicação
│   ├── app.module.ts           # Módulo raiz
│   │
│   └── menu/                   # Módulo do Cardápio
│       ├── dto/                    # Data Transfer Objects
│       │   ├── create-menu-item.dto.ts
│       │   └── update-menu-item.dto.ts
│       ├── schemas/                # Schemas Mongoose
│       │   └── menu-item.schema.ts
│       ├── menu.controller.ts      # Controlador (endpoints)
│       ├── menu.service.ts         # Lógica de negócio
│       └── menu.module.ts          # Configuração do módulo
│
├── nest-cli.json               # Configuração NestJS CLI
├── tsconfig.json              # Configuração TypeScript
├── package.json               # Dependências e scripts
├── .env                       # Variáveis de ambiente (local)
├── .env.example              # Exemplo de variáveis de ambiente
└── .gitignore                # Arquivos ignorados pelo Git
```

### Padrão de Arquitetura NestJS

| Componente       | Responsabilidade                                | Arquivo                  |
| ---------------- | ----------------------------------------------- | ------------------------ |
| **Module**       | Organizar e encapsular funcionalidades         | `menu.module.ts`         |
| **Controller**   | Mapear requisições HTTP e validar entrada      | `menu.controller.ts`     |
| **Service**      | Lógica de negócio e regras da aplicação        | `menu.service.ts`        |
| **Schema**       | Definir estrutura de documentos MongoDB        | `menu-item.schema.ts`    |
| **DTO**          | Validar e transformar dados de entrada/saída   | `*.dto.ts`               |
| **Model**        | Abstração de acesso ao MongoDB (Mongoose)      | Injetado via @nestjs/mongoose |

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB >= 6.0 (local ou MongoDB Atlas)

### Instalação de Dependências

```bash
npm install
```

### Configurar Banco de Dados

#### Opção 1: MongoDB Local

1. Instale e inicie o MongoDB localmente
2. O banco de dados será criado automaticamente na primeira conexão

#### Opção 2: MongoDB Atlas (Cloud)

1. Crie uma conta em [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crie um cluster gratuito
3. Configure o acesso de rede (whitelist IP)
4. Obtenha a connection string

### Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
NODE_ENV=development
PORT=3000

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/cardapio_db
# ou para MongoDB Atlas:
# MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/cardapio_db

# CORS
FRONTEND_URL=http://localhost:4200
```

### Executar em Desenvolvimento

```bash
# Modo desenvolvimento com hot-reload
npm run start:dev

# Modo desenvolvimento com debug
npm run start:debug

# Modo produção
npm run start:prod
```

O servidor iniciará em `http://localhost:3000`

### Variáveis de Ambiente

**Arquivo `.env.example`:**

```env
NODE_ENV=development
PORT=3000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/cardapio_db

# CORS
FRONTEND_URL=http://localhost:4200

# API
API_PREFIX=api
```

---

## 📡 Endpoints da API

### Base URL
```
http://localhost:3000/api/menu
```

### 1. Health Check

**GET** `/health`

Verifica se a API está funcionando.

**Resposta (200):**
OK

---

### 2. Listar Todos os Produtos

**GET** `/api/menu`

Retorna todos os produtos do catálogo.

**Query Parameters (opcionais):**
- `categoria` (string): Filtrar por categoria

**Resposta (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "676d4e8f9a7b2c3d4e5f6a7b",
      "nome": "Kit tal mãe tal filha laço Paula",
      "descricao": "Laço Paula de fita esponja no bico de pato\nDois tamanhos diferentes",
      "preco": 27.00,
      "categoria": "Kit",
      "imagens": ["Talmae_Talfilha.png"],
      "ativo": true,
      "createdAt": "2025-12-26T10:00:00.000Z",
      "updatedAt": "2025-12-26T10:00:00.000Z"
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
- `id` (ObjectId): ID do produto MongoDB

**Exemplo:** `/api/menu/676d4e8f9a7b2c3d4e5f6a7b`

**Resposta (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "1",
    "nome": "Kit tal mãe tal filha laço Paula",
    "descricao": "Laço Paula de fita esponja no bico de pato\nDois tamanhos diferentes",
    "preco": 27.00,
    "categoria": "Kit",
    "imagens": ["Talmae_Talfilha.png"],
  }
}
```

**Resposta (404 Not Found):**
```json
{
  "statusCode": 404,
  "message": "Produto não encontrado",
  "error": "Not Found"
}
```

---

### 4. Filtrar por Categoria

**GET** `/api/menu/categoria/:categoria`

Filtra produtos por categoria específica.

**Parâmetros:**
- `categoria` (string): Nome da categoria

**Exemplo:** `/api/menu/categoria/Laços`

**Resposta (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "2",
      "nome": "Rosa no bico de pato (par)",
      "descricao": "Flor feita de fita gorgurão, aplique strass no bico de pato 5,5cm",
      "preco": 13.00,
      "categoria": "Laços",
      "imagens": ["RosaNoBico.jpg"]
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
      "_id": "1",
      "nome": "Kit tal mãe tal filha laço Paula",
      "preco": 27.00,
      "categoria": "Kit"
    },
    {
      "_id": "3",
      "nome": "Laço Paula no cetim bordado",
      "preco": 15.00,
      "categoria": "Laços"
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

### 7. Criar Produto (Admin)

**POST** `/api/menu`

Cria um novo produto no catálogo.

**Body:**
```json
{
  "nome": "Novo Laço",
  "descricao": "Descrição do produto",
  "preco": 15.00,
  "categoria": "Laços",
  "imagens": ["imagem1.jpg", "imagem2.jpg"]
}
```

**Resposta (201 Created):**
```json
{
  "success": true,
  "data": {
    "_id": "676d4e8f9a7b2c3d4e5f6a7e",
    "nome": "Novo Laço",
    "descricao": "Descrição do produto",
    "preco": 15.00,
    "categoria": "Laços",
    "imagens": ["imagem1.jpg", "imagem2.jpg"]
  }
}
```

---

### 8. Atualizar Produto (Admin)

**PUT** `/api/menu/:id` ou **PATCH** `/api/menu/:id`

Atualiza um produto existente.

**Body:**
```json
{
  "nome": "Nome Atualizado",
  "preco": 20.00
}
```

**Resposta (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "676d4e8f9a7b2c3d4e5f6a7b",
    "nome": "Nome Atualizado",
    "preco": 20.00,
    "updatedAt": "2025-12-26T12:30:00.000Z"
  }
}
```

---

### 9. Deletar Produto (Admin)

**DELETE** `/api/menu/:id`

Remove um produto do catálogo (soft delete - marca como inativo).

**Resposta (200 OK):**
```json
{
  "success": true,
  "message": "Produto removido com sucesso"
}
```

---

## 🗄️ Modelo de Dados

### Schema Mongoose (menu-item.schema.ts)

```typescript
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'menu' })
export class MenuItem extends Document {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  descricao: string;

  @Prop({ required: true })
  preco: number;

  @Prop({ required: true })
  categoria: string;

  @Prop({ type: [String], default: [] })
  imagens: string[];

  @Prop({ default: Date.now })
  criadoEm: Date;

  @Prop({ default: Date.now })
  atualizadoEm: Date;
}

export const MenuItemSchema = SchemaFactory.createForClass(MenuItem);
```

### Estrutura do Documento MongoDB

```javascript
{
  "id": 1,
  "nome": "Kit tal mãe tal filha laço Paula",
  "descricao": "Laço Paula de fita esponja no bico de pato \n Dois tamanhos diferentes",
  "preco": 27,
  "categoria": "Kit",
  "imagens": [
    "Talmae_Talfilha.png"
  ]
}
```
---

## 🔒 CORS (Cross-Origin Resource Sharing)

A API está configurada para aceitar requisições de:

- `http://localhost:4200` (desenvolvimento local Angular)
- `http://localhost:3000` (desenvolvimento local alternativo)
- URL definida em `FRONTEND_URL` (produção)

**Configuração em `main.ts`:**

```typescript
app.enableCors({
  origin: [
    'http://localhost:4200',
    'http://localhost:3000',
    process.env.FRONTEND_URL,
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
});
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
curl http://localhost:3000/api/menu/676d4e8f9a7b2c3d4e5f6a7b

# Criar produto
curl -X POST http://localhost:3000/api/menu \
  -H "Content-Type: application/json" \
  -d '{"nome":"Novo Laço","descricao":"Teste","preco":15.00,"categoria":"Laços"}'

# Atualizar produto
curl -X PUT http://localhost:3000/api/menu/676d4e8f9a7b2c3d4e5f6a7b \
  -H "Content-Type: application/json" \
  -d '{"preco":20.00}'

# Deletar produto
curl -X DELETE http://localhost:3000/api/menu/676d4e8f9a7b2c3d4e5f6a7b
```

### Usando Postman, Insomnia ou Thunder Client

1. Importe a coleção de endpoints
2. Configure o ambiente com a base URL
3. Teste cada rota com diferentes parâmetros
4. Verifique os status codes e respostas

---

## 📦 Dependências Principais

### Runtime

- **@nestjs/core** (^10.0.0): Framework NestJS
- **@nestjs/common** (^10.0.0): Módulos comuns do NestJS
- **@nestjs/platform-express** (^10.0.0): Adapter HTTP Express
- **@nestjs/mongoose** (^10.0.0): Integração Mongoose
- **mongoose** (^8.0.0): ODM para MongoDB
- **class-validator** (^0.14.0): Validação de DTOs
- **class-transformer** (^0.5.1): Transformação de objetos
- **dotenv** (^16.3.1): Gerenciamento de variáveis de ambiente

### Development

- **@nestjs/cli** (^10.0.0): CLI do NestJS
- **typescript** (~5.1.3): Linguagem TypeScript
- **@types/node** (^20.3.1): Tipos Node.js
- **ts-node** (^10.9.1): Execução TypeScript

---

## 🛡️ Validação de Dados

A API utiliza **class-validator** para validar DTOs automaticamente.

**create-menu-item.dto.ts:**

```typescript
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateMenuItemDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsNumber()
  @IsNotEmpty()
  preco: number;

  @IsString()
  @IsNotEmpty()
  categoria: string;

  @IsNotEmpty()
  imagens?: string[];
}
```

**update-menu-item.dto.ts:**

```typescript
import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuItemDto } from './create-menu-item.dto';

export class UpdateMenuItemDto extends PartialType(CreateMenuItemDto) {}
```

---

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev    # Inicia com hot-reload
npm run start:debug  # Inicia com debugger

# Produção
npm run build        # Compila para JavaScript
npm run start:prod   # Inicia versão compilada

# Testes
npm run test         # Testes unitários
npm run test:watch   # Testes em watch mode
npm run test:cov     # Cobertura de testes
npm run test:e2e     # Testes end-to-end

# Linting
npm run lint         # Verifica código
npm run format       # Formata código
```

---

## 🚀 Deploy

### Preparação para Produção

1. **Configure as variáveis de ambiente de produção:**
```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/cardapio_db?retryWrites=true&w=majority
FRONTEND_URL=https://seu-frontend.vercel.app
```

2. **Compile o projeto:**
```bash
npm run build
```

3. **Inicie o servidor:**
```bash
npm run start:prod
```

### Deploy no Render

1. Conecte seu repositório GitHub
2. Configure o Build Command: `npm install && npm run build`
3. Configure o Start Command: `npm run start:prod`
4. Adicione as variáveis de ambiente
5. Deploy automático

### Deploy no Railway

1. Conecte seu repositório GitHub
2. Railway detecta automaticamente o NestJS
3. Adicione MongoDB do Railway Marketplace
4. Configure as variáveis de ambiente
5. Deploy automático

### MongoDB Atlas Setup

1. Crie um cluster no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Configure Network Access (0.0.0.0/0 para produção)
3. Crie um usuário de banco de dados
4. Obtenha a connection string
5. Substitua `<password>` pela senha real

### Docker (Opcional)

**Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
```

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/cardapio_db
    depends_on:
      - mongo

  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

---

## 📊 Tratamento de Erros

A API retorna erros padronizados com status HTTP apropriado:

| Status | Situação                           |
| ------ | ---------------------------------- |
| 200    | Requisição bem-sucedida            |
| 201    | Recurso criado com sucesso         |
| 400    | Dados de entrada inválidos         |
| 404    | Recurso não encontrado             |
| 500    | Erro interno do servidor           |

**Exemplo de resposta de erro (NestJS):**

```json
{
  "statusCode": 400,
  "message": [
    "preco must be a positive number",
    "nome should not be empty"
  ],
  "error": "Bad Request"
}
```

**Exemplo de erro do MongoDB:**

```json
{
  "statusCode": 400,
  "message": "Cast to ObjectId failed for value \"invalid-id\" at path \"_id\"",
  "error": "Bad Request"
}
```

---

## 🔄 Migração da Versão Anterior

### Mudanças Principais

1. **Express → NestJS**: Framework mais robusto e escalável
2. **JavaScript → TypeScript**: Type safety e melhor DX
3. **Dados em Memória → MongoDB**: Persistência NoSQL real
4. **IDs Numéricos → ObjectId**: Identificadores MongoDB padrão
5. **Validação Manual → class-validator**: Validação automática
6. **Estrutura Plana → Modular**: Arquitetura escalável

### Compatibilidade da API

Os endpoints principais mantêm compatibilidade com a versão anterior:
- ✅ `GET /api/menu`
- ✅ `GET /api/menu/:id`
- ✅ `GET /api/menu/categoria/:categoria`
- ✅ `GET /api/menu/busca/:nome`
- ✅ `GET /api/menu/categorias/lista`

**Mudanças:**
- IDs agora são ObjectId do MongoDB (`_id`) em vez de números
- Suporte a operações CRUD completas
- Arquitetura mais intuitiva e organizada com a separação de responsabilidades

---

## 📚 Catálogo de Produtos

A API suporta gerenciamento completo de produtos via MongoDB.

**Categorias disponíveis:**
- Kit
- Laços

**Produtos podem incluir:**
- Nome e descrição
- Preço (número com 2 casas decimais)
- Categoria
- Array de imagens (URLs)

---

## 🎯 Próximos Passos
### Outras implementações e features que o projeto poderia incluir:

- [ ] Implementar autenticação JWT
- [ ] Adicionar upload de imagens (AWS S3 ou Cloudinary)
- [ ] Implementar paginação avançada
- [ ] Adicionar filtros combinados e ordenação
- [ ] Criar dashboard administrativo
- [ ] Implementar cache com Redis
- [ ] Adicionar testes E2E completos
- [ ] Documentação Swagger/OpenAPI automática
- [ ] Implementar busca full-text no MongoDB
- [ ] Adicionar agregações (produtos mais vendidos, por preço, etc.)

---

## 💡 Vantagens do MongoDB para Este Projeto

- **Flexibilidade de Schema**: Fácil adicionar novos campos sem migrations
- **Performance em Leitura**: Ideal para catálogo de produtos
- **Escalabilidade Horizontal**: Sharding nativo
- **Arrays Nativos**: Perfeito para múltiplas imagens
- **Queries Poderosas**: Agregações e busca full-text
- **Atlas Gratuito**: Tier grátis de 512MB

---

**Última atualização:** 26 de Dezembro de 2025  
**Tempo investido:** 20 horas (15h desenvolvimento inicial + 3h refatoração + 2h redeploy)  
**Versão:** 2.0.0  
**Stack:** NestJS + TypeScript + MongoDB + Mongoose
