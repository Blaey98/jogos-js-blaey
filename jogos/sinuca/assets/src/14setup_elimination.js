// Setup modificado para modo mata-mata
var eliminationSetup = {
    init: function() {
        console.log('🎱 Inicializando modo mata-mata...');
        
        // Configurar variáveis específicas do mata-mata
        this.eliminationInfo = {
            redBallsRemaining: 6,
            blueBallsRemaining: 6,
            currentTeam: "red", // Começa com vermelhas
            gameOver: false,
            winner: null
        };
        
        // Configurar projectInfo para mata-mata
        if (window.projectInfo) {
            window.projectInfo.mode = 3; // Novo modo
            window.projectInfo.levelName = "elimination";
            window.projectInfo.tutorial = false;
            window.projectInfo.redBallsRemaining = 6;
            window.projectInfo.blueBallsRemaining = 6;
            window.projectInfo.currentTeam = "red";
        }
    },
    
    create: function() {
        console.log('🎱 Criando jogo mata-mata...');
        
        // Configurar bolas para mata-mata
        this.setupEliminationBalls();
        
        // Configurar interface
        this.setupEliminationUI();
        
        // Configurar regras
        this.setupEliminationRules();
    },
    
    setupEliminationBalls: function() {
        console.log('🎱 Configurando bolas para mata-mata...');
        
        // Limpar bolas existentes
        if (window.gameInfo && window.gameInfo.ballArray) {
            window.gameInfo.ballArray = [];
        }
        
        // Configurar posições das bolas
        var ballPositions = [
            // Lado vermelho (esquerda)
            { x: -300, y: -100, id: 1, team: "red" },
            { x: -300, y: -50, id: 2, team: "red" },
            { x: -300, y: 0, id: 3, team: "red" },
            { x: -300, y: 50, id: 4, team: "red" },
            { x: -300, y: 100, id: 5, team: "red" },
            { x: -300, y: 150, id: 6, team: "red" },
            // Lado azul (direita)
            { x: 300, y: -100, id: 7, team: "blue" },
            { x: 300, y: -50, id: 8, team: "blue" },
            { x: 300, y: 0, id: 9, team: "blue" },
            { x: 300, y: 50, id: 10, team: "blue" },
            { x: 300, y: 100, id: 11, team: "blue" },
            { x: 300, y: 150, id: 12, team: "blue" }
        ];
        
        // Criar bolas
        for (var i = 0; i < ballPositions.length; i++) {
            var pos = ballPositions[i];
            var ball = {
                id: pos.id,
                team: pos.team,
                position: { x: pos.x, y: pos.y },
                velocity: { x: 0, y: 0 },
                active: true,
                color: pos.team === "red" ? "red" : "blue"
            };
            
            if (!window.gameInfo.ballArray) {
                window.gameInfo.ballArray = [];
            }
            window.gameInfo.ballArray.push(ball);
        }
        
        console.log('🎱 Bolas configuradas:', window.gameInfo.ballArray.length);
    },
    
    setupEliminationUI: function() {
        console.log('🎱 Configurando interface para mata-mata...');
        
        // Configurar interface específica
        if (window.gameInfo) {
            // Remover elementos não necessários
            if (window.gameInfo.cue) {
                window.gameInfo.cue.visible = false;
            }
            if (window.gameInfo.cueShadow) {
                window.gameInfo.cueShadow.visible = false;
            }
            
            // Configurar placar
            this.setupEliminationScore();
        }
    },
    
    setupEliminationScore: function() {
        console.log('🎱 Configurando placar para mata-mata...');
        
        // Criar placar específico para mata-mata
        var scoreText = document.createElement('div');
        scoreText.id = 'elimination-score';
        scoreText.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px 20px;
            border-radius: 10px;
            font-family: Arial, sans-serif;
            font-size: 18px;
            z-index: 1000;
        `;
        
        this.updateEliminationScore();
        document.body.appendChild(scoreText);
    },
    
    updateEliminationScore: function() {
        var scoreElement = document.getElementById('elimination-score');
        if (scoreElement && this.eliminationInfo) {
            scoreElement.innerHTML = `
                <div style="display: flex; gap: 20px; align-items: center;">
                    <div style="color: red;">🔴 Vermelhas: ${this.eliminationInfo.redBallsRemaining}</div>
                    <div style="color: white;">vs</div>
                    <div style="color: blue;">🔵 Azuis: ${this.eliminationInfo.blueBallsRemaining}</div>
                    <div style="margin-left: 20px; color: ${this.eliminationInfo.currentTeam === 'red' ? 'red' : 'blue'};">
                        Turno: ${this.eliminationInfo.currentTeam === 'red' ? 'Vermelhas' : 'Azuis'}
                    </div>
                </div>
            `;
        }
    },
    
    setupEliminationRules: function() {
        console.log('🎱 Configurando regras para mata-mata...');
        
        // Regras específicas do mata-mata
        this.eliminationRules = {
            // Verificar se uma bola foi encaçapada
            checkBallPocketed: function(ball) {
                if (ball.team === "red") {
                    this.eliminationInfo.redBallsRemaining--;
                    console.log('🔴 Bola vermelha eliminada! Restam:', this.eliminationInfo.redBallsRemaining);
                } else if (ball.team === "blue") {
                    this.eliminationInfo.blueBallsRemaining--;
                    console.log('🔵 Bola azul eliminada! Restam:', this.eliminationInfo.blueBallsRemaining);
                }
                
                this.updateEliminationScore();
                this.checkWinCondition();
            },
            
            // Verificar condição de vitória
            checkWinCondition: function() {
                if (this.eliminationInfo.redBallsRemaining === 0) {
                    this.eliminationInfo.gameOver = true;
                    this.eliminationInfo.winner = "blue";
                    console.log('🎉 Azuis venceram!');
                    this.showWinMessage("Azuis");
                } else if (this.eliminationInfo.blueBallsRemaining === 0) {
                    this.eliminationInfo.gameOver = true;
                    this.eliminationInfo.winner = "red";
                    console.log('🎉 Vermelhas venceram!');
                    this.showWinMessage("Vermelhas");
                }
            },
            
            // Mostrar mensagem de vitória
            showWinMessage: function(winner) {
                var winMessage = document.createElement('div');
                winMessage.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                    color: white;
                    padding: 30px;
                    border-radius: 20px;
                    font-family: Arial, sans-serif;
                    font-size: 24px;
                    text-align: center;
                    z-index: 10000;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
                `;
                winMessage.innerHTML = `
                    <div style="font-size: 48px; margin-bottom: 20px;">🎉</div>
                    <div style="font-weight: bold; margin-bottom: 20px;">${winner} Venceram!</div>
                    <button onclick="location.reload()" style="
                        background: white;
                        color: #333;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 10px;
                        cursor: pointer;
                        font-size: 16px;
                        margin-top: 10px;
                    ">Jogar Novamente</button>
                `;
                document.body.appendChild(winMessage);
            }
        };
        
        // Aplicar regras ao contexto global
        window.eliminationRules = this.eliminationRules;
        window.eliminationInfo = this.eliminationInfo;
    }
};

// Exportar para uso global
window.eliminationSetup = eliminationSetup;
