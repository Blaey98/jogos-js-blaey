// Sistema modular de modos de jogo
var GameModes = {
    // Modo clássico 8-ball
    CLASSIC_8BALL: {
        id: "classic_8ball",
        name: "8-Ball Clássico",
        description: "Jogo tradicional de sinuca com bola branca",
        ballCount: 16, // 15 coloridas + 1 branca
        hasCueBall: true,
        rules: {
            solids: [1, 2, 3, 4, 5, 6, 7],
            stripes: [9, 10, 11, 12, 13, 14, 15],
            eightBall: 8,
            cueBall: 0
        },
        winCondition: "pocket_8ball_after_solids_or_stripes"
    },
    
    // Modo mata-mata
    ELIMINATION: {
        id: "elimination",
        name: "Mata-Mata",
        description: "6 bolinhas vermelhas vs 6 bolinhas azuis - elimine todas do adversário",
        ballCount: 12, // 6 vermelhas + 6 azuis
        hasCueBall: false,
        rules: {
            redBalls: [1, 2, 3, 4, 5, 6],
            blueBalls: [7, 8, 9, 10, 11, 12]
        },
        winCondition: "eliminate_all_opponent_balls"
    },
    
    // Modo 9-ball
    NINE_BALL: {
        id: "nine_ball",
        name: "9-Ball",
        description: "Jogo com bolas numeradas de 1 a 9",
        ballCount: 10, // 9 coloridas + 1 branca
        hasCueBall: true,
        rules: {
            numberedBalls: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            cueBall: 0
        },
        winCondition: "pocket_9ball_legally"
    }
};

// Configuração de bolas para cada modo
var BallConfigs = {
    classic_8ball: {
        // Bola branca (taco)
        0: { color: "white", type: "cue", number: 0 },
        // Bolas sólidas
        1: { color: "yellow", type: "solid", number: 1 },
        2: { color: "blue", type: "solid", number: 2 },
        3: { color: "red", type: "solid", number: 3 },
        4: { color: "purple", type: "solid", number: 4 },
        5: { color: "orange", type: "solid", number: 5 },
        6: { color: "green", type: "solid", number: 6 },
        7: { color: "maroon", type: "solid", number: 7 },
        // Bola 8
        8: { color: "black", type: "eight", number: 8 },
        // Bolas listradas
        9: { color: "yellow", type: "stripe", number: 9, stripe: true },
        10: { color: "blue", type: "stripe", number: 10, stripe: true },
        11: { color: "red", type: "stripe", number: 11, stripe: true },
        12: { color: "purple", type: "stripe", number: 12, stripe: true },
        13: { color: "orange", type: "stripe", number: 13, stripe: true },
        14: { color: "green", type: "stripe", number: 14, stripe: true },
        15: { color: "maroon", type: "stripe", number: 15, stripe: true }
    },
    
    elimination: {
        // Bolas vermelhas
        1: { color: "red", type: "red_team", number: 1, team: "red" },
        2: { color: "red", type: "red_team", number: 2, team: "red" },
        3: { color: "red", type: "red_team", number: 3, team: "red" },
        4: { color: "red", type: "red_team", number: 4, team: "red" },
        5: { color: "red", type: "red_team", number: 5, team: "red" },
        6: { color: "red", type: "red_team", number: 6, team: "red" },
        // Bolas azuis
        7: { color: "blue", type: "blue_team", number: 7, team: "blue" },
        8: { color: "blue", type: "blue_team", number: 8, team: "blue" },
        9: { color: "blue", type: "blue_team", number: 9, team: "blue" },
        10: { color: "blue", type: "blue_team", number: 10, team: "blue" },
        11: { color: "blue", type: "blue_team", number: 11, team: "blue" },
        12: { color: "blue", type: "blue_team", number: 12, team: "blue" }
    },
    
    nine_ball: {
        // Bola branca
        0: { color: "white", type: "cue", number: 0 },
        // Bolas numeradas
        1: { color: "yellow", type: "numbered", number: 1 },
        2: { color: "blue", type: "numbered", number: 2 },
        3: { color: "red", type: "numbered", number: 3 },
        4: { color: "purple", type: "numbered", number: 4 },
        5: { color: "orange", type: "numbered", number: 5 },
        6: { color: "green", type: "numbered", number: 6 },
        7: { color: "maroon", type: "numbered", number: 7 },
        8: { color: "black", type: "numbered", number: 8 },
        9: { color: "yellow", type: "numbered", number: 9 }
    }
};

