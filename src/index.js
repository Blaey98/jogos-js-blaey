const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsing JSON
app.use(express.json());

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, '../public')));

// Servir jogos da pasta public/games
app.use('/games', express.static(path.join(__dirname, '../public/games')));

// Rota principal - serve a página de seleção de jogos
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Rota para listar jogos disponíveis
app.get('/api/games', (req, res) => {
  const games = [
    {
      id: 1,
      name: 'Xadrez',
      description: 'Jogue xadrez contra o Stockfish 16',
      path: '/games/chess/',
      icon: '♔',
      status: 'disponível'
    },
    {
      id: 2,
      name: 'Damas',
      description: 'Clássico jogo de damas com IA',
      path: '/games/checkers/',
      icon: '🔴',
      status: 'disponível'
    },
    {
      id: 3,
      name: 'Sinuca',
      description: 'Jogue sinuca 8-ball com física realista',
      path: '/games/sinuca/',
      icon: '🎱',
      status: 'disponível'
    }
  ];
  
  res.json(games);
});

// Rota para redirecionar para jogos específicos
app.get('/chess', (req, res) => {
  res.redirect('/games/chess/');
});

app.get('/checkers', (req, res) => {
  res.redirect('/games/checkers/');
});

app.get('/sinuca', (req, res) => {
  res.redirect('/games/sinuca/');
});

// Middleware para tratar rotas não encontradas
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../public/index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📱 Acesse: http://localhost:${PORT}`);
  console.log(`🎮 Jogos disponíveis:`);
  console.log(`   - Xadrez: http://localhost:${PORT}/games/chess/`);
  console.log(`   - Damas: http://localhost:${PORT}/games/checkers/`);
  console.log(`   - Sinuca: http://localhost:${PORT}/games/sinuca/`);
});

module.exports = app;
