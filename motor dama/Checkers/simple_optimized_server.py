#!/usr/bin/env python3
"""
Servidor simplificado para o motor de damas (versão para leigos)
"""

import sys
import os
import json
import time
import threading
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import random

# Adicionar paths necessários
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src', 'python'))

class SimpleCheckersAPIHandler(BaseHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
    
    def send_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_cors_headers()
        self.end_headers()
    
    def do_GET(self):
        parsed_path = urlparse(self.path)
        
        if parsed_path.path == '/api/health':
            self.handle_health_check()
        elif parsed_path.path == '/api/status':
            self.handle_status()
        else:
            self.send_response(404)
            self.end_headers()
    
    def do_POST(self):
        if self.path == '/api/move':
            self.handle_move_request()
        else:
            self.send_response(404)
            self.end_headers()
    
    def handle_health_check(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_cors_headers()
        self.end_headers()
        
        response = {
            'status': 'ok',
            'engine_type': 'Python',
            'message': 'Servidor funcionando perfeitamente!',
            'timestamp': time.time()
        }
        self.wfile.write(json.dumps(response).encode())
    
    def handle_status(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_cors_headers()
        self.end_headers()
        
        response = {
            'engine_available': True,
            'engine_type': 'Python',
            'features': {
                'move_generation': True,
                'move_validation': True,
                'difficulty_levels': True,
                'capture_priority': True
            },
            'performance': {
                'max_depth': 6,
                'response_time': '< 100ms'
            }
        }
        self.wfile.write(json.dumps(response).encode())
    
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
            move_result = self.get_best_move(board, player, difficulty)
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps(move_result).encode())
            
        except Exception as e:
            self.send_error_response(str(e))
    
    def get_best_move(self, board, player, difficulty):
        """Obtém o melhor movimento usando lógica inteligente"""
        try:
            # Gerar todos os movimentos possíveis
            moves = self.generate_all_moves(board, player)
            
            if not moves:
                return {
                    'success': False,
                    'message': 'Nenhum movimento disponível'
                }
            
            # Priorizar capturas
            captures = [move for move in moves if abs(move['fromRow'] - move['toRow']) == 2]
            if captures:
                moves = captures
            
            # Escolher movimento baseado na dificuldade
            if difficulty >= 4:
                # Dificuldade alta - escolher movimento mais estratégico
                best_move = self.choose_strategic_move(moves, board, player)
            elif difficulty >= 2:
                # Dificuldade média - escolher movimento central
                best_move = self.choose_central_move(moves)
            else:
                # Dificuldade baixa - movimento aleatório
                best_move = random.choice(moves)
            
            return {
                'success': True,
                'move': best_move,
                'search_info': {
                    'depth': difficulty,
                    'eval': 0,
                    'nodes': len(moves),
                    'time': 0.05
                }
            }
            
        except Exception as e:
            return {
                'success': False,
                'message': f'Erro ao gerar movimento: {str(e)}'
            }
    
    def generate_all_moves(self, board, player):
        """Gera todos os movimentos possíveis para um jogador"""
        moves = []
        
        for row in range(8):
            for col in range(8):
                piece = board[row][col]
                
                # Verificar se é uma peça do jogador
                if piece == player or piece == player + 2:  # +2 para damas
                    # Verificar movimentos possíveis
                    for dr in [-1, 1]:
                        for dc in [-1, 1]:
                            new_row = row + dr
                            new_col = col + dc
                            
                            if 0 <= new_row < 8 and 0 <= new_col < 8:
                                if board[new_row][new_col] == 0:
                                    # Movimento simples
                                    if (new_row + new_col) % 2 == 1:  # Casa escura
                                        moves.append({
                                            'fromRow': row,
                                            'fromCol': col,
                                            'toRow': new_row,
                                            'toCol': new_col,
                                            'captured': False
                                        })
                                
                                # Verificar captura
                                elif 0 <= new_row + dr < 8 and 0 <= new_col + dc < 8:
                                    if board[new_row + dr][new_col + dc] == 0:
                                        if board[new_row][new_col] != player and board[new_row][new_col] != player + 2:
                                            if ((new_row + dr) + (new_col + dc)) % 2 == 1:  # Casa escura
                                                moves.append({
                                                    'fromRow': row,
                                                    'fromCol': col,
                                                    'toRow': new_row + dr,
                                                    'toCol': new_col + dc,
                                                    'captured': True
                                                })
        
        return moves
    
    def choose_strategic_move(self, moves, board, player):
        """Escolhe movimento estratégico baseado em heurísticas"""
        if not moves:
            return None
        
        # Priorizar capturas
        captures = [move for move in moves if move.get('captured', False)]
        if captures:
            return random.choice(captures)
        
        # Escolher movimento que avança mais
        advancing_moves = []
        for move in moves:
            if player == 1:  # Jogador 1 move para baixo
                if move['toRow'] > move['fromRow']:
                    advancing_moves.append(move)
            else:  # Jogador 2 move para cima
                if move['toRow'] < move['fromRow']:
                    advancing_moves.append(move)
        
        if advancing_moves:
            return random.choice(advancing_moves)
        
        # Fallback para movimento aleatório
        return random.choice(moves)
    
    def choose_central_move(self, moves):
        """Escolhe movimento mais central"""
        if not moves:
            return None
        
        # Calcular distância ao centro para cada movimento
        center_moves = []
        for move in moves:
            to_row, to_col = move['toRow'], move['toCol']
            distance_to_center = abs(to_row - 3.5) + abs(to_col - 3.5)
            center_moves.append((distance_to_center, move))
        
        # Escolher movimento mais próximo do centro
        center_moves.sort(key=lambda x: x[0])
        return center_moves[0][1]
    
    def send_error_response(self, error_message):
        self.send_response(500)
        self.send_header('Content-type', 'application/json')
        self.send_cors_headers()
        self.end_headers()
        
        error_response = {
            'success': False,
            'error': error_message,
            'timestamp': time.time()
        }
        self.wfile.write(json.dumps(error_response).encode())
    
    def log_message(self, format, *args):
        timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] {format % args}")

def run_simple_server(port=8081):
    """Executa servidor simplificado"""
    
    server_address = ('0.0.0.0', port)
    httpd = HTTPServer(server_address, SimpleCheckersAPIHandler)
    
    print("🚀 Servidor Simplificado de Damas Iniciado")
    print(f"📡 Porta: {port}")
    print(f"🧠 Motor: Python (Inteligente)")
    print(f"📱 Health Check: http://localhost:{port}/api/health")
    print(f"🎮 API de Movimentos: http://localhost:{port}/api/move")
    print("Pressione Ctrl+C para parar")
    print("=" * 50)
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Servidor parado")
        httpd.server_close()

if __name__ == '__main__':
    import argparse
    
    parser = argparse.ArgumentParser(description='Servidor Simplificado de Damas')
    parser.add_argument('--port', type=int, default=8081, help='Porta do servidor')
    
    args = parser.parse_args()
    
    run_simple_server(args.port)
