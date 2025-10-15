#!/usr/bin/env python3
"""
Script para iniciar o servidor API do motor de damas
"""

import sys
import os
import subprocess

# Adicionar o diretório src/python ao path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src', 'python'))

def main():
    print("🎮 Iniciando Servidor API do Motor de Damas")
    print("=" * 50)
    
    # Verificar se o Python está disponível
    try:
        import http.server
        import json
        import multiprocessing
        print("✅ Dependências Python OK")
    except ImportError as e:
        print(f"❌ Erro nas dependências: {e}")
        return 1
    
    # Verificar se os arquivos do motor estão disponíveis
    engine_path = os.path.join(os.path.dirname(__file__), 'src', 'python')
    required_files = [
        'bitboard_converter.py',
        'Board_opperations.py'
    ]
    
    missing_files = []
    for file in required_files:
        if not os.path.exists(os.path.join(engine_path, file)):
            missing_files.append(file)
    
    if missing_files:
        print(f"⚠️ Arquivos faltando: {', '.join(missing_files)}")
        print("O servidor funcionará com funcionalidade limitada")
    else:
        print("✅ Arquivos do motor encontrados")
    
    # Tentar importar o motor C
    try:
        sys.path.insert(0, engine_path)
        import search_engine
        print("✅ Motor C disponível")
    except ImportError:
        print("⚠️ Motor C não encontrado, usando motor Python")
    
    # Iniciar o servidor
    try:
        from checkers_api_server import run_server
        
        # Permitir especificar porta via argumento
        port = 8081
        if len(sys.argv) > 1:
            try:
                port = int(sys.argv[1])
            except ValueError:
                print("⚠️ Porta inválida, usando porta padrão 8081")
        
        print(f"\n🚀 Iniciando servidor na porta {port}...")
        run_server(port)
        
    except KeyboardInterrupt:
        print("\n🛑 Servidor interrompido pelo usuário")
        return 0
    except Exception as e:
        print(f"❌ Erro ao iniciar servidor: {e}")
        return 1

if __name__ == '__main__':
    sys.exit(main())
