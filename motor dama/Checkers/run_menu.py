#!/usr/bin/env python3
"""
Script para executar o menu principal dos jogos de damas
"""

import sys
import os

# Adicionar o diretório atual ao path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

try:
    from Menu_Principal import MenuPrincipal
    
    if __name__ == '__main__':
        menu = MenuPrincipal()
        menu.executar()
        
except ImportError as e:
    print(f"Erro ao importar módulos: {e}")
    print("Certifique-se de que o pygame está instalado: pip install pygame")
    sys.exit(1)
except Exception as e:
    print(f"Erro inesperado: {e}")
    sys.exit(1)
