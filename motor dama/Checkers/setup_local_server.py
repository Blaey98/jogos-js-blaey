#!/usr/bin/env python3
"""
Script para configurar e iniciar o servidor local do jogo de damas
"""

import sys
import os
import subprocess
import time

def check_python_dependencies():
    """Verifica se as dependências Python estão disponíveis"""
    try:
        import json
        import http.server
        import multiprocessing
        print("✅ Dependências Python básicas OK")
        return True
    except ImportError as e:
        print(f"❌ Dependência faltando: {e}")
        return False

def check_c_engine():
    """Verifica se o motor C está disponível"""
    try:
        sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src', 'python'))
        import search_engine
        print("✅ Motor C carregado com sucesso")
        return True
    except ImportError:
        print("⚠️ Motor C não disponível, usando motor Python")
        return False

def check_python_engine():
    """Verifica se o motor Python está disponível"""
    try:
        engine_path = os.path.join(os.path.dirname(__file__), 'src', 'python')
        sys.path.insert(0, engine_path)
        
        # Verificar arquivos essenciais
        required_files = [
            'bitboard_converter.py',
            'Board_opperations.py'
        ]
        
        for file in required_files:
            if not os.path.exists(os.path.join(engine_path, file)):
                print(f"❌ Arquivo faltando: {file}")
                return False
        
        # Tentar importar
        from bitboard_converter import convert_to_bitboard, convert_to_matrix
        from Board_opperations import generate_all_options
        
        print("✅ Motor Python carregado com sucesso")
        return True
    except ImportError as e:
        print(f"❌ Erro ao carregar motor Python: {e}")
        return False

def create_simple_engine():
    """Cria um motor simples se os outros não estiverem disponíveis"""
    engine_path = os.path.join(os.path.dirname(__file__), 'src', 'python')
    simple_engine_path = os.path.join(engine_path, 'simple_engine.py')
    
    if not os.path.exists(simple_engine_path):
        simple_engine_code = '''#!/usr/bin/env python3
"""
Motor simples de damas como fallback
"""

import random

class SimpleCheckersEngine:
    def __init__(self):
        self.difficulty = 3
        self.nodes_evaluated = 0
    
    def set_difficulty(self, level):
        self.difficulty = level
    
    def get_best_move(self, board, player):
        """Obtém o melhor movimento usando lógica simples"""
        moves = self.get_all_moves(board, player)
        
        if not moves:
            return None
        
        # Priorizar capturas
        captures = [move for move in moves if abs(move['fromRow'] - move['toRow']) == 2]
        if captures:
            moves = captures
        
        # Escolher movimento baseado na dificuldade
        if self.difficulty >= 4:
            # Dificuldade alta - escolher movimento mais central
            best_move = min(moves, key=lambda m: abs(m['toRow'] - 3.5) + abs(m['toCol'] - 3.5))
        else:
            # Dificuldade baixa - movimento aleatório
            best_move = random.choice(moves)
        
        self.nodes_evaluated += len(moves)
        return best_move
    
    def get_all_moves(self, board, player):
        """Gera todos os movimentos possíveis"""
        moves = []
        
        for row in range(8):
            for col in range(8):
                if board[row][col] == player or board[row][col] == player + 2:
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
                                            'toCol': new_col
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
                                                    'toCol': new_col + dc
                                                })
        
        return moves
'''
        
        with open(simple_engine_path, 'w') as f:
            f.write(simple_engine_code)
        
        print("✅ Motor simples criado")
    
    return True

def start_server(port=8081):
    """Inicia o servidor"""
    try:
        # Importar e iniciar o servidor
        sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src', 'python'))
        from checkers_api_server import run_server
        
        print(f"\\n🚀 Iniciando servidor na porta {port}...")
        print("📱 Acesse: http://localhost:3000/games/checkers/")
        print("🔧 API: http://localhost:8081/api/health")
        print("Pressione Ctrl+C para parar\\n")
        
        run_server(port)
        
    except KeyboardInterrupt:
        print("\\n🛑 Servidor parado pelo usuário")
        return 0
    except Exception as e:
        print(f"❌ Erro ao iniciar servidor: {e}")
        return 1

def main():
    print("🎮 Configurando Servidor Local do Jogo de Damas")
    print("=" * 50)
    
    # Verificar dependências
    if not check_python_dependencies():
        print("❌ Dependências Python não atendidas")
        return 1
    
    # Verificar motores
    c_engine_available = check_c_engine()
    python_engine_available = check_python_engine()
    
    if not python_engine_available:
        print("⚠️ Criando motor simples como fallback...")
        create_simple_engine()
    
    # Permitir especificar porta
    port = 8081
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print("⚠️ Porta inválida, usando porta padrão 8081")
    
    # Iniciar servidor
    return start_server(port)

if __name__ == '__main__':
    sys.exit(main())
