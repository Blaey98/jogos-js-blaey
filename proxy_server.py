#!/usr/bin/env python3
"""
Servidor Proxy Local para resolver problemas de CORS com agame.com
"""

import http.server
import socketserver
import urllib.request
import urllib.parse
import urllib.error
import json
import re
from urllib.parse import urlparse, parse_qs

class ProxyHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            # Parse da URL
            parsed_path = urlparse(self.path)
            
            # Se for uma requisição para o proxy
            if parsed_path.path.startswith('/proxy/'):
                # Extrai a URL de destino
                target_url = parsed_path.path[7:]  # Remove '/proxy/'
                
                # Adiciona protocolo se não tiver
                if not target_url.startswith('http'):
                    target_url = 'https://' + target_url
                
                print(f"Proxy request para: {target_url}")
                
                # Headers para simular um navegador real
                headers = {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Connection': 'keep-alive',
                    'Upgrade-Insecure-Requests': '1',
                    'Referer': 'https://www.agame.com/',
                    'Sec-Fetch-Dest': 'document',
                    'Sec-Fetch-Mode': 'navigate',
                    'Sec-Fetch-Site': 'cross-site',
                    'Cache-Control': 'max-age=0'
                }
                
                # Faz a requisição
                req = urllib.request.Request(target_url, headers=headers)
                
                with urllib.request.urlopen(req, timeout=30) as response:
                    content = response.read()
                    
                    # Headers de resposta
                    self.send_response(200)
                    self.send_header('Content-Type', response.headers.get('Content-Type', 'text/html'))
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
                    self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
                    self.send_header('Cache-Control', 'no-cache')
                    self.end_headers()
                    
                    # Envia o conteúdo
                    self.wfile.write(content)
                    
            else:
                # Serve arquivos estáticos
                self.serve_static_file()
                
        except urllib.error.HTTPError as e:
            print(f"Erro HTTP: {e.code} - {e.reason}")
            self.send_error(e.code, e.reason)
        except urllib.error.URLError as e:
            print(f"Erro de URL: {e.reason}")
            self.send_error(500, "Erro de conexão")
        except Exception as e:
            print(f"Erro geral: {e}")
            self.send_error(500, "Erro interno do servidor")
    
    def do_OPTIONS(self):
        # Responde a requisições OPTIONS (CORS preflight)
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
    
    def serve_static_file(self):
        """Serve arquivos estáticos"""
        try:
            # Mapeia URLs para arquivos
            if self.path == '/' or self.path == '/index.html':
                self.path = '/lista-jogos-vertical.html'
            
            # Remove query parameters
            file_path = self.path.split('?')[0]
            
            # Serve o arquivo
            with open('.' + file_path, 'rb') as f:
                content = f.read()
                
            # Determina o tipo de conteúdo
            content_type = 'text/html'
            if file_path.endswith('.css'):
                content_type = 'text/css'
            elif file_path.endswith('.js'):
                content_type = 'application/javascript'
            elif file_path.endswith('.png'):
                content_type = 'image/png'
            elif file_path.endswith('.jpg') or file_path.endswith('.jpeg'):
                content_type = 'image/jpeg'
            elif file_path.endswith('.gif'):
                content_type = 'image/gif'
            
            self.send_response(200)
            self.send_header('Content-Type', content_type)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(content)
            
        except FileNotFoundError:
            self.send_error(404, "Arquivo não encontrado")
        except Exception as e:
            print(f"Erro ao servir arquivo: {e}")
            self.send_error(500, "Erro interno")

def run_proxy_server(port=8001):
    """Executa o servidor proxy"""
    with socketserver.TCPServer(("", port), ProxyHandler) as httpd:
        print(f"🚀 Servidor Proxy rodando na porta {port}")
        print(f"📡 Acesse: http://localhost:{port}")
        print(f"🔗 Proxy: http://localhost:{port}/proxy/URL_DO_JOGO")
        print("Pressione Ctrl+C para parar")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Servidor parado")

if __name__ == "__main__":
    run_proxy_server()
