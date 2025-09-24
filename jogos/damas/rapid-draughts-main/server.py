#!/usr/bin/env python3
"""
Servidor simples para o Rapid Draughts
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

# Configurações
PORT = 8080
HOST = "localhost"

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Adiciona headers CORS para permitir carregamento de módulos ES6
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cross-Origin-Embedder-Policy', 'require-corp')
        self.send_header('Cross-Origin-Opener-Policy', 'same-origin')
        super().end_headers()

    def do_GET(self):
        # Serve arquivos estáticos
        if self.path == '/':
            self.path = '/index.html'
        return super().do_GET()

def main():
    # Muda para o diretório do script
    script_dir = Path(__file__).parent
    os.chdir(script_dir)
    
    print(f"🚀 Iniciando servidor Rapid Draughts...")
    print(f"📁 Diretório: {script_dir}")
    print(f"🌐 URL: http://{HOST}:{PORT}")
    print(f"🎯 Jogo: http://{HOST}:{PORT}/index.html")
    print("=" * 50)
    
    try:
        with socketserver.TCPServer((HOST, PORT), CustomHTTPRequestHandler) as httpd:
            print(f"✅ Servidor rodando em http://{HOST}:{PORT}")
            print("🔄 Pressione Ctrl+C para parar o servidor")
            print("=" * 50)
            
            # Abre o navegador automaticamente
            webbrowser.open(f"http://{HOST}:{PORT}")
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🛑 Servidor parado pelo usuário")
    except OSError as e:
        if e.errno == 98:  # Address already in use
            print(f"❌ Erro: Porta {PORT} já está em uso")
            print(f"💡 Tente usar uma porta diferente ou pare o processo que está usando a porta {PORT}")
        else:
            print(f"❌ Erro: {e}")
    except Exception as e:
        print(f"❌ Erro inesperado: {e}")

if __name__ == "__main__":
    main()
