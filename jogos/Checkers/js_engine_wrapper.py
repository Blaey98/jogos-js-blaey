#!/usr/bin/env python3
"""
Wrapper Python para o motor JavaScript rapid-draughts
Integra o motor JavaScript com o servidor Python
"""

import json
import subprocess
import sys
import os
from typing import Dict, List, Any, Optional

class JSEngineWrapper:
    """Wrapper para o motor JavaScript rapid-draughts"""
    
    def __init__(self):
        self.engine_path = os.path.join(os.path.dirname(__file__), 'src', 'engine-draughts')
        self.node_script = os.path.join(self.engine_path, 'engine_interface.cjs')
        self.initialized = False
        
    def initialize(self) -> bool:
        """Inicializa o motor JavaScript"""
        try:
            # Verificar se o arquivo compilado existe
            if not os.path.exists(self.node_script):
                print(f"❌ Arquivo JavaScript não encontrado: {self.node_script}")
                return False
                
            # Testar se o Node.js está disponível
            result = subprocess.run(['node', '--version'], 
                                  capture_output=True, text=True, timeout=5)
            if result.returncode != 0:
                print("❌ Node.js não está disponível")
                return False
                
            print("✅ Motor JavaScript inicializado com sucesso!")
            self.initialized = True
            return True
            
        except Exception as e:
            print(f"❌ Erro ao inicializar motor JavaScript: {e}")
            return False
    
    def _run_js_engine(self, command: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Executa comandos no motor JavaScript"""
        if not self.initialized:
            return {"error": "Motor JavaScript não inicializado"}
            
        try:
            # Executar script Node.js diretamente
            cmd = ['node', self.node_script, command]
            
            if data:
                cmd.append(json.dumps(data))
            
            result = subprocess.run(
                cmd,
                cwd=self.engine_path,
                capture_output=True,
                text=True,
                timeout=30
            )
            
            if result.returncode != 0:
                return {"error": f"Erro no Node.js: {result.stderr}"}
            
            # Parse da resposta JSON
            try:
                response = json.loads(result.stdout.strip())
                return response
            except json.JSONDecodeError:
                return {"error": f"Resposta inválida do motor: {result.stdout}"}
                
        except subprocess.TimeoutExpired:
            return {"error": "Timeout na execução do motor JavaScript"}
        except Exception as e:
            return {"error": f"Erro na execução: {str(e)}"}
    
    def search_move(self, board_state: List[int], player: int, time_limit: float = 1.0, depth: int = 6) -> Dict[str, Any]:
        """Busca o melhor movimento usando o motor JavaScript"""
        data = {
            "board_state": board_state,
            "player": player,
            "time_limit": time_limit,
            "depth": depth
        }
        
        # Sempre inicializar o motor antes da busca
        init_result = self._run_js_engine("init", {})
        if "error" in init_result:
            return init_result
        
        return self._run_js_engine("search", data)
    
    def get_moves(self, board_state: List[int], player: int) -> Dict[str, Any]:
        """Obtém todos os movimentos possíveis"""
        data = {
            "board_state": board_state,
            "player": player
        }
        
        return self._run_js_engine("moves", data)
    
    def test_engine(self) -> Dict[str, Any]:
        """Testa o motor JavaScript"""
        try:
            # Teste simples
            result = self.get_moves([], 1)
            return {
                "success": True,
                "result": result,
                "message": "Motor JavaScript funcionando!"
            }
        except Exception as e:
            return {"error": str(e)}

# Instância global do wrapper
js_engine = JSEngineWrapper()

def load_js_engine() -> bool:
    """Carrega o motor JavaScript"""
    return js_engine.initialize()

def search_move_js(board_state: List[int], player: int, time_limit: float = 1.0, depth: int = 6) -> Dict[str, Any]:
    """Função de busca usando motor JavaScript"""
    return js_engine.search_move(board_state, player, time_limit, depth)

def test_js_engine() -> Dict[str, Any]:
    """Testa o motor JavaScript"""
    return js_engine.test_engine()
