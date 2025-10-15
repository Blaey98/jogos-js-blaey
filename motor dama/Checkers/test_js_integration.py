#!/usr/bin/env python3
"""
Script de teste para integração do motor JavaScript
"""

import sys
import os

# Adicionar o diretório atual ao path
sys.path.insert(0, os.path.dirname(__file__))

from js_engine_wrapper import load_js_engine, test_js_engine, search_move_js

def main():
    print("🧪 Testando integração do motor JavaScript...")
    print("=" * 50)
    
    # Testar carregamento
    print("1. Carregando motor JavaScript...")
    if load_js_engine():
        print("✅ Motor JavaScript carregado com sucesso!")
    else:
        print("❌ Falha ao carregar motor JavaScript")
        return False
    
    # Testar motor
    print("\n2. Testando motor JavaScript...")
    result = test_js_engine()
    print(f"Resultado do teste: {result}")
    
    if "success" in result and result["success"]:
        print("✅ Motor JavaScript funcionando!")
    else:
        print("❌ Motor JavaScript com problemas")
        return False
    
    # Testar busca de movimento
    print("\n3. Testando busca de movimento...")
    try:
        move_result = search_move_js([], 1, 1.0, 6)
        print(f"Resultado da busca: {move_result}")
        
        if "error" not in move_result:
            print("✅ Busca de movimento funcionando!")
        else:
            print("❌ Problema na busca de movimento")
            return False
            
    except Exception as e:
        print(f"❌ Erro na busca de movimento: {e}")
        return False
    
    print("\n🎉 Todos os testes passaram! Motor JavaScript integrado com sucesso!")
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
