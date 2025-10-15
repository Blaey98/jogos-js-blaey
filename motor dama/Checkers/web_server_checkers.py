#!/usr/bin/env python3
"""
Servidor Web para Damas com Motor JavaScript
Integra o motor de busca JavaScript rapid-draughts com interface web
"""

import sys
import os
import json
import time
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

# Importar wrapper do motor JavaScript
from js_engine_wrapper import load_js_engine, search_move_js, test_js_engine

app = Flask(__name__)
CORS(app)

# Variáveis globais para o motor JavaScript
motor_js_loaded = False

def load_motor_js():
    """Carrega o motor JavaScript de damas"""
    global motor_js_loaded
    try:
        motor_js_loaded = load_js_engine()
        if motor_js_loaded:
            print("✅ Motor JavaScript carregado com sucesso!")
        else:
            print("❌ Erro ao carregar motor JavaScript")
        return motor_js_loaded
    except Exception as e:
        print(f"❌ Erro ao carregar motor JavaScript: {e}")
        motor_js_loaded = False
        return False

def search_move(board_state, player, time_limit=1.0, depth=6):
    """Busca o melhor movimento usando o motor JavaScript"""
    global motor_js_loaded
    
    if not motor_js_loaded:
        return {"error": "Motor JavaScript não carregado"}
    
    try:
        # Usar o motor JavaScript
        result = search_move_js(board_state, player, time_limit, depth)
        
        if "error" in result:
            return result
        
        return {
            "success": True,
            "result": result,
            "motor": "JavaScript"
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
        "motor_js": motor_js_loaded,
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
        depth = data.get('depth', 6)
        
        result = search_move(board_state, player, time_limit, depth)
        
        return jsonify(result)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/test')
def test_motor():
    """Endpoint para testar o motor JavaScript"""
    if not motor_js_loaded:
        return jsonify({"error": "Motor JavaScript não carregado"}), 500
    
    try:
        # Teste simples
        result = test_js_engine()
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("🚀 Iniciando Servidor Web de Damas com Motor JavaScript")
    print("=" * 50)
    
    # Carregar motor JavaScript
    if load_motor_js():
        print("✅ Motor JavaScript carregado com sucesso!")
    else:
        print("❌ Motor JavaScript não carregado - servidor não funcionará corretamente")
        print("⚠️ Verifique se Node.js está instalado e o motor está compilado")
    
    print("🌐 Servidor rodando em:")
    print("   http://localhost:8081")
    print("   http://localhost:8081/games/checkers/")
    print("   http://localhost:8081/games/checkers-international/")
    print("   http://localhost:8081/api/health")
    print("")
    print("🛑 Para parar: Ctrl+C")
    
    app.run(host='0.0.0.0', port=8081, debug=True)
