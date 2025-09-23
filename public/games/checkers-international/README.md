# Damas Internacionais - Versão Web

## 🌍 Sobre o Jogo

Esta é a versão web do jogo de damas internacionais, uma implementação avançada com regras internacionais que incluem captura para trás e movimento livre das damas.

## 🎯 Características Especiais

### Regras Internacionais
- **Captura para trás**: Peões podem capturar peças inimigas movendo-se para trás
- **Movimento livre da dama**: Damas podem se mover quantas casas quiserem na diagonal
- **Captura múltipla**: Damas podem capturar várias peças em uma única jogada
- **Obrigatoriedade de captura**: Se uma captura for possível, ela deve ser realizada

### Visual Diferenciado
- **Tabuleiro branco/verde escuro**: Cores distintas da versão clássica
- **Interface moderna**: Design responsivo e intuitivo
- **Animações suaves**: Efeitos visuais aprimorados

## 🚀 Como Executar

### Requisitos
- Python 3.7 ou superior
- Pygame instalado (`pip install pygame`)
- Arquivos do motor de busca (já incluídos)

### Execução
```bash
# Navegue até a pasta do jogo
cd public/games/checkers-international/

# Execute o jogo
python src/python/Main_International.py
```

### Execução via Menu Principal
```bash
# Na pasta principal do projeto
python jogos/Checkers/run_menu.py
```

## 🎮 Controles

- **Mouse**: Clique na peça que deseja mover e depois no destino
- **Captura obrigatória**: Se uma captura for possível, apenas movimentos de captura serão permitidos
- **Captura múltipla**: Após uma captura, se outra captura for possível, continue clicando

## 📁 Estrutura de Arquivos

```
checkers-international/
├── index.html                     # Página web do jogo
├── README.md                      # Este arquivo
├── src/
│   └── python/
│       ├── Main_International.py  # Arquivo principal
│       ├── Board_opperations.py   # Regras do jogo modificadas
│       ├── Gui.py                 # Interface gráfica
│       └── ...                    # Outros arquivos do motor
└── assets/                        # Recursos gráficos
```

## 🔄 Diferenças da Versão Clássica

| Aspecto | Damas Clássicas | Damas Internacionais |
|---------|----------------|---------------------|
| **Captura para trás** | ❌ Não permitida | ✅ Permitida |
| **Movimento da dama** | 1 casa por vez | Quantas casas quiser |
| **Captura múltipla** | Limitada | Livre para damas |
| **Cores do tabuleiro** | Marrom/Bege | Branco/Verde escuro |
| **Complexidade** | Básica | Avançada |

## 🎯 Objetivo do Jogo

Capturar todas as peças do adversário ou bloquear todos os seus movimentos possíveis.

## 🛠️ Desenvolvimento

Baseado no motor original de damas desenvolvido por Collin Kees, com modificações para implementar as regras internacionais.

### Modificações Principais
- `Board_opperations.py`: Implementação das regras internacionais
- `Gui.py`: Alteração das cores do tabuleiro
- `Main_International.py`: Arquivo principal específico para a versão internacional

## 📱 Compatibilidade

- **Sistema Operacional**: Windows, Linux, macOS
- **Python**: 3.7+
- **Pygame**: Última versão estável
- **Resolução**: Responsivo (mínimo 800x600)

## 🎨 Personalização

As cores do tabuleiro podem ser facilmente modificadas no arquivo `Gui.py`:

```python
CB = (255,255,255)  # Branco
CD = (0,100,0)      # Verde escuro
```

## 🆘 Suporte

Para problemas ou dúvidas:
1. Verifique se o Python e Pygame estão instalados corretamente
2. Certifique-se de que todos os arquivos estão presentes
3. Execute o jogo a partir da pasta correta

---

**Divirta-se jogando Damas Internacionais! 🌍🎮**