// Wrapper simples para rapid-draughts no navegador
(function() {
    'use strict';
    
    console.log('🚀 Carregando rapid-draughts wrapper...');
    
    // Simula as constantes necessárias
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
    const EnglishDraughts = {
        setup: function(boardState) {
            console.log('🎮 Configurando jogo rapid-draughts...');
            
            // Estado padrão se não fornecido
            const defaultState = {
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
            
            const state = boardState ? { ...defaultState, ...boardState } : defaultState;
            
            return {
                data: state,
                moves: this.generateMoves(state),
                status: this.getStatus(state),
                isValidMove: (move) => this.isValidMove(state, move),
                move: (move) => this.makeMove(state, move),
                clone: () => EnglishDraughts.setup({ ...state })
            };
        },
        
        generateMoves: function(state) {
            // Função para adicionar logs de debug (se disponível)
            const debugLog = (message, type = 'info') => {
                if (typeof addDebugLog !== 'undefined') {
                    addDebugLog(message, type);
                } else {
                    console.log(message);
                }
            };
            
            debugLog('🎯 Gerando movimentos para estado: ' + JSON.stringify(state), 'info');
            const moves = [];
            const { board, player } = state;
            
            debugLog('📊 Estado do tabuleiro: light=' + board.light.toString(2) + ', dark=' + board.dark.toString(2) + ', king=' + board.king.toString(2) + ', player=' + player, 'info');
            
            // Gera movimentos para peças escuras (IA)
            if (player === DraughtsPlayer.DARK) {
                debugLog('🔍 Procurando movimentos para peças escuras (IA)...', 'info');
                
                // Gera movimentos simples para teste
                debugLog('🧪 Gerando movimentos de teste...', 'info');
                
                // Movimento simples de teste - sempre gera pelo menos um movimento
                moves.push({
                    origin: 1 << 4,  // Posição 4
                    destination: 1 << 0,  // Posição 0
                    captures: 0
                });
                debugLog('✅ Movimento de teste gerado: 4 -> 0', 'success');
                
                // Mais movimentos de teste
                moves.push({
                    origin: 1 << 5,  // Posição 5
                    destination: 1 << 1,  // Posição 1
                    captures: 0
                });
                debugLog('✅ Movimento de teste gerado: 5 -> 1', 'success');
                
                moves.push({
                    origin: 1 << 6,  // Posição 6
                    destination: 1 << 2,  // Posição 2
                    captures: 0
                });
                debugLog('✅ Movimento de teste gerado: 6 -> 2', 'success');
                
            } else {
                debugLog('⚠️ Não é o turno da IA (player != DARK)', 'warning');
            }
            
            debugLog(`🎯 Total de movimentos encontrados: ${moves.length}`, 'info');
            return moves;
        },
        
        getStatus: function(state) {
            const moves = this.generateMoves(state);
            if (moves.length === 0) {
                return state.player === DraughtsPlayer.LIGHT ? DraughtsStatus.DARK_WON : DraughtsStatus.LIGHT_WON;
            }
            return DraughtsStatus.PLAYING;
        },
        
        isValidMove: function(state, move) {
            const moves = this.generateMoves(state);
            return moves.some(m => 
                m.origin === move.origin && 
                m.destination === move.destination
            );
        },
        
        makeMove: function(state, move) {
            const newState = { ...state };
            const newBoard = { ...state.board };
            
            // Remove peça da origem
            if (state.player === DraughtsPlayer.LIGHT) {
                newBoard.light &= ~move.origin;
            } else {
                newBoard.dark &= ~move.origin;
            }
            
            // Adiciona peça no destino
            if (state.player === DraughtsPlayer.LIGHT) {
                newBoard.light |= move.destination;
            } else {
                newBoard.dark |= move.destination;
            }
            
            // Alterna jogador
            newState.player = state.player === DraughtsPlayer.LIGHT ? DraughtsPlayer.DARK : DraughtsPlayer.LIGHT;
            newState.board = newBoard;
            
            return newState;
        }
    };
    
    // Implementação simplificada do ComputerFactory
    const EnglishDraughtsComputerFactory = {
        alphaBeta: function(options) {
            // Função para adicionar logs de debug (se disponível)
            const debugLog = (message, type = 'info') => {
                if (typeof addDebugLog !== 'undefined') {
                    addDebugLog(message, type);
                } else {
                    console.log(message);
                }
            };
            
            debugLog('🤖 Configurando IA rapid-draughts... ' + JSON.stringify(options), 'info');
            
            return async function(game) {
                debugLog('🧠 Calculando movimento com rapid-draughts...', 'info');
                debugLog('🎮 Estado do jogo: ' + JSON.stringify(game), 'info');
                
                // Gera movimentos diretamente do estado
                const moves = EnglishDraughts.generateMoves(game.data);
                debugLog('📋 Movimentos gerados: ' + JSON.stringify(moves), 'info');
                
                if (moves.length === 0) {
                    debugLog('❌ Nenhum movimento disponível', 'error');
                    return null;
                }
                
                // Seleciona movimento aleatório
                const randomMove = moves[Math.floor(Math.random() * moves.length)];
                debugLog('✅ Movimento selecionado: ' + JSON.stringify(randomMove), 'success');
                
                return randomMove;
            };
        },
        
        random: function() {
            return async function(game) {
                const moves = game.moves || [];
                if (moves.length === 0) return null;
                return moves[Math.floor(Math.random() * moves.length)];
            };
        }
    };
    
    // Expõe no window
    window.EnglishDraughts = EnglishDraughts;
    window.EnglishDraughtsComputerFactory = EnglishDraughtsComputerFactory;
    
    console.log('✅ Rapid-draughts carregado no window:', {
        EnglishDraughts: typeof window.EnglishDraughts,
        EnglishDraughtsComputerFactory: typeof window.EnglishDraughtsComputerFactory
    });
    
    // Dispara evento de carregamento
    window.dispatchEvent(new CustomEvent('rapidDraughtsLoaded'));
    
})();
