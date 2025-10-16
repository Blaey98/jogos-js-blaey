// Configuração dos jogos - Blaey Games
// Para adicionar um novo jogo, simplesmente adicione um objeto ao array games

const games = [
    {
        id: 'pacman',
        title: 'Pacman',
        description: 'O clássico jogo do Pacman. Colete pontos e evite os fantasmas!',
        icon: '👻',
        path: 'jogos/pacman_js/index_mobile.html',
        status: 'available',
        category: 'arcade',
        tags: ['mobile', 'classic', 'arcade'],
        featured: true,
        orientation: 'vertical'
    },
    {
        id: 'space-goblins-mobile',
        title: 'The Maze of Space Goblins',
        description: 'O jogo completo com controles touch otimizados para mobile!',
        icon: '👾',
        path: 'jogos/blaey go!/passatempo/the-maze-of-space-goblins-main/index.html',
        status: 'available',
        category: 'adventure',
        tags: ['mobile', 'adventure', 'space', 'touch', 'maze', 'complete'],
        featured: true,
        orientation: 'vertical'
    },
    {
        id: 'space-exploration',
        title: 'Space Exploration',
        description: 'Explore o espaço voando de planeta em planeta. Colete moedas e desbloqueie novas naves espaciais!',
        icon: '🚀',
        path: 'jogos/blaey go!/space/(top3 )space-exploration-2021-master/auto-start.html',
        status: 'available',
        category: 'adventure',
        tags: ['space', 'exploration', 'adventure', 'coins'],
        featured: true,
        orientation: 'horizontal'
    },
    {
        id: 'chess-pursuit',
        title: 'Chess Pursuit',
        description: 'Escape do tabuleiro de xadrez! Toque e deslize para se mover. Versão mobile otimizada.',
        icon: '♔',
        path: 'jogos/blaey go!/estrategia/chesspursuit-master/mobile.html',
        status: 'available',
        category: 'strategy',
        tags: ['mobile', 'strategy', 'chess', 'touch', 'swipe'],
        featured: true,
        orientation: 'vertical'
    },
    {
        id: 'chess',
        title: 'Xadrez',
        description: 'O jogo de estratégia mais popular do mundo. Desafie sua mente!',
        icon: '♟️',
        path: 'jogos/chess_js/index.html',
        status: 'available',
        category: 'strategy',
        tags: ['strategy', 'brain', 'classic'],
        featured: true,
        orientation: 'horizontal'
    },
    {
        id: 'sinuca',
        title: 'Sinuca',
        description: 'Jogue sinuca online com física realista e controles suaves.',
        icon: '🎱',
        path: 'http://localhost:8080/index_simple.html',
        status: 'available',
        category: 'sports',
        tags: ['sports', 'physics', 'realistic'],
        featured: false,
        orientation: 'horizontal'
    },
    {
        id: 'damas',
        title: 'Damas',
        description: 'O clássico jogo de damas com IA inteligente.',
        icon: '🔴',
        path: 'jogos/damas/rapid-draughts-main/index.html',
        status: 'available',
        category: 'strategy',
        tags: ['strategy', 'classic', 'ai'],
        featured: false,
        orientation: 'horizontal'
    },
    {
        id: 'tetris',
        title: 'Tetris',
        description: 'O famoso puzzle game. Organize as peças e sobreviva!',
        icon: '🧩',
        path: '#',
        status: 'coming-soon',
        category: 'puzzle',
        tags: ['puzzle', 'classic', 'addictive'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'snake',
        title: 'Snake',
        description: 'O clássico jogo da cobrinha. Cresça sem bater em si mesma!',
        icon: '🐍',
        path: '#',
        status: 'coming-soon',
        category: 'arcade',
        tags: ['arcade', 'classic', 'simple'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'pong',
        title: 'Pong',
        description: 'O primeiro videogame comercial. Reviva a história!',
        icon: '🏓',
        path: '#',
        status: 'coming-soon',
        category: 'arcade',
        tags: ['arcade', 'classic', 'retro'],
        featured: false,
        orientation: 'horizontal'
    },
    {
        id: 'breakout',
        title: 'Breakout',
        description: 'Quebre todos os tijolos com a bola. Diversão garantida!',
        icon: '🧱',
        path: '#',
        status: 'coming-soon',
        category: 'arcade',
        tags: ['arcade', 'classic', 'action'],
        featured: false,
        orientation: 'horizontal'
    }
];

// Função para obter jogos por categoria
function getGamesByCategory(category) {
    return games.filter(game => game.category === category);
}

// Função para obter jogos disponíveis
function getAvailableGames() {
    return games.filter(game => game.status === 'available');
}

// Função para obter jogos em breve
function getComingSoonGames() {
    return games.filter(game => game.status === 'coming-soon');
}

// Função para obter jogos em destaque
function getFeaturedGames() {
    return games.filter(game => game.featured === true);
}

// Função para buscar jogos por tag
function getGamesByTag(tag) {
    return games.filter(game => game.tags.includes(tag));
}

// Função para obter um jogo específico por ID
function getGameById(id) {
    return games.find(game => game.id === id);
}

// Função para verificar se um jogo é vertical
function isVerticalGame(gameId) {
    const game = getGameById(gameId);
    return game && game.orientation === 'vertical';
}

// Função para verificar se um jogo é horizontal
function isHorizontalGame(gameId) {
    const game = getGameById(gameId);
    return game && game.orientation === 'horizontal';
}

// Função para jogar um jogo (redireciona baseado na orientação)
function playGame(gameId) {
    const game = getGameById(gameId);
    if (!game) {
        console.error('Jogo não encontrado:', gameId);
        return;
    }

    // TODOS os jogos agora abrem no template vertical personalizado
    // Isso permite personalizar a interface independente da orientação
    const params = new URLSearchParams({
        url: game.path,
        title: game.title,
        description: game.description,
        orientation: game.orientation,
        return: window.location.href
    });
    window.location.href = `jogo-vertical-template-fixed.html?${params.toString()}`;
}

// Exportar para uso em outros arquivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        games,
        getGamesByCategory,
        getAvailableGames,
        getComingSoonGames,
        getFeaturedGames,
        getGamesByTag,
        getGameById,
        isVerticalGame,
        isHorizontalGame,
        playGame
    };
}
