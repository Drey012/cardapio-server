// Responsável por inicializar a aplicação e configurar middlewares

const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar rotas
const menuRoutes = require('./modules/menu/menu.routes');

// Criar instância da aplicação
const app = express();

// MIDDLEWARES 

// Middleware para parsear JSON
app.use(express.json());

// Middleware CORS - Permitir requisições do Front-end (Vercel)
app.use(cors({
  origin: [
    'http://localhost:4200',        // Desenvolvimento local Angular
    'http://localhost:3000',        // Desenvolvimento local alternativo (para o caso de desenvolvimento em Next, por exemplo)
    process.env.FRONTEND_URL        // URL do front-end em produção (se definida)
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// Middleware para logging de requisições (opcional)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ROTAS 

// Rota de Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API do Cardápio está funcionando',
    timestamp: new Date().toISOString()
  });
});

// Rotas do Cardápio
app.use('/api/menu', menuRoutes);

//  TRATAMENTO DE ERROS 

// Rota 404 - Não encontrado
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada',
    path: req.path,
    method: req.method
  });
});

// Middleware de tratamento de erros global
app.use((err, req, res, next) => {
  console.error('Erro:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

module.exports = app;
