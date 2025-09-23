#!/usr/bin/env python3
"""
Script para testar a integração do motor de damas
"""

import sys
import os
import time
import subprocess
import requests
import json

def test_api_server():
    """Testa se o servidor API está funcionando"""
    print("🧪 Testando Servidor API...")
    
    try:
        # Testar health check
        response = requests.get('http://localhost:8081/api/health', timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Health Check OK - Motor: {data.get('engine_type', 'Unknown')}")
            return True
        else:
            print(f"❌ Health Check falhou - Status: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Erro de conexão: {e}")
        return False

def test_move_request():
    """Testa requisição de movimento"""
    print("🧪 Testando Requisição de Movimento...")
    
    # Tabuleiro de teste
    test_board = [
        [0, 2, 0, 2, 0, 2, 0, 2],
        [2, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 0, 2, 0, 2, 0, 2],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0]
    ]
    
    try:
        response = requests.post('http://localhost:8081/api/move', 
                               json={
                                   'board': test_board,
                                   'player': 2,
                                   'difficulty': 3,
                                   'game_type': 'international'
                               }, 
                               timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                move = data.get('move', {})
                print(f"✅ Movimento gerado: {move.get('fromRow', 0)},{move.get('fromCol', 0)} → {move.get('toRow', 0)},{move.get('toCol', 0)}")
                return True
            else:
                print(f"❌ Erro na resposta: {data.get('message', 'Unknown error')}")
                return False
        else:
            print(f"❌ Requisição falhou - Status: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Erro de requisição: {e}")
        return False

def start_api_server():
    """Inicia o servidor API em background"""
    print("🚀 Iniciando Servidor API...")
    
    try:
        # Iniciar servidor em background
        process = subprocess.Popen([
            sys.executable, 'start_api_server.py'
        ], cwd=os.path.dirname(__file__))
        
        # Aguardar servidor inicializar
        print("⏳ Aguardando servidor inicializar...")
        time.sleep(5)
        
        return process
    except Exception as e:
        print(f"❌ Erro ao iniciar servidor: {e}")
        return None

def main():
    print("🎮 Teste de Integração do Motor de Damas")
    print("=" * 50)
    
    # Verificar se o servidor já está rodando
    if test_api_server():
        print("✅ Servidor já está rodando!")
    else:
        print("🔄 Iniciando servidor...")
        process = start_api_server()
        
        if not process:
            print("❌ Falha ao iniciar servidor")
            return 1
        
        # Testar novamente
        if not test_api_server():
            print("❌ Servidor não respondeu")
            process.terminate()
            return 1
    
    # Testar requisição de movimento
    if test_move_request():
        print("✅ Integração funcionando perfeitamente!")
        print("\n🎮 Agora você pode:")
        print("1. Acessar: http://localhost:3000/games/checkers-international/")
        print("2. Jogar contra a IA avançada!")
        return 0
    else:
        print("❌ Falha na integração")
        return 1

if __name__ == '__main__':
    try:
        sys.exit(main())
    except KeyboardInterrupt:
        print("\n🛑 Teste interrompido pelo usuário")
        sys.exit(0)
    except Exception as e:
        print(f"❌ Erro inesperado: {e}")
        sys.exit(1)
