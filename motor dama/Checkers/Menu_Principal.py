# Menu principal para escolher entre Damas Clássicas e Damas Internacionais
# Desenvolvido para o projeto jogos_blaey

import pygame
import sys
import os
import subprocess

class MenuPrincipal:
    def __init__(self):
        pygame.init()
        self.size = (800, 600)
        self.screen = pygame.display.set_mode(self.size)
        pygame.display.set_caption('Menu Principal - Jogos de Damas')
        self.clock = pygame.time.Clock()
        
        # Cores
        self.BRANCO = (255, 255, 255)
        self.PRETO = (0, 0, 0)
        self.VERDE_ESCURO = (0, 100, 0)
        self.VERDE_CLARO = (0, 150, 0)
        self.CINZA = (128, 128, 128)
        self.AZUL = (0, 0, 255)
        
        # Fontes
        self.fonte_titulo = pygame.font.Font(None, 48)
        self.fonte_menu = pygame.font.Font(None, 36)
        self.fonte_descricao = pygame.font.Font(None, 24)
        
        # Opções do menu
        self.opcoes = [
            {
                'titulo': 'Damas Clássicas',
                'descricao': 'Regras tradicionais de damas',
                'arquivo': 'src/python/Main.py',
                'cor': self.AZUL
            },
            {
                'titulo': 'Damas Internacionais',
                'descricao': 'Captura para trás e dama livre',
                'arquivo': 'International_Checkers/src/python/Main_International.py',
                'cor': self.VERDE_ESCURO
            }
        ]
        
        self.opcao_selecionada = 0
        
    def desenhar_menu(self):
        self.screen.fill(self.BRANCO)
        
        # Título
        titulo = self.fonte_titulo.render('JOGOS DE DAMAS', True, self.PRETO)
        titulo_rect = titulo.get_rect(center=(self.size[0]//2, 80))
        self.screen.blit(titulo, titulo_rect)
        
        # Desenhar opções
        y_pos = 200
        for i, opcao in enumerate(self.opcoes):
            # Cor de fundo da opção
            cor_fundo = self.VERDE_CLARO if i == self.opcao_selecionada else self.CINZA
            rect = pygame.Rect(150, y_pos - 10, 500, 80)
            pygame.draw.rect(self.screen, cor_fundo, rect)
            pygame.draw.rect(self.screen, self.PRETO, rect, 2)
            
            # Título da opção
            titulo_opcao = self.fonte_menu.render(opcao['titulo'], True, self.PRETO)
            self.screen.blit(titulo_opcao, (170, y_pos))
            
            # Descrição da opção
            descricao = self.fonte_descricao.render(opcao['descricao'], True, self.PRETO)
            self.screen.blit(descricao, (170, y_pos + 35))
            
            y_pos += 120
        
        # Instruções
        instrucoes = self.fonte_descricao.render('Use as setas para navegar e ENTER para selecionar', True, self.PRETO)
        instrucoes_rect = instrucoes.get_rect(center=(self.size[0]//2, self.size[1] - 50))
        self.screen.blit(instrucoes, instrucoes_rect)
        
        pygame.display.flip()
    
    def executar_jogo(self, opcao):
        """Executa o jogo selecionado"""
        try:
            arquivo = opcao['arquivo']
            caminho_completo = os.path.join(os.path.dirname(__file__), arquivo)
            
            if os.path.exists(caminho_completo):
                # Executar o jogo em um novo processo
                subprocess.run([sys.executable, caminho_completo])
            else:
                print(f"Arquivo não encontrado: {caminho_completo}")
        except Exception as e:
            print(f"Erro ao executar o jogo: {e}")
    
    def executar(self):
        """Loop principal do menu"""
        rodando = True
        
        while rodando:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    rodando = False
                elif event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_UP:
                        self.opcao_selecionada = (self.opcao_selecionada - 1) % len(self.opcoes)
                    elif event.key == pygame.K_DOWN:
                        self.opcao_selecionada = (self.opcao_selecionada + 1) % len(self.opcoes)
                    elif event.key == pygame.K_RETURN:
                        # Executar o jogo selecionado
                        self.executar_jogo(self.opcoes[self.opcao_selecionada])
                    elif event.key == pygame.K_ESCAPE:
                        rodando = False
            
            self.desenhar_menu()
            self.clock.tick(60)
        
        pygame.quit()
        sys.exit()

if __name__ == '__main__':
    menu = MenuPrincipal()
    menu.executar()
