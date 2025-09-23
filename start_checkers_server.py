#!/usr/bin/env python3
"""
Script para iniciar o servidor principal do jogo de damas
"""

import sys
import os
import subprocess
import time
import threading
import webbrowser
from http.server import HTTPServer, SimpleHTTPRequestHandler
import json

class CheckersHTTPRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.path.join(os.path.dirname(__file__), 'public'), **kwargs)
    
    def end_headers(self):
        # Adicionar headers CORS
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'
        elif self.path == '/games/checkers/':
            self.path = '/games/checkers/index.html'
        elif self.path == '/games/checkers-international/':
            self.path = '/games/checkers-international/index.html'
        elif self.path == '/games/chess/':
            self.path = '/games/chess/index.html'
        elif self.path == '/games/sinuca/':
            self.path = '/games/sinuca/index.html'
        
        return super().do_GET()

def start_api_server():
    """Inicia o servidor da API do motor de damas"""
    try:
        checkers_path = os.path.join(os.path.dirname(__file__), 'jogos', 'Checkers')
        if os.path.exists(checkers_path):
            subprocess.run([sys.executable, 'setup_local_server.py'], 
                         cwd=checkers_path, check=True)
        else:
            print("⚠️ Diretório do jogo de damas não encontrado")
    except subprocess.CalledProcessError as e:
        print(f"❌ Erro ao iniciar servidor da API: {e}")
    except KeyboardInterrupt:
        print("🛑 Servidor da API parado")

def start_main_server(port=3000):
    """Inicia o servidor principal"""
    server_address = ('0.0.0.0', port)
    httpd = HTTPServer(server_address, CheckersHTTPRequestHandler)
    
    print("🚀 Servidor Principal Iniciado")
    print(f"📡 Porta: {port}")
    print(f"🎮 Jogos disponíveis:")
    print(f"   • Damas Clássicas: http://localhost:{port}/games/checkers/")
    print(f"   • Damas Internacionais: http://localhost:{port}/games/checkers-international/")
    print(f"   • Xadrez: http://localhost:{port}/games/chess/")
    print(f"   • Sinuca: http://localhost:{port}/games/sinuca/")
    print(f"🔧 API do Motor: http://localhost:8081/api/health")
    print("Pressione Ctrl+C para parar")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Servidor principal parado")
        httpd.server_close()

def main():
    print("🎮 Iniciando Servidor de Jogos")
    print("=" * 50)
    
    # Verificar se o diretório public existe
    public_dir = os.path.join(os.path.dirname(__file__), 'public')
    if not os.path.exists(public_dir):
        print(f"❌ Diretório 'public' não encontrado em: {public_dir}")
        return 1
    
    # Iniciar servidor da API em thread separada
    api_thread = threading.Thread(target=start_api_server, daemon=True)
    api_thread.start()
    
    # Aguardar um pouco para o servidor da API inicializar
    time.sleep(2)
    
    # Iniciar servidor principal
    port = 3000
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print("⚠️ Porta inválida, usando porta padrão 3000")
    
    # Tentar abrir o navegador automaticamente
    try:
        time.sleep(1)
        webbrowser.open(f'http://localhost:{port}/games/checkers/')
    except:
        pass
    
    start_main_server(port)
    return 0

if __name__ == '__main__':
    sys.exit(main())
