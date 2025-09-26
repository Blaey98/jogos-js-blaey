#!/usr/bin/env python3
"""
Simple HTTP server to serve the Pacman game
Run this script and open http://localhost:8080 in your browser
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

# Change to the pacman directory
pacman_dir = Path(__file__).parent
os.chdir(pacman_dir)

PORT = 8080

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers to allow local file access
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"🎮 Pacman game server running at http://localhost:{PORT}")
        print("Press Ctrl+C to stop the server")
        
        # Try to open the game in the default browser
        try:
            webbrowser.open(f'http://localhost:{PORT}')
        except:
            pass
            
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped")
