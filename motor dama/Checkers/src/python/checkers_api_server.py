#!/usr/bin/env python3
"""
Servidor API para integração do Motor de Damas C com o jogo JavaScript
"""

import json
import sys
import os
import time
import threading
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import multiprocessing as mp

# Adicionar o diretório atual ao path
sys.path.insert(0, os.path.dirname(__file__))

try:
    # Importar o motor de busca
    from bitboard_converter import convert_to_bitboard, convert_bit_move
    from Board_opperations import generate_all_options, check_jump_required
    
    # Tentar importar o motor C
    try:
        import search_engine
        ENGINE_TYPE = "C"
        print("✅ Motor C carregado")
    except ImportError:
        # Fallback para motor Python simples
        ENGINE_TYPE = "Python"
        print("⚠️ Motor C não encontrado, usando motor Python")
    
    ENGINE_AVAILABLE = True
except ImportError as e:
    print(f"❌ Erro ao importar dependências: {e}")
    ENGINE_AVAILABLE = False
    ENGINE_TYPE = "None"

class CheckersAPIHandler(BaseHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        self.engine_available = ENGINE_AVAILABLE
        self.engine_type = ENGINE_TYPE
        super().__init__(*args, **kwargs)
    
    def send_cors_headers(self):
        """Envia headers CORS"""
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
    
    def do_OPTIONS(self):
        """Manipula requisições OPTIONS (CORS preflight)"""
        self.send_response(200)
        self.send_cors_headers()
        self.end_headers()
    
    def do_GET(self):
        """Manipula requisições GET"""
        parsed_path = urlparse(self.path)
        
        if parsed_path.path == '/api/health':
            self.handle_health_check()
        elif parsed_path.path == '/api/status':
            self.handle_status()
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'Not Found')
    
    def do_POST(self):
        """Manipula requisições POST"""
        if self.path == '/api/move':
            self.handle_move_request()
        elif self.path == '/api/validate':
            self.handle_validate_move()
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'Not Found')
    
    def handle_health_check(self):
        """Verifica se o servidor está funcionando"""
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_cors_headers()
        self.end_headers()
        
        response = {
            'status': 'ok',
            'engine_available': self.engine_available,
            'engine_type': self.engine_type,
            'message': 'Servidor de Damas funcionando',
            'timestamp': time.time()
        }
        self.wfile.write(json.dumps(response).encode())
    
    def handle_status(self):
        """Retorna status detalhado do motor"""
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_cors_headers()
        self.end_headers()
        
        response = {
            'engine_available': self.engine_available,
            'engine_type': self.engine_type,
            'features': {
                'c_engine': ENGINE_TYPE == "C",
                'python_engine': ENGINE_TYPE == "Python",
                'bitboard_support': True,
                'move_validation': True
            }
        }
        self.wfile.write(json.dumps(response).encode())
    
    def handle_move_request(self):
        """Processa requisição de movimento"""
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            # Extrair parâmetros
            board = data.get('board')
            player = data.get('player', 2)  # IA é sempre player 2
            difficulty = data.get('difficulty', 3)
            game_type = data.get('game_type', 'classic')  # classic ou international
            
            if not board:
                raise ValueError("Parâmetro 'board' é obrigatório")
            
            # Validar formato do tabuleiro
            if not isinstance(board, list) or len(board) != 8:
                raise ValueError("Tabuleiro deve ser uma matriz 8x8")
            
            # Obter melhor movimento
            if self.engine_available:
                move_result = self.get_best_move(board, player, difficulty, game_type)
                
                if move_result['success']:
                    response = {
                        'success': True,
                        'move': move_result['move'],
                        'search_info': move_result.get('search_info', {}),
                        'engine_type': self.engine_type
                    }
                else:
                    response = {
                        'success': False,
                        'message': move_result.get('message', 'Erro no motor'),
                        'engine_type': self.engine_type
                    }
            else:
                response = {
                    'success': False,
                    'message': 'Motor não disponível',
                    'engine_type': 'None'
                }
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps(response).encode())
            
        except Exception as e:
            self.send_error_response(str(e))
    
    def handle_validate_move(self):
        """Valida se um movimento é válido"""
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            board = data.get('board')
            from_pos = data.get('from')
            to_pos = data.get('to')
            player = data.get('player', 1)
            
            if not all([board, from_pos, to_pos]):
                raise ValueError("Parâmetros obrigatórios: board, from, to")
            
            # Validar movimento usando as regras do jogo
            is_valid = self.validate_move(board, from_pos, to_pos, player)
            
            response = {
                'success': True,
                'valid': is_valid,
                'message': 'Movimento válido' if is_valid else 'Movimento inválido'
            }
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps(response).encode())
            
        except Exception as e:
            self.send_error_response(str(e))
    
    def get_best_move(self, board, player, difficulty, game_type):
        """Obtém o melhor movimento usando o motor disponível"""
        try:
            if self.engine_type == "C":
                return self.get_move_c_engine(board, player, difficulty)
            else:
                return self.get_move_python_engine(board, player, difficulty, game_type)
        except Exception as e:
            return {
                'success': False,
                'message': f'Erro no motor: {str(e)}'
            }
    
    def get_move_c_engine(self, board, player, difficulty):
        """Obtém movimento usando motor C"""
        try:
            # Converter tabuleiro para bitboard
            p1, p2, p1k, p2k = convert_to_bitboard(board)
            
            # Configurar parâmetros
            p_time = 2.0  # 2 segundos de tempo
            ply = difficulty * 2  # profundidade baseada na dificuldade
            
            # Usar multiprocessing para chamar o motor C
            manager = mp.Manager()
            return_dict = manager.dict()
            
            # Importar e chamar a função de busca
            from Main import start_search
            start_search(board, player, p_time, ply, return_dict)
            
            # Obter resultado
            if return_dict.get("minmax") and return_dict["minmax"][0]:
                move_data = return_dict["minmax"][0]
                from_pos, to_pos = convert_bit_move(move_data)
                
                return {
                    'success': True,
                    'move': {
                        'fromRow': from_pos[1],
                        'fromCol': from_pos[0],
                        'toRow': to_pos[1],
                        'toCol': to_pos[0],
                        'captured': abs(from_pos[0] - to_pos[0]) == 2
                    },
                    'search_info': {
                        'depth': return_dict.get('depth', 0),
                        'eval': return_dict.get('eval', 0),
                        'leafs': return_dict.get('leafs', 0),
                        'hashes': return_dict.get('hashes', 0)
                    }
                }
            else:
                return {
                    'success': False,
                    'message': 'Nenhum movimento disponível'
                }
                
        except Exception as e:
            return {
                'success': False,
                'message': f'Erro no motor C: {str(e)}'
            }
    
    def get_move_python_engine(self, board, player, difficulty, game_type):
        """Obtém movimento usando motor Python simples"""
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
            if difficulty >= 5:
                # Dificuldade alta - escolher movimento mais central
                best_move = min(moves, key=lambda m: abs(m[1][0] - 3.5) + abs(m[1][1] - 3.5))
            else:
                # Dificuldade baixa - movimento aleatório
                import random
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
                    'leafs': len(moves),
                    'hashes': 0
                }
            }
            
        except Exception as e:
            return {
                'success': False,
                'message': f'Erro no motor Python: {str(e)}'
            }
    
    def validate_move(self, board, from_pos, to_pos, player):
        """Valida se um movimento é válido"""
        try:
            from_row, from_col = from_pos['row'], from_pos['col']
            to_row, to_col = to_pos['row'], to_pos['col']
            
            # Verificar se as posições estão dentro do tabuleiro
            if not all(0 <= coord < 8 for coord in [from_row, from_col, to_row, to_col]):
                return False
            
            # Verificar se a peça pertence ao jogador
            piece = board[from_row][from_col]
            if piece != player and piece != player + 2:  # +2 para damas
                return False
            
            # Verificar se o destino está vazio
            if board[to_row][to_col] != 0:
                return False
            
            # Verificar se é uma casa escura
            if (to_row + to_col) % 2 == 0:
                return False
            
            # Verificar se é um movimento diagonal
            row_diff = abs(to_row - from_row)
            col_diff = abs(to_col - from_col)
            
            if row_diff != col_diff:
                return False
            
            # Verificar movimento simples ou captura
            if row_diff == 1:
                # Movimento simples
                return True
            elif row_diff == 2:
                # Captura
                middle_row = (from_row + to_row) // 2
                middle_col = (from_col + to_col) // 2
                middle_piece = board[middle_row][middle_col]
                
                # Verificar se há uma peça inimiga no meio
                return middle_piece != 0 and middle_piece != piece and middle_piece != piece + 2
            
            return False
            
        except Exception:
            return False
    
    def send_error_response(self, error_message):
        """Envia resposta de erro"""
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
        """Personaliza logs do servidor"""
        timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] {format % args}")

def run_server(port=8081):
    """Executa o servidor"""
    server_address = ('0.0.0.0', port)
    httpd = HTTPServer(server_address, CheckersAPIHandler)
    
    print("🚀 Servidor API de Damas iniciado")
    print(f"📡 Porta: {port}")
    print(f"🔧 Motor: {ENGINE_TYPE}")
    print(f"📱 Health Check: http://localhost:{port}/api/health")
    print(f"🎮 API de Movimentos: http://localhost:{port}/api/move")
    print(f"✅ Validação: http://localhost:{port}/api/validate")
    print("Pressione Ctrl+C para parar")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Servidor parado")
        httpd.server_close()

if __name__ == '__main__':
    if not ENGINE_AVAILABLE:
        print("❌ Motor não disponível. Sistema não pode iniciar.")
        sys.exit(1)
    
    # Permitir especificar porta via argumento
    port = 8081
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print("⚠️ Porta inválida, usando porta padrão 8081")
    
    run_server(port)
