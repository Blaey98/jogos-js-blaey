#!/usr/bin/env python3
"""
Script para testar Damas Clássicas e Damas Internacionais com Motor C
"""

import sys
import os
import subprocess
import time

def test_motor_c():
    """Testa se o motor C está funcionando"""
    print("🧪 Testando Motor C...")
    try:
        sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src', 'python'))
        import search_engine
        print("✅ Motor C carregado com sucesso!")
        return True
    except ImportError as e:
        print(f"❌ Erro ao carregar motor C: {e}")
        return False

def test_classic_checkers():
    """Testa as damas clássicas"""
    print("\n🔴 Testando Damas Clássicas...")
    print("=" * 40)
    
    try:
        # Executar o jogo por alguns segundos
        process = subprocess.Popen([
            sys.executable, 'src/python/Main.py'
        ], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        
        # Aguardar alguns segundos para ver o motor funcionando
        time.sleep(3)
        
        # Terminar o processo
        process.terminate()
        stdout, stderr = process.communicate(timeout=5)
        
        if "Search Results:" in stdout:
            print("✅ Damas Clássicas funcionando com motor C!")
            print("📊 Resultados de busca detectados:")
            lines = stdout.split('\n')
            for line in lines:
                if "Search Results:" in line or "HashTable" in line or "Nodes/s:" in line or "PV -" in line:
                    print(f"   {line.strip()}")
            return True
        else:
            print("⚠️ Damas Clássicas executaram mas sem resultados de busca claros")
            return False
            
    except Exception as e:
        print(f"❌ Erro ao testar Damas Clássicas: {e}")
        return False

def test_international_checkers():
    """Testa as damas internacionais"""
    print("\n🌍 Testando Damas Internacionais...")
    print("=" * 40)
    
    try:
        # Executar o jogo por alguns segundos
        process = subprocess.Popen([
            sys.executable, 'International_Checkers/src/python/Main_International.py'
        ], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        
        # Aguardar alguns segundos para ver o motor funcionando
        time.sleep(3)
        
        # Terminar o processo
        process.terminate()
        stdout, stderr = process.communicate(timeout=5)
        
        if "Search Results:" in stdout:
            print("✅ Damas Internacionais funcionando com motor C!")
            print("📊 Resultados de busca detectados:")
            lines = stdout.split('\n')
            for line in lines:
                if "Search Results:" in line or "HashTable" in line or "Nodes/s:" in line or "PV -" in line:
                    print(f"   {line.strip()}")
            return True
        else:
            print("⚠️ Damas Internacionais executaram mas sem resultados de busca claros")
            return False
            
    except Exception as e:
        print(f"❌ Erro ao testar Damas Internacionais: {e}")
        return False

def main():
    """Função principal"""
    print("🎮 Teste Completo - Damas com Motor C")
    print("=" * 50)
    print(f"🐍 Python: {sys.version}")
    print(f"📂 Diretório: {os.getcwd()}")
    print(f"🔧 Ambiente virtual: {os.environ.get('VIRTUAL_ENV', 'Não ativado')}")
    print()
    
    # Testar motor C
    motor_ok = test_motor_c()
    
    if not motor_ok:
        print("❌ Motor C não está funcionando. Execute primeiro:")
        print("   ./compile_venv.sh")
        return
    
    # Testar damas clássicas
    classic_ok = test_classic_checkers()
    
    # Testar damas internacionais
    international_ok = test_international_checkers()
    
    # Resumo final
    print("\n" + "=" * 50)
    print("📊 RESUMO DOS TESTES:")
    print("=" * 50)
    print(f"🔧 Motor C: {'✅ OK' if motor_ok else '❌ FALHOU'}")
    print(f"🔴 Damas Clássicas: {'✅ OK' if classic_ok else '❌ FALHOU'}")
    print(f"🌍 Damas Internacionais: {'✅ OK' if international_ok else '❌ FALHOU'}")
    
    if motor_ok and classic_ok and international_ok:
        print("\n🎉 TODOS OS TESTES PASSARAM!")
        print("🚀 O motor de busca C está funcionando perfeitamente em ambos os jogos!")
    else:
        print("\n⚠️ Alguns testes falharam. Verifique os erros acima.")
    
    print("\n🎮 Para jogar:")
    print("   Damas Clássicas: python src/python/Main.py")
    print("   Damas Internacionais: python International_Checkers/src/python/Main_International.py")

if __name__ == "__main__":
    main()
