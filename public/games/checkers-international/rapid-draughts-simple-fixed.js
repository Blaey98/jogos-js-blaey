// Versão simplificada e funcional do rapid-draughts
// Implementação básica para funcionar no navegador

(function() {
    'use strict';
    
    console.log('🚀 Carregando rapid-draughts simplificado...');
    
    // Constantes
    const DraughtsPlayer = {
        LIGHT: 1,
        DARK: 2
    };
    
    const DraughtsStatus = {
        PLAYING: 0,
        LIGHT_WON: 1,
        DARK_WON: 2,
        DRAW: 3
    };
    
    // Implementação simplificada do EnglishDraughts
    class EnglishDraughts {
        constructor(data) {
            this.data = data || {
                player: DraughtsPlayer.DARK,
                board: {
                    light: 0x0F0F0F0F,  // Peças claras iniciais
                    dark: 0xF0F0F0F0,   // Peças escuras iniciais
                    king: 0             // Reis
                },
                stats: {
                    sinceCapture: 0,
                    sinceNonKingAdvance: 0
                }
            };
        }
        
        // Getter para acessar o board
        get board() {
            return this.data.board;
        }
        
        get status() {
            return this.moves.length === 0 ? 
                (this.data.player === DraughtsPlayer.LIGHT ? DraughtsStatus.DARK_WON : DraughtsStatus.LIGHT_WON) :
                DraughtsStatus.PLAYING;
        }
        
        get player() {
            return this.data.player;
        }
        
        get moves() {
            return this.generateMoves();
        }
        
        generateMoves() {
            const moves = [];
            const board = this.data.board;
            const player = this.data.player;
            
            // Gera movimentos simples para teste
            if (player === DraughtsPlayer.DARK) {
                // IA joga com peças escuras
                for (let i = 0; i < 32; i++) {
                    if (board.dark & (1 << i)) {
                        // Movimento para frente
                        if (i < 28 && !(board.light & (1 << (i + 4))) && !(board.dark & (1 << (i + 4)))) {
                            moves.push({
                                origin: 1 << i,
                                destination: 1 << (i + 4),
                                captures: 0
                            });
                        }
                    }
                }
            } else {
                // Jogador joga com peças claras
                for (let i = 0; i < 32; i++) {
                    if (board.light & (1 << i)) {
                        // Movimento para frente
                        if (i >= 4 && !(board.dark & (1 << (i - 4))) && !(board.light & (1 << (i - 4)))) {
                            moves.push({
                                origin: 1 << i,
                                destination: 1 << (i - 4),
                                captures: 0
                            });
                        }
                    }
                }
            }
            
            return moves;
        }
        
        isValidMove(move) {
            return this.moves.some(m => 
                m.origin === move.origin && 
                m.destination === move.destination
            );
        }
        
        move(move) {
            if (!this.isValidMove(move)) {
                throw new Error(`Invalid move: ${JSON.stringify(move)}`);
            }
            
            // Executa o movimento
            const newBoard = { ...this.data.board };
            const newStats = { ...this.data.stats };
            
            // Remove peça da origem
            if (this.data.player === DraughtsPlayer.LIGHT) {
                newBoard.light &= ~move.origin;
                newBoard.light |= move.destination;
            } else {
                newBoard.dark &= ~move.origin;
                newBoard.dark |= move.destination;
            }
            
            // Remove capturas
            if (move.captures) {
                newBoard.light &= ~move.captures;
                newBoard.dark &= ~move.captures;
                newBoard.king &= ~move.captures;
                newStats.sinceCapture = 0;
            } else {
                newStats.sinceCapture++;
            }
            
            // Alterna o jogador
            const newPlayer = this.data.player === DraughtsPlayer.LIGHT ? 
                DraughtsPlayer.DARK : DraughtsPlayer.LIGHT;
            
            this.data = {
                player: newPlayer,
                board: newBoard,
                stats: newStats
            };
        }
        
        clone() {
            return new EnglishDraughts({ ...this.data });
        }
    }
    
    // Factory para criar instâncias
    const EnglishDraughtsFactory = {
        setup: function(data) {
            console.log('🔧 EnglishDraughts.setup chamado com:', data);
            const game = new EnglishDraughts(data);
            console.log('🔧 Jogo criado:', game);
            console.log('🔧 Board:', game.board);
            return game;
        }
    };
    
    // Implementação simplificada do ComputerFactory
    const EnglishDraughtsComputerFactory = {
        random: function() {
            return async function(game) {
                const moves = game.moves;
                if (moves.length === 0) return null;
                return moves[Math.floor(Math.random() * moves.length)];
            };
        },
        
        alphaBeta: function(options = {}) {
            const maxDepth = options.maxDepth || 3;
            
            return async function(game) {
                console.log('🤖 Alpha-Beta chamado com jogo:', game);
                console.log('🤖 Board:', game.board);
                
                const moves = game.moves;
                console.log('🤖 Movimentos disponíveis:', moves);
                
                if (moves.length === 0) {
                    console.log('🤖 Nenhum movimento disponível');
                    return null;
                }
                
                // Implementação simples de alpha-beta
                let bestMove = null;
                let bestScore = -Infinity;
                
                for (const move of moves) {
                    try {
                        const clonedGame = game.clone();
                        clonedGame.move(move);
                        
                        // Avaliação simples
                        const score = EnglishDraughtsComputerFactory.evaluatePosition(clonedGame);
                        
                        console.log('🤖 Movimento:', move, 'Score:', score);
                        
                        if (score > bestScore) {
                            bestScore = score;
                            bestMove = move;
                        }
                    } catch (error) {
                        console.error('🤖 Erro ao avaliar movimento:', error);
                    }
                }
                
                console.log('🤖 Melhor movimento:', bestMove, 'Score:', bestScore);
                return bestMove || moves[0];
            };
        },
        
        evaluatePosition: function(game) {
            console.log('🔍 Avaliando posição:', game);
            console.log('🔍 Board:', game.board);
            
            // Avaliação simples baseada na contagem de peças
            const lightPieces = this.countBits(game.board.light);
            const darkPieces = this.countBits(game.board.dark);
            const lightKings = this.countBits(game.board.king & game.board.light);
            const darkKings = this.countBits(game.board.king & game.board.dark);
            
            const score = (darkPieces - lightPieces) + (darkKings - lightKings) * 2;
            console.log('🔍 Score calculado:', score, 'Light:', lightPieces, 'Dark:', darkPieces);
            
            return score;
        },
        
        countBits: function(n) {
            let count = 0;
            while (n) {
                count += n & 1;
                n >>= 1;
            }
            return count;
        }
    };
    
    // Expõe no window
    window.EnglishDraughts = EnglishDraughtsFactory;
    window.EnglishDraughtsComputerFactory = EnglishDraughtsComputerFactory;
    
    console.log('✅ Rapid-draughts simplificado carregado!');
    console.log('🔧 EnglishDraughts:', typeof window.EnglishDraughts);
    console.log('🔧 EnglishDraughtsComputerFactory:', typeof window.EnglishDraughtsComputerFactory);
    
    // Dispara evento de carregamento
    window.dispatchEvent(new CustomEvent('rapidDraughtsLoaded', {
        detail: { 
            EnglishDraughts: window.EnglishDraughts, 
            EnglishDraughtsComputerFactory: window.EnglishDraughtsComputerFactory 
        }
    }));
    
})();
