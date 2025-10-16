// Configuração dos jogos - Blaey Games
// Para adicionar um novo jogo, simplesmente adicione um objeto ao array games

const games = [
    // Jogos locais/nativos
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

    // Jogos Gamezop - Horizontais
    {
        id: 'quack-hunt',
        title: 'Quack Hunt',
        description: 'Caça aos patos em uma aventura divertida!',
        icon: '🦆',
        path: 'https://10944.play.gamezop.com/g/SJXbW8smUUx',
        status: 'available',
        category: 'arcade',
        tags: ['arcade', 'hunting', 'fun'],
        featured: false,
        orientation: 'horizontal'
    },
    {
        id: 'flying-school',
        title: 'Flying School',
        description: 'Aprenda a voar e complete missões aéreas!',
        icon: '✈️',
        path: 'https://10944.play.gamezop.com/g/VJOGOyGb9l',
        status: 'available',
        category: 'simulation',
        tags: ['flying', 'simulation', 'missions'],
        featured: false,
        orientation: 'horizontal'
    },
    {
        id: 'clay-pigeon',
        title: 'Clay Pigeon',
        description: 'Teste sua pontaria atirando em alvos de argila!',
        icon: '🎯',
        path: 'https://10944.play.gamezop.com/g/HJKWbUj788l',
        status: 'available',
        category: 'sports',
        tags: ['shooting', 'sports', 'accuracy'],
        featured: false,
        orientation: 'horizontal'
    },
    {
        id: 'soccer-wizard',
        title: 'Soccer Wizard',
        description: 'Domine a magia do futebol com habilidades especiais!',
        icon: '⚽',
        path: 'https://10944.play.gamezop.com/g/6tEYzgxz2',
        status: 'available',
        category: 'sports',
        tags: ['soccer', 'magic', 'sports'],
        featured: false,
        orientation: 'horizontal'
    },
    {
        id: 'super-goalie',
        title: 'Super Goalie',
        description: 'Defenda o gol com reflexos incríveis!',
        icon: '🥅',
        path: 'https://10944.play.gamezop.com/g/SyO94GA7p',
        status: 'available',
        category: 'sports',
        tags: ['goalie', 'sports', 'reflexes'],
        featured: false,
        orientation: 'horizontal'
    },
    {
        id: 'astro-knot',
        title: 'Astro Knot',
        description: 'Desenrole nós espaciais em uma aventura cósmica!',
        icon: '🌌',
        path: 'https://10944.play.gamezop.com/g/HJD9VMRQa',
        status: 'available',
        category: 'puzzle',
        tags: ['puzzle', 'space', 'knots'],
        featured: false,
        orientation: 'horizontal'
    },
    {
        id: 'go-chicken-go',
        title: 'Go Chicken Go',
        description: 'Ajude a galinha a atravessar a estrada!',
        icon: '🐔',
        path: 'https://10944.play.gamezop.com/g/rJ57aMJDcJm',
        status: 'available',
        category: 'arcade',
        tags: ['chicken', 'arcade', 'crossing'],
        featured: false,
        orientation: 'horizontal'
    },
    {
        id: 'aliens-attack',
        title: 'Aliens Attack',
        description: 'Defenda a Terra da invasão alienígena!',
        icon: '👽',
        path: 'https://10944.play.gamezop.com/g/N1tgz_kzW5x',
        status: 'available',
        category: 'action',
        tags: ['aliens', 'action', 'defense'],
        featured: false,
        orientation: 'horizontal'
    },
    {
        id: 'plane-fight',
        title: 'Plane Fight',
        description: 'Batalhas aéreas épicas nos céus!',
        icon: '🛩️',
        path: 'https://10944.play.gamezop.com/g/H1IEpMJP917',
        status: 'available',
        category: 'action',
        tags: ['planes', 'combat', 'aircraft'],
        featured: false,
        orientation: 'horizontal'
    },
    {
        id: 'valley-of-terror',
        title: 'Valley of Terror',
        description: 'Explore um vale assombrado cheio de mistérios!',
        icon: '👻',
        path: 'https://10944.play.gamezop.com/g/B1jZWUoXUIe',
        status: 'available',
        category: 'adventure',
        tags: ['horror', 'adventure', 'mystery'],
        featured: false,
        orientation: 'horizontal'
    },
    {
        id: 'exoplanet-express',
        title: 'Exoplanet Express',
        description: 'Viaje pelo espaço em uma jornada interplanetária!',
        icon: '🚀',
        path: 'https://10944.play.gamezop.com/g/SyEQTzyw91X',
        status: 'available',
        category: 'adventure',
        tags: ['space', 'travel', 'planets'],
        featured: false,
        orientation: 'horizontal'
    },
    {
        id: 'bouncy',
        title: 'Bouncy',
        description: 'Pule e rebata em uma aventura elástica!',
        icon: '🏀',
        path: 'https://10944.play.gamezop.com/g/H1Tz6z1Dqym',
        status: 'available',
        category: 'arcade',
        tags: ['bouncing', 'arcade', 'physics'],
        featured: false,
        orientation: 'horizontal'
    },
    {
        id: 'fruit-chop',
        title: 'Fruit Chop',
        description: 'Corte frutas com precisão e velocidade!',
        icon: '🍎',
        path: 'https://10944.play.gamezop.com/g/rkWfy2pXq0r',
        status: 'available',
        category: 'arcade',
        tags: ['fruit', 'chopping', 'arcade'],
        featured: false,
        orientation: 'horizontal'
    },
    {
        id: 'evil-wyrm',
        title: 'Evil Wyrm',
        description: 'Enfrente um dragão maligno em uma batalha épica!',
        icon: '🐉',
        path: 'https://10944.play.gamezop.com/g/ry8RYrWu4',
        status: 'available',
        category: 'action',
        tags: ['dragon', 'battle', 'fantasy'],
        featured: false,
        orientation: 'horizontal'
    },
    {
        id: 'blackjack-21-pro',
        title: 'Blackjack 21 Pro',
        description: 'O clássico jogo de cartas com estratégia!',
        icon: '🃏',
        path: 'https://10944.play.gamezop.com/g/H13-Z8sQILx',
        status: 'available',
        category: 'card',
        tags: ['blackjack', 'cards', 'strategy'],
        featured: false,
        orientation: 'horizontal'
    },
    {
        id: 'poker-pai-gow',
        title: 'Poker Pai Gow',
        description: 'Variante do poker com regras únicas!',
        icon: '🎴',
        path: 'https://10944.play.gamezop.com/g/SkGIa4X0l',
        status: 'available',
        category: 'card',
        tags: ['poker', 'cards', 'strategy'],
        featured: false,
        orientation: 'horizontal'
    },
    {
        id: 'spider-solitaire',
        title: 'Spider Solitaire',
        description: 'O clássico jogo de paciência aranha!',
        icon: '🕷️',
        path: 'https://10944.play.gamezop.com/g/B1MfIa4QCg',
        status: 'available',
        category: 'card',
        tags: ['solitaire', 'cards', 'patience'],
        featured: false,
        orientation: 'horizontal'
    },
    {
        id: 'zuno',
        title: 'ZUNO',
        description: 'O famoso jogo de cartas UNO!',
        icon: '🎯',
        path: 'https://10944.play.gamezop.com/g/ByQxJnp7qRB',
        status: 'available',
        category: 'card',
        tags: ['uno', 'cards', 'family'],
        featured: false,
        orientation: 'horizontal'
    },
    {
        id: 'jelly-bears',
        title: 'Jelly Bears',
        description: 'Combine ursos de gelatina em combinações doces!',
        icon: '🧸',
        path: 'https://10944.play.gamezop.com/g/SJcRYSbu4',
        status: 'available',
        category: 'match3',
        tags: ['match3', 'bears', 'candy'],
        featured: false,
        orientation: 'horizontal'
    },
    {
        id: 'fruit-chop-trip',
        title: 'Fruit Chop Trip',
        description: 'Corte frutas em uma viagem deliciosa!',
        icon: '🍓',
        path: 'https://10944.play.gamezop.com/g/rkWfy2pXq0r',
        status: 'available',
        category: 'arcade',
        tags: ['fruit', 'chopping', 'trip'],
        featured: false,
        orientation: 'horizontal'
    },
    {
        id: 'pixel-slime',
        title: 'Pixel Slime',
        description: 'Aventure-se com slimes pixelados!',
        icon: '🟢',
        path: 'https://10944.play.gamezop.com/g/Sk728YXJx',
        status: 'available',
        category: 'adventure',
        tags: ['slime', 'pixel', 'adventure'],
        featured: false,
        orientation: 'horizontal'
    },
    {
        id: 'racing-cars',
        title: 'Racing Cars',
        description: 'Corridas de carros em alta velocidade!',
        icon: '🏎️',
        path: 'https://play.famobi.com/racing-cars',
        status: 'available',
        category: 'racing',
        tags: ['racing', 'cars', 'speed'],
        featured: false,
        orientation: 'horizontal'
    },
    {
        id: 'high-hills',
        title: 'High Hills',
        description: 'Dirija pelas montanhas em uma aventura off-road!',
        icon: '⛰️',
        path: 'https://play.famobi.com/high-hills',
        status: 'available',
        category: 'racing',
        tags: ['racing', 'hills', 'offroad'],
        featured: false,
        orientation: 'horizontal'
    },
    {
        id: 'adventure-drivers',
        title: 'Adventure Drivers',
        description: 'Aventure-se dirigindo por terrenos perigosos!',
        icon: '🚗',
        path: 'https://play.famobi.com/adventure-drivers',
        status: 'available',
        category: 'racing',
        tags: ['racing', 'adventure', 'driving'],
        featured: false,
        orientation: 'horizontal'
    },
    {
        id: 'truck-trials',
        title: 'Truck Trials',
        description: 'Teste suas habilidades com caminhões!',
        icon: '🚛',
        path: 'https://play.famobi.com/truck-trials',
        status: 'available',
        category: 'racing',
        tags: ['racing', 'trucks', 'trials'],
        featured: false,
        orientation: 'horizontal'
    },
    {
        id: 'thug-racer',
        title: 'Thug Racer',
        description: 'Corridas urbanas com estilo!',
        icon: '🏍️',
        path: 'https://play.famobi.com/thug-racer',
        status: 'available',
        category: 'racing',
        tags: ['racing', 'urban', 'style'],
        featured: false,
        orientation: 'horizontal'
    },
    {
        id: 'speed-club-nitro',
        title: 'Speed Club Nitro',
        description: 'Corridas com nitro para máxima velocidade!',
        icon: '💨',
        path: 'https://play.famobi.com/sprint-club-nitro',
        status: 'available',
        category: 'racing',
        tags: ['racing', 'nitro', 'speed'],
        featured: false,
        orientation: 'horizontal'
    },
    {
        id: 'race-right',
        title: 'Race Right',
        description: 'Corridas precisas e estratégicas!',
        icon: '🏁',
        path: 'https://play.famobi.com/race-right',
        status: 'available',
        category: 'racing',
        tags: ['racing', 'precision', 'strategy'],
        featured: false,
        orientation: 'horizontal'
    },

    // Jogos Gamezop - Verticais
    {
        id: 'darts',
        title: 'Darts',
        description: 'Jogue dardos e teste sua pontaria!',
        icon: '🎯',
        path: 'https://10944.play.gamezop.com/g/SkF7yhp7q0B',
        status: 'available',
        category: 'sports',
        tags: ['darts', 'sports', 'accuracy'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'bowling-stars',
        title: 'Bowling Stars',
        description: 'Boliche com estrelas e efeitos especiais!',
        icon: '🎳',
        path: 'https://10944.play.gamezop.com/g/BkdJhTX50B',
        status: 'available',
        category: 'sports',
        tags: ['bowling', 'sports', 'stars'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'homerun-hit',
        title: 'Homerun Hit',
        description: 'Bata home runs em um jogo de beisebol!',
        icon: '⚾',
        path: 'https://10944.play.gamezop.com/g/B1H5NfCXa',
        status: 'available',
        category: 'sports',
        tags: ['baseball', 'sports', 'homerun'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'pool-master',
        title: 'Pool Master',
        description: 'Domine o jogo de sinuca com precisão!',
        icon: '🎱',
        path: 'https://10944.play.gamezop.com/g/hgempP8Sc',
        status: 'available',
        category: 'sports',
        tags: ['pool', 'sports', 'precision'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'table-tennis-shots',
        title: 'Table Tennis Shots',
        description: 'Tênis de mesa com tiros precisos!',
        icon: '🏓',
        path: 'https://10944.play.gamezop.com/g/HJY4pfJP9JQ',
        status: 'available',
        category: 'sports',
        tags: ['tennis', 'sports', 'shots'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'pixel-zombies',
        title: 'Pixel Zombies',
        description: 'Sobreviva ao apocalipse zumbi pixelado!',
        icon: '🧟',
        path: 'https://10944.play.gamezop.com/g/S14VrK8B',
        status: 'available',
        category: 'action',
        tags: ['zombies', 'pixel', 'survival'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'shadow-run',
        title: 'Shadow Run',
        description: 'Corra nas sombras em uma aventura noturna!',
        icon: '🏃',
        path: 'https://10944.play.gamezop.com/g/S1kGWUim8Ux',
        status: 'available',
        category: 'action',
        tags: ['running', 'shadows', 'night'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'gun-master',
        title: 'Gun Master',
        description: 'Domine todas as armas em combates épicos!',
        icon: '🔫',
        path: 'https://10944.play.gamezop.com/g/REwFeKcoN',
        status: 'available',
        category: 'action',
        tags: ['guns', 'combat', 'master'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'gerbil-jump',
        title: 'Gerbil Jump',
        description: 'Pule com gerbils em uma aventura saltitante!',
        icon: '🐹',
        path: 'https://10944.play.gamezop.com/g/BJzGTMJv91Q',
        status: 'available',
        category: 'arcade',
        tags: ['jumping', 'gerbils', 'arcade'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'punch-heroes',
        title: 'Punch Heroes',
        description: 'Lute como heróis em combates de soco!',
        icon: '👊',
        path: 'https://10944.play.gamezop.com/g/Sy64_WbU',
        status: 'available',
        category: 'action',
        tags: ['fighting', 'heroes', 'punching'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'boulder-blast',
        title: 'Boulder Blast',
        description: 'Exploda rochas em uma explosão de diversão!',
        icon: '💥',
        path: 'https://10944.play.gamezop.com/g/HkTQJhTXqRS',
        status: 'available',
        category: 'arcade',
        tags: ['explosion', 'boulders', 'blast'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'saloon-robbery',
        title: 'Saloon Robbery',
        description: 'Assalte o saloon no Velho Oeste!',
        icon: '🏪',
        path: 'https://10944.play.gamezop.com/g/SJ8X6zyPcyX',
        status: 'available',
        category: 'action',
        tags: ['western', 'robbery', 'saloon'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'tower-twist',
        title: 'Tower Twist',
        description: 'Gire torres em um puzzle desafiador!',
        icon: '🗼',
        path: 'https://10944.play.gamezop.com/g/HJT46GkPcy7',
        status: 'available',
        category: 'puzzle',
        tags: ['tower', 'twist', 'puzzle'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'vegetables-vs-chef',
        title: 'Vegetables vs. Chef',
        description: 'Vegetais contra chef em uma batalha culinária!',
        icon: '🥕',
        path: 'https://10944.play.gamezop.com/g/H1be5Ef0Qp',
        status: 'available',
        category: 'action',
        tags: ['vegetables', 'chef', 'cooking'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'tricky-trip',
        title: 'Tricky Trip',
        description: 'Uma viagem complicada cheia de desafios!',
        icon: '🎒',
        path: 'https://10944.play.gamezop.com/g/NJ3xGOyfb5l',
        status: 'available',
        category: 'adventure',
        tags: ['trip', 'tricky', 'adventure'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'savage-revenge',
        title: 'Savage Revenge',
        description: 'Vingança selvagem em uma aventura épica!',
        icon: '⚔️',
        path: 'https://10944.play.gamezop.com/g/ry6bwfUt_Jg',
        status: 'available',
        category: 'action',
        tags: ['revenge', 'savage', 'epic'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'battleships-armada-21-pro',
        title: 'Battleships Armada 21 Pro',
        description: 'Batalha naval profissional com armadas!',
        icon: '🚢',
        path: 'https://10944.play.gamezop.com/g/rkt7TzJv9k7',
        status: 'available',
        category: 'strategy',
        tags: ['battleships', 'naval', 'strategy'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'solitaire-gold',
        title: 'Solitaire Gold',
        description: 'Paciência dourada com gráficos premium!',
        icon: '🃏',
        path: 'https://10944.play.gamezop.com/g/rkPlk2T7qAr',
        status: 'available',
        category: 'card',
        tags: ['solitaire', 'gold', 'cards'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'cubes-got-moves',
        title: 'Cubes Got Moves',
        description: 'Cubos com movimentos incríveis!',
        icon: '🧊',
        path: 'https://10944.play.gamezop.com/g/S1JXaMJDqJX',
        status: 'available',
        category: 'puzzle',
        tags: ['cubes', 'moves', 'puzzle'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'drop-me',
        title: 'Drop Me',
        description: 'Me solte em uma queda emocionante!',
        icon: '⬇️',
        path: 'https://10944.play.gamezop.com/g/SJghvtd2_',
        status: 'available',
        category: 'arcade',
        tags: ['drop', 'falling', 'arcade'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'hex-burst',
        title: 'Hex Burst',
        description: 'Explosões hexagonais em um puzzle colorido!',
        icon: '⬡',
        path: 'https://10944.play.gamezop.com/g/H1abja2M_eb',
        status: 'available',
        category: 'puzzle',
        tags: ['hex', 'burst', 'puzzle'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'illuminate',
        title: 'Illuminate',
        description: 'Ilumine o caminho em uma aventura luminosa!',
        icon: '💡',
        path: 'https://10944.play.gamezop.com/g/rkHuVQ-1K',
        status: 'available',
        category: 'puzzle',
        tags: ['light', 'illuminate', 'puzzle'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'templok',
        title: 'Templok',
        description: 'Blocos de templo em um puzzle sagrado!',
        icon: '🏛️',
        path: 'https://10944.play.gamezop.com/g/mfuw6HsxP',
        status: 'available',
        category: 'puzzle',
        tags: ['temple', 'blocks', 'puzzle'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'tic-tac-toe',
        title: 'Tic Tac Toe',
        description: 'O clássico jogo da velha!',
        icon: '❌',
        path: 'https://10944.play.gamezop.com/g/H1WmafkP9JQ',
        status: 'available',
        category: 'strategy',
        tags: ['tic-tac-toe', 'classic', 'strategy'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'merge-mania',
        title: 'Merge Mania',
        description: 'Combine elementos em uma mania de fusão!',
        icon: '🔄',
        path: 'https://10944.play.gamezop.com/g/hfPOimYqY',
        status: 'available',
        category: 'puzzle',
        tags: ['merge', 'mania', 'puzzle'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'box-crush',
        title: 'Box Crush',
        description: 'Esmague caixas em uma explosão de diversão!',
        icon: '📦',
        path: 'https://10944.play.gamezop.com/g/S1Wrpf1v5ym',
        status: 'available',
        category: 'arcade',
        tags: ['boxes', 'crush', 'arcade'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'bubble-shooter-classic',
        title: 'Bubble Shooter Classic',
        description: 'O clássico jogo de atirar bolhas!',
        icon: '🫧',
        path: 'https://10944.play.gamezop.com/g/yVywAGBQ6',
        status: 'available',
        category: 'match3',
        tags: ['bubbles', 'shooter', 'classic'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'bubble-smash',
        title: 'Bubble Smash',
        description: 'Esmague bolhas em uma explosão colorida!',
        icon: '💥',
        path: 'https://10944.play.gamezop.com/g/ryJGkhT7qAB',
        status: 'available',
        category: 'match3',
        tags: ['bubbles', 'smash', 'colorful'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'bubble-wipeout',
        title: 'Bubble Wipeout',
        description: 'Elimine bolhas em uma limpeza total!',
        icon: '🧹',
        path: 'https://10944.play.gamezop.com/g/H1AN6fkwqJ7',
        status: 'available',
        category: 'match3',
        tags: ['bubbles', 'wipeout', 'clean'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'candy-fiesta',
        title: 'Candy Fiesta',
        description: 'Uma festa de doces em um jogo colorido!',
        icon: '🍭',
        path: 'https://10944.play.gamezop.com/g/r1zG1h6m90H',
        status: 'available',
        category: 'match3',
        tags: ['candy', 'fiesta', 'colorful'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'cyberfusion',
        title: 'Cyberfusion',
        description: 'Fusão cibernética em um futuro digital!',
        icon: '🤖',
        path: 'https://10944.play.gamezop.com/g/HJXei0j',
        status: 'available',
        category: 'match3',
        tags: ['cyber', 'fusion', 'digital'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'happy-kittens',
        title: 'Happy Kittens',
        description: 'Gatinhos felizes em um jogo adorável!',
        icon: '🐱',
        path: 'https://10944.play.gamezop.com/g/BJsmaGJw91m',
        status: 'available',
        category: 'match3',
        tags: ['kittens', 'happy', 'cute'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'dodge-bot',
        title: 'Dodge Bot',
        description: 'Desvie com robôs em uma aventura tecnológica!',
        icon: '🤖',
        path: 'https://10944.play.gamezop.com/g/SJ2OGpIn',
        status: 'available',
        category: 'action',
        tags: ['dodge', 'robot', 'tech'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'escape-run',
        title: 'Escape Run',
        description: 'Corra para escapar em uma fuga emocionante!',
        icon: '🏃‍♂️',
        path: 'https://10944.play.gamezop.com/g/Skz4pzkDqyX',
        status: 'available',
        category: 'action',
        tags: ['escape', 'running', 'thrilling'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'knife-flip',
        title: 'Knife Flip',
        description: 'Gire facas com precisão mortal!',
        icon: '🔪',
        path: 'https://10944.play.gamezop.com/g/H1PJn6mqAr',
        status: 'available',
        category: 'arcade',
        tags: ['knife', 'flip', 'precision'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'rollout',
        title: 'Rollout',
        description: 'Role para fora em uma aventura rodante!',
        icon: '🎲',
        path: 'https://10944.play.gamezop.com/g/HkRMTzJDck7',
        status: 'available',
        category: 'arcade',
        tags: ['roll', 'out', 'rolling'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'sticky-goo',
        title: 'Sticky Goo',
        description: 'Gosma pegajosa em uma aventura viscosa!',
        icon: '🟢',
        path: 'https://10944.play.gamezop.com/g/rJJMVIa8p-x',
        status: 'available',
        category: 'arcade',
        tags: ['sticky', 'goo', 'viscous'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'the-sea-lion-act',
        title: 'The Sea Lion Act',
        description: 'Atos de leão-marinho em um show aquático!',
        icon: '🦭',
        path: 'https://10944.play.gamezop.com/g/SyQZs6nzueW',
        status: 'available',
        category: 'arcade',
        tags: ['sea-lion', 'act', 'aquatic'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'junior-chess',
        title: 'Junior Chess',
        description: 'Xadrez para iniciantes e jovens!',
        icon: '♟️',
        path: 'https://10944.play.gamezop.com/g/Hkh7azyv9km',
        status: 'available',
        category: 'strategy',
        tags: ['chess', 'junior', 'strategy'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'carrom-hero',
        title: 'Carrom Hero',
        description: 'Herói do carrom em batalhas de mesa!',
        icon: '🎯',
        path: 'https://10944.play.gamezop.com/g/H1Hgyn6XqAS',
        status: 'available',
        category: 'sports',
        tags: ['carrom', 'hero', 'table'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'chess-grandmaster',
        title: 'Chess Grandmaster',
        description: 'Xadrez para grandes mestres!',
        icon: '♔',
        path: 'https://10944.play.gamezop.com/g/rkAXTzkD5kX',
        status: 'available',
        category: 'strategy',
        tags: ['chess', 'grandmaster', 'strategy'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'ludo-with-friends',
        title: 'Ludo With Friends',
        description: 'Ludo com amigos em partidas emocionantes!',
        icon: '🎲',
        path: 'https://10944.play.gamezop.com/g/SkhljT2fdgb',
        status: 'available',
        category: 'board',
        tags: ['ludo', 'friends', 'board'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'bff-easter-photobooth',
        title: 'BFF Easter Photobooth',
        description: 'Cabine fotográfica de Páscoa com melhores amigas!',
        icon: '📸',
        path: 'https://10944.play.gamezop.com/g/w2hosWGmg',
        status: 'available',
        category: 'casual',
        tags: ['bff', 'easter', 'photobooth'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'bffs-retro-time-travel',
        title: 'BFFs Retro Time Travel',
        description: 'Viagem no tempo retrô com melhores amigas!',
        icon: '⏰',
        path: 'https://10944.play.gamezop.com/g/DPRFuJbmX',
        status: 'available',
        category: 'casual',
        tags: ['bff', 'retro', 'time-travel'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'ellie-bachelorette-party',
        title: 'Ellie Bachelorette Party',
        description: 'Festa de despedida de solteira da Ellie!',
        icon: '🎉',
        path: 'https://10944.play.gamezop.com/g/NzI2gCZFn',
        status: 'available',
        category: 'casual',
        tags: ['ellie', 'bachelorette', 'party'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'ellie-summer-spa',
        title: 'Ellie Summer Spa',
        description: 'Spa de verão da Ellie para relaxar!',
        icon: '🧖‍♀️',
        path: 'https://10944.play.gamezop.com/g/lzFg1zsV5',
        status: 'available',
        category: 'casual',
        tags: ['ellie', 'summer', 'spa'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'from-nerd-to-popular',
        title: 'From Nerd to Popular',
        description: 'Transforme-se de nerd em popular!',
        icon: '👓',
        path: 'https://10944.play.gamezop.com/g/XuSI73Wi5',
        status: 'available',
        category: 'casual',
        tags: ['nerd', 'popular', 'transformation'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'kendel-7-days-7-styles',
        title: 'Kendel 7 Days 7 Styles',
        description: '7 dias e 7 estilos com Kendel!',
        icon: '👗',
        path: 'https://10944.play.gamezop.com/g/6ZoRUpfOn',
        status: 'available',
        category: 'casual',
        tags: ['kendel', 'styles', 'fashion'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'rafting-adventure',
        title: 'Rafting Adventure',
        description: 'Aventura de rafting em águas turbulentas!',
        icon: '🛶',
        path: 'https://10944.play.gamezop.com/g/4JcZiV3XWql',
        status: 'available',
        category: 'adventure',
        tags: ['rafting', 'adventure', 'water'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'fruity-fiesta',
        title: 'Fruity Fiesta',
        description: 'Festa de frutas em um jogo colorido!',
        icon: '🍓',
        path: 'https://10944.play.gamezop.com/g/mKZZW9NXW',
        status: 'available',
        category: 'match3',
        tags: ['fruit', 'fiesta', 'colorful'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'tanques-hill-top',
        title: 'Tanques Hill Top',
        description: 'Tanques no topo da colina em batalhas épicas!',
        icon: '🚗',
        path: 'https://10944.play.gamezop.com/g/Cg8EBuMp7',
        status: 'available',
        category: 'action',
        tags: ['tanks', 'hill', 'battle'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'assassins-hunt-wild-west',
        title: 'Assassin\'s Hunt: Wild West',
        description: 'Caça de assassinos no Velho Oeste!',
        icon: '🤠',
        path: 'https://10944.play.gamezop.com/g/9lpHai56Q',
        status: 'available',
        category: 'action',
        tags: ['assassin', 'wild-west', 'hunt'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'cerco-viking',
        title: 'Cerco Viking',
        description: 'Cerco viking em batalhas épicas!',
        icon: '⚔️',
        path: 'https://10944.play.gamezop.com/g/Umfd7yvMd',
        status: 'available',
        category: 'action',
        tags: ['viking', 'siege', 'epic'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'kingdom-fight-2',
        title: 'Kingdom Fight 2',
        description: 'Luta de reinos em uma sequência épica!',
        icon: '🏰',
        path: 'https://10944.play.gamezop.com/g/Rt5ytrd0m',
        status: 'available',
        category: 'strategy',
        tags: ['kingdom', 'fight', 'epic'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'kingdom-fight',
        title: 'Kingdom Fight',
        description: 'Luta de reinos em batalhas estratégicas!',
        icon: '⚔️',
        path: 'https://10944.play.gamezop.com/g/SyfxJ3a75Cr',
        status: 'available',
        category: 'strategy',
        tags: ['kingdom', 'fight', 'strategy'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'chef-tycoon',
        title: 'Chef Tycoon',
        description: 'Construa um império culinário como chef!',
        icon: '👨‍🍳',
        path: 'https://10944.play.gamezop.com/g/xqO4nZ6Kt',
        status: 'available',
        category: 'simulation',
        tags: ['chef', 'tycoon', 'cooking'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'hoopball-legends',
        title: 'Hoopball Legends',
        description: 'Basquete com aros em uma lenda esportiva!',
        icon: '🏀',
        path: 'https://10944.play.gamezop.com/g/H15Qk3pQ5CH',
        status: 'available',
        category: 'sports',
        tags: ['basketball', 'hoop', 'legends'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'bouncy-express',
        title: 'Bouncy Express',
        description: 'Expresso saltitante em uma viagem elástica!',
        icon: '🚂',
        path: 'https://10944.play.gamezop.com/g/H1Tz6z1Dqym',
        status: 'available',
        category: 'arcade',
        tags: ['bouncy', 'express', 'elastic'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'jumpy-the-first-jumper',
        title: 'Jumpy: The First Jumper',
        description: 'Jumpy, o primeiro saltador em uma aventura épica!',
        icon: '🦘',
        path: 'https://10944.play.gamezop.com/g/HkO-wf8F_Jx',
        status: 'available',
        category: 'arcade',
        tags: ['jumpy', 'jumper', 'epic'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'drift-dudes',
        title: 'Drift Dudes',
        description: 'Caras do drift em corridas deslizantes!',
        icon: '🏎️',
        path: 'https://play.famobi.com/drift-dudes',
        status: 'available',
        category: 'racing',
        tags: ['drift', 'dudes', 'racing'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'drift-cup-racing',
        title: 'Drift Cup Racing',
        description: 'Copa de drift em corridas profissionais!',
        icon: '🏆',
        path: 'https://play.famobi.com/drift-cup-racing',
        status: 'available',
        category: 'racing',
        tags: ['drift', 'cup', 'racing'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'rival-rush',
        title: 'Rival Rush',
        description: 'Corrida rival em uma disputa acirrada!',
        icon: '🏁',
        path: 'https://play.famobi.com/rival-rush',
        status: 'available',
        category: 'racing',
        tags: ['rival', 'rush', 'racing'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'burnin-rubber',
        title: 'Burnin Rubber',
        description: 'Queime borracha em corridas de alta velocidade!',
        icon: '🔥',
        path: 'https://play.famobi.com/burnin-rubber',
        status: 'available',
        category: 'racing',
        tags: ['burning', 'rubber', 'speed'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'street-pursuit',
        title: 'Street Pursuit',
        description: 'Perseguição nas ruas em alta velocidade!',
        icon: '🚔',
        path: 'https://play.famobi.com/street-pursuit',
        status: 'available',
        category: 'racing',
        tags: ['street', 'pursuit', 'chase'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'speed-master',
        title: 'Speed Master',
        description: 'Mestre da velocidade em corridas extremas!',
        icon: '⚡',
        path: 'https://play.famobi.com/speed-master',
        status: 'available',
        category: 'racing',
        tags: ['speed', 'master', 'extreme'],
        featured: false,
        orientation: 'vertical'
    },
    {
        id: 'cars-arena',
        title: 'Cars Arena',
        description: 'Arena de carros em batalhas automotivas!',
        icon: '🏟️',
        path: 'https://play.famobi.com/cars-arena',
        status: 'available',
        category: 'racing',
        tags: ['cars', 'arena', 'battle'],
        featured: false,
        orientation: 'vertical'
    },

    // Jogos em breve
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
