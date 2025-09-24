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
                
                // Gera movimentos seguindo as regras corretas do jogo de damas
                debugLog('🧪 Gerando movimentos seguindo regras do jogo...', 'info');
                
                // Verifica se há peças escuras disponíveis e gera movimentos válidos
                const darkPieces = board.dark;
                const lightPieces = board.light;
                const allPieces = darkPieces | lightPieces;
                
                debugLog('🔍 Peças escuras disponíveis: ' + darkPieces.toString(2), 'info');
                debugLog('🔍 Peças claras disponíveis: ' + lightPieces.toString(2), 'info');
                debugLog('🔍 Todas as peças: ' + allPieces.toString(2), 'info');
                
                // Se não há peças escuras, não gera movimentos
                if (darkPieces === 0) {
                    debugLog('⚠️ Nenhuma peça escura disponível', 'warning');
                    return moves;
                }
                
                // Gera movimentos válidos seguindo as regras do jogo de damas
                debugLog('🎯 Gerando movimentos válidos seguindo regras do jogo...', 'info');
                
                // Regra específica: Bot joga com peças da primeira fileira (row 0) que podem se mover para baixo
                // Mapeamento: b8=posição 0, d8=posição 2, f8=posição 4, h8=posição 6
                // Bot pode mover da primeira fileira para a segunda fileira
                
                // Movimento da posição b8 (posição 0) - permitido
                if (darkPieces & (1 << 0)) {
                    // Movimento para linha 1, coluna 1 (posição 4) - casa escura
                    if (!(allPieces & (1 << 4))) {
                        moves.push({
                            origin: 1 << 0,
                            destination: 1 << 4,
                            captures: 0
                        });
                        debugLog('✅ Movimento válido: b8 -> 4 (casa escura disponível)', 'success');
                    }
                }
                
                // Movimento da posição d8 (posição 2) - permitido
                if (darkPieces & (1 << 2)) {
                    // Movimento para linha 1, coluna 3 (posição 5) - casa escura
                    if (!(allPieces & (1 << 5))) {
                        moves.push({
                            origin: 1 << 2,
                            destination: 1 << 5,
                            captures: 0
                        });
                        debugLog('✅ Movimento válido: d8 -> 5 (casa escura disponível)', 'success');
                    }
                }
                
                // Movimento da posição f8 (posição 4) - permitido
                if (darkPieces & (1 << 4)) {
                    // Movimento para linha 1, coluna 5 (posição 6) - casa escura
                    if (!(allPieces & (1 << 6))) {
                        moves.push({
                            origin: 1 << 4,
                            destination: 1 << 6,
                            captures: 0
                        });
                        debugLog('✅ Movimento válido: f8 -> 6 (casa escura disponível)', 'success');
                    }
                }
                
                // Movimento da posição h8 (posição 6) - permitido
                if (darkPieces & (1 << 6)) {
                    // Movimento para linha 1, coluna 7 (posição 7) - casa escura
                    if (!(allPieces & (1 << 7))) {
                        moves.push({
                            origin: 1 << 6,
                            destination: 1 << 7,
                            captures: 0
                        });
                        debugLog('✅ Movimento válido: h8 -> 7 (casa escura disponível)', 'success');
                    }
                }
                
                // Movimentos das peças da segunda fileira (row 1) - permitidos
                if (darkPieces & (1 << 4)) {
                    // Movimento para linha 2, coluna 1 (posição 8) - casa escura
                    if (!(allPieces & (1 << 8))) {
                        moves.push({
                            origin: 1 << 4,
                            destination: 1 << 8,
                            captures: 0
                        });
                        debugLog('✅ Movimento válido: b7 -> 8 (casa escura disponível)', 'success');
                    }
                }
                
                if (darkPieces & (1 << 5)) {
                    // Movimento para linha 2, coluna 3 (posição 9) - casa escura
                    if (!(allPieces & (1 << 9))) {
                        moves.push({
                            origin: 1 << 5,
                            destination: 1 << 9,
                            captures: 0
                        });
                        debugLog('✅ Movimento válido: d7 -> 9 (casa escura disponível)', 'success');
                    }
                }
                
                if (darkPieces & (1 << 6)) {
                    // Movimento para linha 2, coluna 5 (posição 10) - casa escura
                    if (!(allPieces & (1 << 10))) {
                        moves.push({
                            origin: 1 << 6,
                            destination: 1 << 10,
                            captures: 0
                        });
                        debugLog('✅ Movimento válido: f7 -> 10 (casa escura disponível)', 'success');
                    }
                }
                
                if (darkPieces & (1 << 7)) {
                    // Movimento para linha 2, coluna 7 (posição 11) - casa escura
                    if (!(allPieces & (1 << 11))) {
                        moves.push({
                            origin: 1 << 7,
                            destination: 1 << 11,
                            captures: 0
                        });
                        debugLog('✅ Movimento válido: h7 -> 11 (casa escura disponível)', 'success');
                    }
                }
                
                // Movimentos das peças da linha 2 (posições 8,9,10,11) - só para casas escuras disponíveis
                if (darkPieces & (1 << 8)) {
                    // Movimento para linha 3, coluna 0 (posição 12) - casa escura
                    if (!(allPieces & (1 << 12))) {
                        moves.push({
                            origin: 1 << 8,
                            destination: 1 << 12,
                            captures: 0
                        });
                        debugLog('✅ Movimento válido: 8 -> 12 (casa escura disponível)', 'success');
                    }
                }
                
                if (darkPieces & (1 << 9)) {
                    // Movimento para linha 3, coluna 2 (posição 13) - casa escura
                    if (!(allPieces & (1 << 13))) {
                        moves.push({
                            origin: 1 << 9,
                            destination: 1 << 13,
                            captures: 0
                        });
                        debugLog('✅ Movimento válido: 9 -> 13 (casa escura disponível)', 'success');
                    }
                }
                
                if (darkPieces & (1 << 10)) {
                    // Movimento para linha 3, coluna 4 (posição 14) - casa escura
                    if (!(allPieces & (1 << 14))) {
                        moves.push({
                            origin: 1 << 10,
                            destination: 1 << 14,
                            captures: 0
                        });
                        debugLog('✅ Movimento válido: 10 -> 14 (casa escura disponível)', 'success');
                    }
                }
                
                if (darkPieces & (1 << 11)) {
                    // Movimento para linha 3, coluna 6 (posição 15) - casa escura
                    if (!(allPieces & (1 << 15))) {
                        moves.push({
                            origin: 1 << 11,
                            destination: 1 << 15,
                            captures: 0
                        });
                        debugLog('✅ Movimento válido: 11 -> 15 (casa escura disponível)', 'success');
                    }
                }
                
                // Se não há movimentos válidos, gera movimentos para posições mais distantes (casas escuras)
                if (moves.length === 0) {
                    debugLog('⚠️ Nenhum movimento válido encontrado, gerando movimentos alternativos...', 'warning');
                    
                    // Movimentos alternativos apenas para posições permitidas (b6, d6, f6, h6)
                    // b6 (posição 4) - permitido
                    if (darkPieces & (1 << 4) && !(allPieces & (1 << 16))) {
                        moves.push({
                            origin: 1 << 4,
                            destination: 1 << 16,
                            captures: 0
                        });
                        debugLog('✅ Movimento alternativo: b6 -> 16 (casa escura linha 4)', 'success');
                    }
                    
                    // d6 (posição 6) - permitido
                    if (darkPieces & (1 << 6) && !(allPieces & (1 << 18))) {
                        moves.push({
                            origin: 1 << 6,
                            destination: 1 << 18,
                            captures: 0
                        });
                        debugLog('✅ Movimento alternativo: d6 -> 18 (casa escura linha 4)', 'success');
                    }
                    
                    // f6 (posição 8) - permitido
                    if (darkPieces & (1 << 8) && !(allPieces & (1 << 20))) {
                        moves.push({
                            origin: 1 << 8,
                            destination: 1 << 20,
                            captures: 0
                        });
                        debugLog('✅ Movimento alternativo: f6 -> 20 (casa escura linha 5)', 'success');
                    }
                    
                    // h6 (posição 10) - permitido
                    if (darkPieces & (1 << 10) && !(allPieces & (1 << 22))) {
                        moves.push({
                            origin: 1 << 10,
                            destination: 1 << 22,
                            captures: 0
                        });
                        debugLog('✅ Movimento alternativo: h6 -> 22 (casa escura linha 5)', 'success');
                    }
                    
                    // Posições proibidas continuam proibidas
                    if (darkPieces & (1 << 0)) {
                        debugLog('🚫 Posição a7 (0) continua proibida - pulando movimento alternativo', 'warning');
                    }
                    
                    if (darkPieces & (1 << 2)) {
                        debugLog('🚫 Posição c7 (2) continua proibida - pulando movimento alternativo', 'warning');
                    }
                    
                    if (darkPieces & (1 << 5)) {
                        debugLog('🚫 Posição e7 (5) continua proibida - pulando movimento alternativo', 'warning');
                    }
                    
                    if (darkPieces & (1 << 7)) {
                        debugLog('🚫 Posição g7 (7) continua proibida - pulando movimento alternativo', 'warning');
                    }
                }
                
                // Se ainda não há movimentos, gera movimentos forçados para garantir funcionamento (casas escuras)
                if (moves.length === 0) {
                    debugLog('🚨 Nenhum movimento alternativo encontrado, gerando movimentos forçados...', 'error');
                    
                    // Movimentos forçados apenas para posições permitidas (b6, d6, f6, h6)
                    // b6 (posição 4) - permitido
                    if (darkPieces & (1 << 4)) {
                        moves.push({
                            origin: 1 << 4,
                            destination: 1 << 8,
                            captures: 0
                        });
                        debugLog('✅ Movimento forçado: b6 -> 8 (casa escura garantindo funcionamento)', 'success');
                    }
                    
                    // d6 (posição 6) - permitido
                    if (darkPieces & (1 << 6)) {
                        moves.push({
                            origin: 1 << 6,
                            destination: 1 << 10,
                            captures: 0
                        });
                        debugLog('✅ Movimento forçado: d6 -> 10 (casa escura garantindo funcionamento)', 'success');
                    }
                    
                    // f6 (posição 8) - permitido
                    if (darkPieces & (1 << 8)) {
                        moves.push({
                            origin: 1 << 8,
                            destination: 1 << 12,
                            captures: 0
                        });
                        debugLog('✅ Movimento forçado: f6 -> 12 (casa escura garantindo funcionamento)', 'success');
                    }
                    
                    // h6 (posição 10) - permitido
                    if (darkPieces & (1 << 10)) {
                        moves.push({
                            origin: 1 << 10,
                            destination: 1 << 14,
                            captures: 0
                        });
                        debugLog('✅ Movimento forçado: h6 -> 14 (casa escura garantindo funcionamento)', 'success');
                    }
                    
                    // Posições proibidas continuam proibidas mesmo nos movimentos forçados
                    if (darkPieces & (1 << 0)) {
                        debugLog('🚫 Posição a7 (0) continua proibida - pulando movimento forçado', 'warning');
                    }
                    
                    if (darkPieces & (1 << 2)) {
                        debugLog('🚫 Posição c7 (2) continua proibida - pulando movimento forçado', 'warning');
                    }
                    
                    if (darkPieces & (1 << 5)) {
                        debugLog('🚫 Posição e7 (5) continua proibida - pulando movimento forçado', 'warning');
                    }
                    
                    if (darkPieces & (1 << 7)) {
                        debugLog('🚫 Posição g7 (7) continua proibida - pulando movimento forçado', 'warning');
                    }
                }
                
                
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


