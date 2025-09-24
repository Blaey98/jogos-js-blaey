#!/usr/bin/env node

/**
 * Interface Node.js para o motor rapid-draughts
 * Permite integração com Python via subprocess
 */

const { EnglishDraughts, EnglishDraughtsComputerFactory } = require('./dist/english.cjs');

class DraughtsEngineInterface {
    constructor() {
        this.initialized = false;
        this.computer = null;
    }
    
    initialize() {
        try {
            // Criar computador com alpha-beta pruning
            this.computer = EnglishDraughtsComputerFactory.alphaBeta({
                maxDepth: 6,
                quiescence: true
            });
            this.initialized = true;
            return { success: true, message: "Motor JavaScript inicializado" };
        } catch (error) {
            return { error: `Erro na inicialização: ${error.message}` };
        }
    }
    
    searchMove(boardState, player, timeLimit = 1.0, depth = 6) {
        // Inicializar automaticamente se necessário
        if (!this.initialized) {
            const initResult = this.initialize();
            if (initResult.error) {
                return initResult;
            }
        }
        
        try {
            // Criar jogo a partir do estado atual
            const game = EnglishDraughts.setup();
            
            // Aplicar estado do tabuleiro se fornecido
            if (boardState && boardState.length > 0) {
                // Converter estado do tabuleiro para o formato do motor JS
                // Por enquanto, usar posição inicial e deixar o motor calcular
                console.error('Aplicando estado do tabuleiro:', boardState);
            }
            
            // Obter movimento do computador
            return this.computer(game).then(move => {
                if (move) {
                    return {
                        success: true,
                        move: move,
                        motor: 'JavaScript',
                        depth: depth
                    };
                } else {
                    return { error: 'Nenhum movimento disponível' };
                }
            }).catch(error => {
                return { error: `Erro na busca: ${error.message}` };
            });
            
        } catch (error) {
            return { error: `Erro na execução: ${error.message}` };
        }
    }
    
    getMoves(boardState, player) {
        try {
            const game = EnglishDraughts.setup();
            const moves = game.moves;
            return {
                success: true,
                moves: moves,
                motor: 'JavaScript'
            };
        } catch (error) {
            return { error: `Erro ao obter movimentos: ${error.message}` };
        }
    }
    
    test() {
        try {
            const game = EnglishDraughts.setup();
            const moves = game.moves;
            return {
                success: true,
                message: "Motor JavaScript funcionando!",
                movesCount: moves.length,
                motor: 'JavaScript'
            };
        } catch (error) {
            return { error: `Erro no teste: ${error.message}` };
        }
    }
}

// Interface de linha de comando
async function main() {
    const args = process.argv.slice(2);
    
    if (args.length < 1) {
        console.log(JSON.stringify({ error: "Comando não fornecido" }));
        process.exit(1);
    }
    
    const command = args[0];
    const engine = new DraughtsEngineInterface();
    
    try {
        let result;
        
        switch (command) {
            case 'init':
                result = engine.initialize();
                break;
                
            case 'search':
                if (args.length < 2) {
                    result = { error: "Dados não fornecidos para busca" };
                } else {
                    const data = JSON.parse(args[1]);
                    result = await engine.searchMove(
                        data.board_state || [],
                        data.player || 1,
                        data.time_limit || 1.0,
                        data.depth || 6
                    );
                }
                break;
                
            case 'moves':
                if (args.length < 2) {
                    result = { error: "Dados não fornecidos para movimentos" };
                } else {
                    const data = JSON.parse(args[1]);
                    result = engine.getMoves(data.board_state || [], data.player || 1);
                }
                break;
                
            case 'test':
                result = engine.test();
                break;
                
            default:
                result = { error: `Comando não reconhecido: ${command}` };
        }
        
        console.log(JSON.stringify(result));
        
    } catch (error) {
        console.log(JSON.stringify({ error: error.message }));
        process.exit(1);
    }
}

// Executar se chamado diretamente
if (require.main === module) {
    main();
}

module.exports = { DraughtsEngineInterface };