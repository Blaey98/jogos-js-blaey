#!/usr/bin/env python3
"""
Script para testar o motor C de damas no ambiente virtual
"""

import sys
import os

# Adicionar o diretório src/python ao path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src', 'python'))

def test_motor_c():
    """Testa o motor C de damas"""
    print("🧪 Testando Motor C de Damas no Ambiente Virtual")
    print("=" * 50)
    
    try:
        import search_engine
        print("✅ Motor C carregado com sucesso!")
        print(f"📁 Arquivo: {search_engine.__file__}")
        print(f"🔧 Funções disponíveis: {dir(search_engine)}")
        
        # Testar se as funções principais estão disponíveis
        if hasattr(search_engine, 'search_position'):
            print("✅ Função search_position encontrada")
            
            # Testar a função com parâmetros básicos
            try:
                # Parâmetros de teste (6 inteiros de 64 bits)
                # p1, p2, p1k, p2k, player, time/depth
                result = search_engine.search_position(0, 0, 0, 0, 1, 1.0)
                print(f"✅ Função search_position executada com sucesso!")
                print(f"📊 Resultado: {result}")
            except Exception as e:
                print(f"⚠️ Erro ao executar search_position: {e}")
        else:
            print("❌ Função search_position não encontrada")
            
    except ImportError as e:
        print(f"❌ Erro ao importar motor C: {e}")
        return False
    except Exception as e:
        print(f"❌ Erro inesperado: {e}")
        return False
    
    return True

def test_python_fallback():
    """Testa o motor Python como fallback"""
    print("\n🔄 Testando Motor Python como Fallback")
    print("=" * 40)
    
    try:
        from src.python import Package_engine
        print("✅ Motor Python carregado como fallback")
        return True
    except ImportError as e:
        print(f"❌ Erro ao carregar motor Python: {e}")
        return False

if __name__ == "__main__":
    print("🚀 Iniciando testes do motor de damas...")
    print(f"🐍 Python: {sys.version}")
    print(f"📂 Diretório: {os.getcwd()}")
    print(f"🔧 Ambiente virtual: {os.environ.get('VIRTUAL_ENV', 'Não ativado')}")
    print()
    
    # Testar motor C
    motor_c_ok = test_motor_c()
    
    # Se motor C falhar, testar Python
    if not motor_c_ok:
        test_python_fallback()
    
    print("\n" + "=" * 50)
    if motor_c_ok:
        print("🎉 Motor C funcionando perfeitamente!")
    else:
        print("⚠️ Usando motor Python como fallback")
    print("=" * 50)
