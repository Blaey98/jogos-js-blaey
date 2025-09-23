#!/usr/bin/env python3
"""
Wrapper para simular o motor C usando o motor Python
"""

import sys
import os
from simple_engine import SimpleCheckersEngine
from bitboard_converter import convert_to_bitboard, convert_to_matrix

class CEngineWrapper:
    """Wrapper que simula a interface do motor C usando o motor Python"""
    
    def __init__(self):
        self.engine = SimpleCheckersEngine()
        print("✅ Wrapper do motor C inicializado (usando motor Python)")
    
    def search_position(self, p1, p2, p1k, p2k, player, p_time, ply):
        """
        Simula a função search_position do motor C
        """
        # Converter bitboards para matriz
        board = convert_to_matrix(p1, p2, p1k, p2k)
        
        # Configurar dificuldade baseada na profundidade
        if ply <= 3:
            self.engine.set_difficulty(1)
        elif ply <= 5:
            self.engine.set_difficulty(2)
        elif ply <= 7:
            self.engine.set_difficulty(3)
        else:
            self.engine.set_difficulty(4)
        
        # Obter melhor movimento
        move = self.engine.get_best_move(board, player)
        
        if move:
            # Converter movimento de matriz para bitboard
            from_pos = move['fromRow'] * 8 + move['fromCol']
            to_pos = move['toRow'] * 8 + move['toCol']
            
            # Retornar no formato esperado pelo motor C
            return (
                (from_pos, to_pos),  # Movimento
                (ply, ply, self.engine.nodes_evaluated, 0, 0)  # Info de busca
            )
        else:
            return (None, (0, 0, 0, 0, 0))

# Criar instância global
search_engine = CEngineWrapper()

# Função de compatibilidade
def search_position(p1, p2, p1k, p2k, player, p_time, ply):
    """Função de compatibilidade com o motor C"""
    return search_engine.search_position(p1, p2, p1k, p2k, player, p_time, ply)
