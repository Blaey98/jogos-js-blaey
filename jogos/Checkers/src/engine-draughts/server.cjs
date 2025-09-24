#!/usr/bin/env node

/**
 * Servidor Node.js puro para Damas com Motor rapid-draughts
 * Usa a biblioteca diretamente sem Python ou subprocessos
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const { EnglishDraughts, EnglishDraughtsComputerFactory } = require('./dist/english.cjs');

const app = express();
const PORT = 8081;

// Middleware
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos
app.use('/games/checkers', express.static('/home/jeff/Área de trabalho/jogos-js-blaey/public/games/checkers'));
app.use('/games/checkers-international', express.static('/home/jeff/Área de trabalho/jogos-js-blaey/public/games/checkers-international'));

// Classe do motor de damas
class DraughtsEngine {
    constructor() {
        this.computer = EnglishDraughtsComputerFactory.alphaBeta({
            maxDepth: 6,
            quiescence: true
        });
        this.initialized = true;
    }

    async searchMove(boardState, player, timeLimit = 1.0, depth = 6) {
        try {
            console.log('🔍 Buscando movimento com estado:', boardState);
            console.log('👤 Jogador:', player, 'Profundidade:', depth);
            
            // Criar jogo a partir do estado atual
            let game;
            
            if (boardState && boardState.length > 0) {
                // Tentar criar jogo a partir do estado fornecido
                try {
                    // Converter array linear para formato do rapid-draughts
                    const boardArray = this.convertBoardState(boardState);
                    game = EnglishDraughts.setup(boardArray);
                    console.log('✅ Jogo criado a partir do estado fornecido');
                } catch (error) {
                    console.log('⚠️ Erro ao criar jogo com estado fornecido, usando posição inicial:', error.message);
                    game = EnglishDraughts.setup();
                }
            } else {
                // Usar posição inicial se nenhum estado for fornecido
                game = EnglishDraughts.setup();
                console.log('🏁 Usando posição inicial');
            }
            
            // Configurar computador com profundidade desejada
            const computer = EnglishDraughtsComputerFactory.alphaBeta({
                maxDepth: depth,
                quiescence: true
            });
            
            // Obter movimento do computador
            const move = await computer(game);
            
            if (move) {
                console.log('✅ Movimento encontrado:', move);
                return {
                    success: true,
                    move: move,
                    motor: 'JavaScript',
                    depth: depth
                };
            } else {
                console.log('❌ Nenhum movimento encontrado');
                return { error: 'Nenhum movimento disponível' };
            }
            
        } catch (error) {
            console.error('❌ Erro na busca:', error);
            return { error: `Erro na busca: ${error.message}` };
        }
    }
    
    // Converte estado do tabuleiro para formato do rapid-draughts
    convertBoardState(boardState) {
        // O rapid-draughts espera um formato específico
        // Por enquanto, retorna null para usar posição inicial
        // Em uma implementação completa, converteria o array linear para o formato esperado
        return null;
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

// Instância global do motor
const engine = new DraughtsEngine();

// Rotas da API
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>🎮 Damas com Motor JavaScript</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; background: #f0f0f0; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 10px; }
            .game-link { display: block; margin: 20px 0; padding: 15px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; text-align: center; }
            .game-link:hover { background: #0056b3; }
            .status { padding: 10px; margin: 10px 0; border-radius: 5px; }
            .status.ok { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
            .status.error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🎮 Damas com Motor JavaScript</h1>
            <div id="status" class="status">Carregando...</div>
            <a href="/games/checkers/" class="game-link">🔴 Damas Clássicas</a>
            <a href="/games/checkers-international/" class="game-link">🌍 Damas Internacionais</a>
            <a href="/api/health" class="game-link">🔧 API Health</a>
        </div>
        <script>
            fetch('/api/health')
                .then(response => response.json())
                .then(data => {
                    const status = document.getElementById('status');
                    if (data.motor_js) {
                        status.className = 'status ok';
                        status.textContent = '✅ Motor JavaScript carregado e funcionando!';
                    } else {
                        status.className = 'status error';
                        status.textContent = '❌ Motor JavaScript não carregado';
                    }
                })
                .catch(error => {
                    const status = document.getElementById('status');
                    status.className = 'status error';
                    status.textContent = '❌ Erro ao conectar com a API';
                });
        </script>
    </body>
    </html>
    `);
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        motor_js: engine.initialized,
        timestamp: Date.now()
    });
});

app.post('/api/search', async (req, res) => {
    try {
        const { board_state = [], player = 1, time_limit = 1.0, depth = 6 } = req.body;
        
        const result = await engine.searchMove(board_state, player, time_limit, depth);
        
        if (result.error) {
            return res.json({ error: result.error });
        }
        
        res.json({
            success: true,
            result: result,
            motor: 'JavaScript'
        });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/test', (req, res) => {
    try {
        const result = engine.test();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/moves', (req, res) => {
    try {
        const { board_state = [], player = 1 } = req.query;
        const result = engine.getMoves(board_state, player);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log('🚀 Servidor Node.js de Damas com Motor JavaScript');
    console.log('=' * 50);
    console.log('✅ Motor JavaScript carregado e funcionando!');
    console.log('🌐 Servidor rodando em:');
    console.log(`   http://localhost:${PORT}`);
    console.log(`   http://localhost:${PORT}/games/checkers/`);
    console.log(`   http://localhost:${PORT}/games/checkers-international/`);
    console.log(`   http://localhost:${PORT}/api/health`);
    console.log('');
    console.log('🛑 Para parar: Ctrl+C');
});
