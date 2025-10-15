#!/usr/bin/env python3
"""
Servidor de Damas que FUNCIONA - Versão Simples
"""

import json
import sys
import os
from http.server import HTTPServer, BaseHTTPRequestHandler
import time
import random

# Adicionar o diretório atual ao path
sys.path.insert(0, os.path.dirname(__file__))

try:
    from Board_opperations import generate_all_options
    ENGINE_AVAILABLE = True
    print("✅ Motor Python carregado com sucesso")
except ImportError as e:
    print(f"❌ Erro ao importar motor Python: {e}")
    ENGINE_AVAILABLE = False

class WorkingCheckersAPIHandler(BaseHTTPRequestHandler):
    def send_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_cors_headers()
        self.end_headers()
    
    def do_GET(self):
        if self.path == '/api/health':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_cors_headers()
            self.end_headers()
            
            response = {
                'status': 'ok',
                'engine_available': ENGINE_AVAILABLE,
                'engine_type': 'Python',
                'message': 'Servidor funcionando perfeitamente!'
            }
            self.wfile.write(json.dumps(response).encode())
        else:
            self.send_response(404)
            self.end_headers()
    
    def do_POST(self):
        if self.path == '/api/move':
            self.handle_move_request()
        else:
            self.send_response(404)
            self.end_headers()
    
    def handle_move_request(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            board = data.get('board')
            player = data.get('player', 2)
            difficulty = data.get('difficulty', 3)
            
            if not board:
                raise ValueError("Parâmetro 'board' é obrigatório")
            
            # Obter melhor movimento
            if ENGINE_AVAILABLE:
                move_result = self.get_best_move(board, player, difficulty)
            else:
                move_result = {
                    'success': False,
                    'message': 'Motor não disponível'
                }
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps(move_result).encode())
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_cors_headers()
            self.end_headers()
            
            error_response = {
                'success': False,
                'error': str(e)
            }
            self.wfile.write(json.dumps(error_response).encode())
    
    def get_best_move(self, board, player, difficulty):
        """Obtém melhor movimento usando motor Python"""
        try:
            # Obter todos os movimentos possíveis
            moves = generate_all_options(board, player, only_jump=False)
            
            if not moves:
                return {
                    'success': False,
                    'message': 'Nenhum movimento disponível'
                }
            
            # Priorizar capturas
            captures = [move for move in moves if abs(move[0][0] - move[1][0]) == 2]
            if captures:
                moves = captures
            
            # Escolher movimento baseado na dificuldade
            if difficulty >= 4:
                # Dificuldade alta - escolher movimento mais central
                best_move = min(moves, key=lambda m: abs(m[1][0] - 3.5) + abs(m[1][1] - 3.5))
            else:
                # Dificuldade baixa - movimento aleatório
                best_move = random.choice(moves)
            
            return {
                'success': True,
                'move': {
                    'fromRow': best_move[0][1],
                    'fromCol': best_move[0][0],
                    'toRow': best_move[1][1],
                    'toCol': best_move[1][0],
                    'captured': abs(best_move[0][0] - best_move[1][0]) == 2
                },
                'search_info': {
                    'depth': difficulty,
                    'eval': 0,
                    'nodes': len(moves),
                    'engine': 'Python'
                }
            }
            
        except Exception as e:
            return {
                'success': False,
                'message': f'Erro no motor: {str(e)}'
            }

def run_server():
    """Executa o servidor"""
    server_address = ('0.0.0.0', 8082)  # Usar porta 8082
    httpd = HTTPServer(server_address, WorkingCheckersAPIHandler)
    
    print("🚀 Servidor de Damas funcionando na porta 8082")
    print("�� Acesse: http://localhost:8082/api/health")
    print("🎮 API de movimentos: http://localhost:8082/api/move")
    print("Pressione Ctrl+C para parar")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Servidor parado")
        httpd.server_close()

if __name__ == '__main__':
    if not ENGINE_AVAILABLE:
        print("❌ Motor Python não disponível. Sistema não pode iniciar.")
        sys.exit(1)
    
    run_server()
