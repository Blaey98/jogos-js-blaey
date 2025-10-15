#!/usr/bin/env python3
"""
Servidor Web para o Motor de Damas C
"""

import json
import sys
import os
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import threading
import time

# Adicionar o diretório atual ao path
sys.path.insert(0, os.path.dirname(__file__))

try:
    # Tentar importar o motor C através do Main.py (com wrapper se necessário)
    from Main import start_search
    from bitboard_converter import convert_to_bitboard, convert_bit_move
    ENGINE_AVAILABLE = True
    print("✅ Motor C carregado via Main.py (com wrapper se necessário)")
except ImportError as e:
    print(f"❌ Erro ao importar motor: {e}")
    ENGINE_AVAILABLE = False

class CheckersAPIHandler(BaseHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        self.engine_available = ENGINE_AVAILABLE
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
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_cors_headers()
            self.end_headers()
            
            response = {
                'status': 'ok',
                'engine_available': ENGINE_AVAILABLE,
                'message': 'Servidor de Damas C funcionando'
            }
            self.wfile.write(json.dumps(response).encode())
            
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'Not Found')
    
    def do_POST(self):
        """Manipula requisições POST"""
        if self.path == '/api/move':
            self.handle_move_request_post()
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'Not Found')
    
    def handle_move_request_post(self):
        """Manipula requisição de movimento via POST"""
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            # Extrair parâmetros
            board = data.get('board')
            player = data.get('player', 1)
            difficulty = data.get('difficulty', 3)
            
            if not board:
                raise ValueError("Parâmetro 'board' é obrigatório")
            
            # Encontrar melhor movimento usando motor C
            if self.engine_available:
                # Usar motor C através do Main.py
                import multiprocessing as mp
                manager = mp.Manager()
                return_dict = manager.dict()
                
                # Configurar parâmetros para o motor C
                p_time = 5.0  # 5 segundos de tempo
                ply = difficulty  # profundidade baseada na dificuldade
                
                # Chamar o motor C
                start_search(board, player, p_time, ply, return_dict)
                
                # Obter resultado
                if return_dict.get("minmax"):
                    move_data = return_dict["minmax"]
                    if move_data and move_data[0]:
                        # Converter movimento do formato bitboard para matriz
                        from_pos, to_pos = move_data[0]
                        from_row, from_col = from_pos // 8, from_pos % 8
                        to_row, to_col = to_pos // 8, to_pos % 8
                        
                        response = {
                            'success': True,
                            'move': {
                                'fromRow': from_row,
                                'fromCol': from_col,
                                'toRow': to_row,
                                'toCol': to_col,
                                'captured': abs(from_row - to_row) == 2
                            },
                            'search_info': {
                                'depth': return_dict.get('depth', 0),
                                'eval': return_dict.get('eval', 0),
                                'leafs': return_dict.get('leafs', 0)
                            }
                        }
                    else:
                        response = {
                            'success': False,
                            'message': 'Nenhum movimento disponível'
                        }
                else:
                    response = {
                        'success': False,
                        'message': 'Erro no motor C'
                    }
            else:
                response = {
                    'success': False,
                    'message': 'Motor C não disponível'
                }
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps(response).encode())
            
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

def run_server():
    """Executa o servidor"""
    server_address = ('0.0.0.0', 8081)
    httpd = HTTPServer(server_address, CheckersAPIHandler)
    
    print("🚀 Servidor de Damas C rodando na porta 8081")
    print("📱 Acesse: http://localhost:8081/api/health")
    print("🎮 API de movimentos: http://localhost:8081/api/move")
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
    
    run_server()
