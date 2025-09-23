#!/usr/bin/env python3
"""
Servidor Web para Damas com Motor C
Integra o motor de busca C com interface web
"""

import sys
import os
import json
import time
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

# Adicionar o diretório src/python ao path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src', 'python'))

app = Flask(__name__)
CORS(app)

# Variáveis globais para o motor C
search_engine = None
motor_c_loaded = False

def load_motor_c():
    """Carrega o motor C de damas"""
    global search_engine, motor_c_loaded
    try:
        import search_engine
        motor_c_loaded = True
        print("✅ Motor C carregado com sucesso!")
        return True
    except ImportError as e:
        print(f"❌ Erro ao carregar motor C: {e}")
        motor_c_loaded = False
        return False

def search_move(board_state, player, time_limit=1.0):
    """Busca o melhor movimento usando o motor C"""
    global search_engine, motor_c_loaded
    
    if not motor_c_loaded:
        return {"error": "Motor C não carregado"}
    
    try:
        # Converter o estado do tabuleiro para o formato do motor C
        # board_state deve ser uma lista com 6 inteiros de 64 bits
        # [p1, p2, p1k, p2k, player, time]
        
        if len(board_state) < 6:
            return {"error": "Estado do tabuleiro inválido"}
        
        # Chamar o motor C (precisa de 7 argumentos)
        result = search_engine.search_position(
            board_state[0],  # p1
            board_state[1],  # p2
            board_state[2],  # p1k
            board_state[3],  # p2k
            player,          # player
            time_limit,      # time
            10               # depth (7º argumento)
        )
        
        return {
            "success": True,
            "result": result,
            "motor": "C"
        }
        
    except Exception as e:
        return {"error": f"Erro na busca: {str(e)}"}

@app.route('/')
def index():
    """Página principal"""
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>🎮 Damas com Motor C</title>
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
            <h1>🎮 Damas com Motor C</h1>
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
                    if (data.motor_c) {
                        status.className = 'status ok';
                        status.textContent = '✅ Motor C carregado e funcionando!';
                    } else {
                        status.className = 'status error';
                        status.textContent = '❌ Motor C não carregado';
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
    """

@app.route('/games/checkers/')
def checkers_game():
    """Redireciona para o jogo de damas clássicas"""
    return send_from_directory('/home/jeff/Área de trabalho/jogos-js-blaey/public/games/checkers/', 'index.html')

@app.route('/games/checkers-international/')
def checkers_international_game():
    """Redireciona para o jogo de damas internacionais"""
    return send_from_directory('/home/jeff/Área de trabalho/jogos-js-blaey/public/games/checkers-international/', 'index.html')

@app.route('/games/checkers/assets/<path:filename>')
def checkers_assets(filename):
    """Serve arquivos de assets das damas clássicas"""
    return send_from_directory('/home/jeff/Área de trabalho/jogos-js-blaey/public/games/checkers/assets/', filename)

@app.route('/games/checkers-international/assets/<path:filename>')
def checkers_international_assets(filename):
    """Serve arquivos de assets das damas internacionais"""
    return send_from_directory('/home/jeff/Área de trabalho/jogos-js-blaey/public/games/checkers-international/assets/', filename)

@app.route('/api/health')
def health():
    """Endpoint de saúde da API"""
    return jsonify({
        "status": "ok",
        "motor_c": motor_c_loaded,
        "timestamp": time.time()
    })

@app.route('/api/search', methods=['POST'])
def api_search():
    """Endpoint para buscar movimentos"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "Dados não fornecidos"}), 400
        
        board_state = data.get('board_state', [])
        player = data.get('player', 1)
        time_limit = data.get('time_limit', 1.0)
        
        result = search_move(board_state, player, time_limit)
        
        return jsonify(result)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/test')
def test_motor():
    """Endpoint para testar o motor C"""
    if not motor_c_loaded:
        return jsonify({"error": "Motor C não carregado"}), 500
    
    try:
        # Teste simples com tabuleiro vazio
        result = search_engine.search_position(0, 0, 0, 0, 1, 0.1, 5)
        return jsonify({
            "success": True,
            "result": result,
            "message": "Motor C funcionando!"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("🚀 Iniciando Servidor Web de Damas com Motor C")
    print("=" * 50)
    
    # Carregar motor C
    if load_motor_c():
        print("✅ Motor C carregado com sucesso!")
    else:
        print("⚠️ Motor C não carregado - usando fallback")
    
    print("🌐 Servidor rodando em:")
    print("   http://localhost:8081")
    print("   http://localhost:8081/games/checkers/")
    print("   http://localhost:8081/games/checkers-international/")
    print("   http://localhost:8081/api/health")
    print("")
    print("🛑 Para parar: Ctrl+C")
    
    app.run(host='0.0.0.0', port=8081, debug=True)
