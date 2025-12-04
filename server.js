// 🟢 SERVER: Inicia a Aplicação
// Ponto de entrada da API do Cardápio

const app = require('./src/app');

// Configurar porta
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║                                                        ║
║        🍽️  API CARDÁPIO - SERVIDOR INICIADO  🍽️       ║
║                                                        ║
║  Ambiente: ${NODE_ENV.toUpperCase().padEnd(39)}║
║  Porta: ${PORT.toString().padEnd(45)}║
║  URL: http://localhost:${PORT}${' '.repeat(30 - PORT.toString().length)}║
║                                                        ║
║  Health Check: http://localhost:${PORT}/health${' '.repeat(20 - PORT.toString().length)}║
║  API Menu: http://localhost:${PORT}/api/menu${' '.repeat(23 - PORT.toString().length)}║
║                                                        ║
╚════════════════════════════════════════════════════════╝
  `);
});

// Tratamento de erro ao iniciar servidor
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Erro: Porta ${PORT} já está em uso!`);
  } else {
    console.error('❌ Erro ao iniciar servidor:', error);
  }
  process.exit(1);
});

// Tratamento de sinais de encerramento
process.on('SIGTERM', () => {
  console.log('\n🛑 SIGTERM recebido. Encerrando servidor...');
  server.close(() => {
    console.log('✅ Servidor encerrado com sucesso');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n🛑 SIGINT recebido. Encerrando servidor...');
  server.close(() => {
    console.log('✅ Servidor encerrado com sucesso');
    process.exit(0);
  });
});
