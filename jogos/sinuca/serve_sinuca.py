#!/usr/bin/env python3
"""
Servidor HTTP simples para servir o jogo de Sinuca
"""

import http.server
import socketserver
import os
import sys
import webbrowser
from pathlib import Path

# Configurações do servidor
PORT = 8080
HOST = 'localhost'

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Adicionar headers CORS para permitir carregamento de recursos
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def guess_type(self, path):
        # Configurar tipos MIME corretos
        mimetype = super().guess_type(path)
        if path.endswith('.js'):
            return 'application/javascript'
        elif path.endswith('.wasm'):
            return 'application/wasm'
        elif path.endswith('.wav'):
            return 'audio/wav'
        elif path.endswith('.png'):
            return 'image/png'
        elif path.endswith('.json'):
            return 'application/json'
        return mimetype

def main():
    # Mudar para o diretório do jogo
    game_dir = Path(__file__).parent
    os.chdir(game_dir)
    
    print("🎱 Iniciando servidor para o jogo de Sinuca...")
    print(f"📁 Diretório: {game_dir}")
    
    try:
        with socketserver.TCPServer((HOST, PORT), CustomHTTPRequestHandler) as httpd:
            print(f"🌐 Servidor rodando em: http://{HOST}:{PORT}")
            print(f"🎮 Acesse o jogo em: http://{HOST}:{PORT}/index.html")
            print("⏹️  Pressione Ctrl+C para parar o servidor")
            print("-" * 50)
            
            # Tentar abrir o navegador automaticamente
            try:
                webbrowser.open(f'http://{HOST}:{PORT}/index.html')
                print("🚀 Navegador aberto automaticamente!")
            except Exception as e:
                print(f"⚠️  Não foi possível abrir o navegador automaticamente: {e}")
                print(f"🔗 Abra manualmente: http://{HOST}:{PORT}/index.html")
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🛑 Servidor parado pelo usuário")
    except OSError as e:
        if e.errno == 98:  # Address already in use
            print(f"❌ Erro: Porta {PORT} já está em uso")
            print("💡 Tente parar outros servidores ou use uma porta diferente")
        else:
            print(f"❌ Erro ao iniciar servidor: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Erro inesperado: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
