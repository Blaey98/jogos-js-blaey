#!/usr/bin/env python3
"""
Script para testar o motor C de damas
"""

import sys
import os

# Adicionar o diretório src/python ao path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src', 'python'))

try:
    import search_engine
    print("✅ Motor C carregado com sucesso!")
    print(f"📁 Arquivo: {search_engine.__file__}")
    print(f"🔧 Funções disponíveis: {dir(search_engine)}")
    
    # Testar se as funções principais estão disponíveis
    if hasattr(search_engine, 'start_board_search'):
        print("✅ Função start_board_search encontrada")
    else:
        print("❌ Função start_board_search não encontrada")
        
    if hasattr(search_engine, 'human_readble_board'):
        print("✅ Função human_readble_board encontrada")
    else:
        print("❌ Função human_readble_board não encontrada")
        
except ImportError as e:
    print(f"❌ Erro ao importar motor C: {e}")
    print("💡 Tentando usar motor Python como fallback...")
    
    try:
        from src.python import Package_engine
        print("✅ Motor Python carregado como fallback")
    except ImportError as e2:
        print(f"❌ Erro ao carregar motor Python: {e2}")
except Exception as e:
    print(f"❌ Erro inesperado: {e}")
