#!/usr/bin/env python3
"""
Servidor otimizado para o motor de damas C
"""

import sys
import os
import json
import time
import threading
import multiprocessing as mp
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import queue
import signal

# Adicionar paths necessários
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src', 'python'))

class OptimizedCheckersAPIHandler(BaseHTTPRequestHandler):
    def __init__(self, *args, engine_pool=None, **kwargs):
        self.engine_pool = engine_pool
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
        elif parsed_path.path == '/api/engine/stats':
            self.handle_engine_stats()
        else:
            self.send_response(404)
            self.end_headers()
    
    def do_POST(self):
        if self.path == '/api/move':
            self.handle_move_request()
        elif self.path == '/api/analyze':
            self.handle_analyze_request()
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
            'engine_type': 'C',
            'pool_size': len(self.engine_pool.available_engines) if self.engine_pool else 0,
            'active_requests': self.engine_pool.active_count if self.engine_pool else 0,
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
            'engine_type': 'C',
            'features': {
                'c_engine': True,
                'neural_network': True,
                'transposition_table': True,
                'killer_moves': True,
                'draw_detection': True,
                'multiprocessing': True
            },
            'performance': {
                'max_depth': 20,
                'max_time': 10.0,
                'pool_size': len(self.engine_pool.available_engines) if self.engine_pool else 0
            }
        }
        self.wfile.write(json.dumps(response).encode())
    
    def handle_engine_stats(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_cors_headers()
        self.end_headers()
        
        stats = self.engine_pool.get_stats() if self.engine_pool else {}
        self.wfile.write(json.dumps(stats).encode())
    
    def handle_move_request(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            board = data.get('board')
            player = data.get('player', 2)
            difficulty = data.get('difficulty', 6)
            time_limit = data.get('time_limit', 2.0)
            
            if not board:
                raise ValueError("Parâmetro 'board' é obrigatório")
            
            # Usar pool de motores
            result = self.engine_pool.get_move(board, player, difficulty, time_limit)
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps(result).encode())
            
        except Exception as e:
            self.send_error_response(str(e))
    
    def handle_analyze_request(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            board = data.get('board')
            player = data.get('player', 2)
            depth = data.get('depth', 8)
            
            # Análise profunda da posição
            result = self.engine_pool.analyze_position(board, player, depth)
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_cors_headers()
            self.end_headers()
            self.wfile.write(json.dumps(result).encode())
            
        except Exception as e:
            self.send_error_response(str(e))
    
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

class EnginePool:
    """Pool de motores C para processamento paralelo"""
    
    def __init__(self, pool_size=4):
        self.pool_size = pool_size
        self.available_engines = queue.Queue()
        self.active_count = 0
        self.total_requests = 0
        self.total_time = 0.0
        
        # Inicializar pool de motores
        for _ in range(pool_size):
            engine = self.create_engine()
            self.available_engines.put(engine)
    
    def create_engine(self):
        """Cria uma instância do motor C"""
        try:
            import search_engine
            return {
                'id': id(search_engine),
                'module': search_engine,
                'created_at': time.time()
            }
        except ImportError:
            # Fallback para motor Python
            from c_engine_wrapper import CEngineWrapper
            return {
                'id': id(CEngineWrapper),
                'wrapper': CEngineWrapper(),
                'created_at': time.time()
            }
    
    def get_move(self, board, player, difficulty, time_limit):
        """Obtém movimento usando pool de motores"""
        start_time = time.time()
        self.total_requests += 1
        
        try:
            # Obter motor disponível
            engine = self.available_engines.get(timeout=5.0)
            self.active_count += 1
            
            # Converter tabuleiro para bitboard
            from bitboard_converter import convert_to_bitboard
            p1, p2, p1k, p2k = convert_to_bitboard(board)
            
            # Configurar parâmetros
            ply = min(difficulty * 2, 20)  # Limitar profundidade
            
            # Usar motor C se disponível
            if 'module' in engine:
                results = engine['module'].search_position(p1, p2, p1k, p2k, player, time_limit, ply)
                
                if results and results[0]:
                    move_data = results[0]
                    from bitboard_converter import convert_bit_move
                    from_pos, to_pos = convert_bit_move(move_data)
                    
                    result = {
                        'success': True,
                        'move': {
                            'fromRow': from_pos[1],
                            'fromCol': from_pos[0],
                            'toRow': to_pos[1],
                            'toCol': to_pos[0],
                            'captured': abs(from_pos[0] - to_pos[0]) == 2
                        },
                        'search_info': {
                            'depth': results[1][0] if len(results) > 1 else ply,
                            'eval': results[1][4] if len(results) > 1 else 0,
                            'nodes': results[1][2] if len(results) > 1 else 0,
                            'time': time.time() - start_time
                        }
                    }
                else:
                    result = {'success': False, 'message': 'Nenhum movimento disponível'}
            
            # Usar wrapper Python como fallback
            else:
                result = engine['wrapper'].search_position(p1, p2, p1k, p2k, player, time_limit, ply)
            
            # Retornar motor ao pool
            self.available_engines.put(engine)
            self.active_count -= 1
            
            # Atualizar estatísticas
            self.total_time += time.time() - start_time
            
            return result
            
        except queue.Empty:
            return {'success': False, 'message': 'Todos os motores estão ocupados'}
        except Exception as e:
            if 'engine' in locals():
                self.available_engines.put(engine)
                self.active_count -= 1
            return {'success': False, 'message': f'Erro no motor: {str(e)}'}
    
    def analyze_position(self, board, player, depth):
        """Análise profunda da posição"""
        # Implementar análise com múltiplas profundidades
        analysis = {
            'position_eval': 0,
            'best_moves': [],
            'variations': [],
            'depth_reached': depth
        }
        
        # Análise com diferentes profundidades
        for d in range(2, depth + 1, 2):
            result = self.get_move(board, player, d, 1.0)
            if result.get('success'):
                analysis['best_moves'].append({
                    'depth': d,
                    'move': result['move'],
                    'eval': result['search_info'].get('eval', 0)
                })
        
        return analysis
    
    def get_stats(self):
        """Retorna estatísticas do pool"""
        avg_time = self.total_time / max(self.total_requests, 1)
        
        return {
            'pool_size': self.pool_size,
            'available_engines': self.available_engines.qsize(),
            'active_requests': self.active_count,
            'total_requests': self.total_requests,
            'average_response_time': avg_time,
            'total_uptime': time.time() - getattr(self, 'start_time', time.time())
        }

def run_optimized_server(port=8081, pool_size=4):
    """Executa servidor otimizado"""
    
    # Criar pool de motores
    engine_pool = EnginePool(pool_size)
    engine_pool.start_time = time.time()
    
    # Handler com pool
    def handler(*args, **kwargs):
        return OptimizedCheckersAPIHandler(*args, engine_pool=engine_pool, **kwargs)
    
    server_address = ('0.0.0.0', port)
    httpd = HTTPServer(server_address, handler)
    
    print("🚀 Servidor Otimizado de Damas Iniciado")
    print(f"📡 Porta: {port}")
    print(f"🔧 Pool de Motores: {pool_size}")
    print(f"🧠 Motor: C (com fallback Python)")
    print(f"📱 Health Check: http://localhost:{port}/api/health")
    print(f"📊 Estatísticas: http://localhost:{port}/api/engine/stats")
    print("Pressione Ctrl+C para parar")
    
    # Handler para shutdown graceful
    def signal_handler(sig, frame):
        print("\n🛑 Parando servidor...")
        httpd.server_close()
        sys.exit(0)
    
    signal.signal(signal.SIGINT, signal_handler)
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Servidor parado")
        httpd.server_close()

if __name__ == '__main__':
    import argparse
    
    parser = argparse.ArgumentParser(description='Servidor Otimizado de Damas')
    parser.add_argument('--port', type=int, default=8081, help='Porta do servidor')
    parser.add_argument('--pool-size', type=int, default=4, help='Tamanho do pool de motores')
    
    args = parser.parse_args()
    
    run_optimized_server(args.port, args.pool_size)