// Sistema de posicionamento das bolas
var BallPositions = {
    classic_8ball: function() {
        return [
            // Bola branca
            { x: -200, y: 0, id: 0 },
            // Triângulo de bolas
            { x: 200, y: 0, id: 8 }, // 8-ball no centro
            { x: 150, y: -25, id: 1 },
            { x: 150, y: 25, id: 2 },
            { x: 100, y: -50, id: 3 },
            { x: 100, y: 0, id: 4 },
            { x: 100, y: 50, id: 5 },
            { x: 50, y: -75, id: 6 },
            { x: 50, y: -25, id: 7 },
            { x: 50, y: 25, id: 9 },
            { x: 50, y: 75, id: 10 },
            { x: 0, y: -100, id: 11 },
            { x: 0, y: -50, id: 12 },
            { x: 0, y: 50, id: 13 },
            { x: 0, y: 100, id: 14 },
            { x: -50, y: 0, id: 15 }
        ];
    },
    
    elimination: function() {
        return [
            // Lado vermelho (esquerda)
            { x: -300, y: -100, id: 1 },
            { x: -300, y: -50, id: 2 },
            { x: -300, y: 0, id: 3 },
            { x: -300, y: 50, id: 4 },
            { x: -300, y: 100, id: 5 },
            { x: -300, y: 150, id: 6 },
            // Lado azul (direita)
            { x: 300, y: -100, id: 7 },
            { x: 300, y: -50, id: 8 },
            { x: 300, y: 0, id: 9 },
            { x: 300, y: 50, id: 10 },
            { x: 300, y: 100, id: 11 },
            { x: 300, y: 150, id: 12 }
        ];
    },
    
    nine_ball: function() {
        return [
            // Bola branca
            { x: -200, y: 0, id: 0 },
            // Diamante de bolas
            { x: 200, y: 0, id: 1 },
            { x: 150, y: -25, id: 2 },
            { x: 150, y: 25, id: 3 },
            { x: 100, y: -50, id: 4 },
            { x: 100, y: 0, id: 5 },
            { x: 100, y: 50, id: 6 },
            { x: 50, y: -75, id: 7 },
            { x: 50, y: -25, id: 8 },
            { x: 50, y: 25, id: 9 }
        ];
    }
};

// Sistema de regras para cada modo
var GameRules = {
    classic_8ball: {
        setup: function() {
            // Configuração padrão do 8-ball
            projectInfo.mode = 1;
            projectInfo.levelName = "classic_8ball";
            projectInfo.tutorial = false;
        },
        checkWin: function() {
            // Verificar se 8-ball foi encaçapada legalmente
            return projectInfo.eightBallPocketed && projectInfo.solidsOrStripesComplete;
        }
    },
    
    elimination: {
        setup: function() {
            // Configuração do mata-mata
            projectInfo.mode = 3; // Novo modo
            projectInfo.levelName = "elimination";
            projectInfo.tutorial = false;
            projectInfo.redBallsRemaining = 6;
            projectInfo.blueBallsRemaining = 6;
            projectInfo.currentTeam = "red"; // Começa com vermelhas
        },
        checkWin: function() {
            // Verificar se alguma equipe foi eliminada
            return projectInfo.redBallsRemaining === 0 || projectInfo.blueBallsRemaining === 0;
        },
        getWinner: function() {
            if (projectInfo.redBallsRemaining === 0) return "blue";
            if (projectInfo.blueBallsRemaining === 0) return "red";
            return null;
        }
    },
    
    nine_ball: {
        setup: function() {
            // Configuração do 9-ball
            projectInfo.mode = 4;
            projectInfo.levelName = "nine_ball";
            projectInfo.tutorial = false;
        },
        checkWin: function() {
            // Verificar se 9-ball foi encaçapada legalmente
            return projectInfo.nineBallPocketed;
        }
    }
};

// Exportar para uso global
window.GameModes = GameModes;
window.BallConfigs = BallConfigs;
window.BallPositions = BallPositions;
window.GameRules = GameRules;
