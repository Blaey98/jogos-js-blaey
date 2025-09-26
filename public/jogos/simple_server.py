#!/usr/bin/env python3
import http.server
import socketserver
import os

# Mudar para o diretório do jogo
os.chdir('/home/jeff/Área de trabalho/jogos-js-blaey/jogos/pacman_js')

PORT = 8084

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Adicionar headers CORS
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"🎮 Servidor Pacman rodando em http://localhost:{PORT}")
        print("📁 Arquivos disponíveis:")
        print("   - http://localhost:8084/index_mobile.html")
        print("   - http://localhost:8084/simple.html")
        print("Pressione Ctrl+C para parar")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Servidor parado")
