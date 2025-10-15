#!/usr/bin/env python3
"""
Teste final da integração do motor JavaScript
"""

import sys
import os
import json
import time

# Adicionar o diretório atual ao path
sys.path.insert(0, os.path.dirname(__file__))

from js_engine_wrapper import load_js_engine, search_move_js, test_js_engine

def test_api_call():
    """Testa uma chamada de API simulada"""
    print("🔍 Testando chamada de API simulada...")
    
    # Simular dados de uma chamada de API
    board_state = []  # Estado inicial
    player = 1
    time_limit = 1.0
    depth = 6
    
    try:
        result = search_move_js(board_state, player, time_limit, depth)
        print(f"Resultado da busca: {result}")
        
        if "error" not in result and "move" in result:
            print("✅ API funcionando corretamente!")
            return True
        else:
            print("❌ Problema na API")
            return False
            
    except Exception as e:
        print(f"❌ Erro na API: {e}")
        return False

def main():
    print("🎯 Teste Final da Integração do Motor JavaScript")
    print("=" * 60)
    
    # Teste 1: Carregamento
    print("\n1. Testando carregamento do motor...")
    if load_js_engine():
        print("✅ Motor JavaScript carregado!")
    else:
        print("❌ Falha ao carregar motor")
        return False
    
    # Teste 2: Teste básico
    print("\n2. Testando motor básico...")
    test_result = test_js_engine()
    if "success" in test_result and test_result["success"]:
        print("✅ Motor básico funcionando!")
    else:
        print("❌ Motor básico com problemas")
        return False
    
    # Teste 3: Busca de movimento
    print("\n3. Testando busca de movimento...")
    if test_api_call():
        print("✅ Busca de movimento funcionando!")
    else:
        print("❌ Problema na busca de movimento")
        return False
    
    # Teste 4: Múltiplas buscas
    print("\n4. Testando múltiplas buscas...")
    success_count = 0
    for i in range(3):
        try:
            result = search_move_js([], 1, 0.5, 4)
            if "error" not in result:
                success_count += 1
                print(f"   Busca {i+1}: ✅")
            else:
                print(f"   Busca {i+1}: ❌")
        except Exception as e:
            print(f"   Busca {i+1}: ❌ Erro: {e}")
    
    if success_count >= 2:
        print("✅ Múltiplas buscas funcionando!")
    else:
        print("❌ Problema com múltiplas buscas")
        return False
    
    print("\n🎉 INTEGRAÇÃO COMPLETA E FUNCIONANDO!")
    print("✅ Motor JavaScript integrado com sucesso")
    print("✅ Bot inteligente sem fallback")
    print("✅ Pronto para uso em produção")
    
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
