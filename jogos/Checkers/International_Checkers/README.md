# Damas Internacionais

Esta é uma implementação do jogo de damas com regras internacionais, baseada no motor original de damas desenvolvido por Collin Kees.

## Diferenças das Regras Internacionais

### Regras Clássicas vs Internacionais

| Aspecto | Damas Clássicas | Damas Internacionais |
|---------|----------------|---------------------|
| **Captura para trás** | ❌ Não permitida | ✅ Permitida |
| **Movimento da dama** | 1 casa por vez | Quantas casas quiser |
| **Captura múltipla** | Limitada | Livre para damas |
| **Cores do tabuleiro** | Marrom/Bege | Branco/Verde escuro |

### Regras Específicas das Damas Internacionais

1. **Captura para trás**: Peões podem capturar peças inimigas movendo-se para trás
2. **Movimento livre da dama**: Damas podem se mover quantas casas quiserem na diagonal
3. **Captura múltipla**: Damas podem capturar múltiplas peças em uma única jogada
4. **Obrigatoriedade de captura**: Se uma captura for possível, ela deve ser realizada

## Como Jogar

### Controles
- **Mouse**: Clique na peça que deseja mover e depois no destino
- **Captura obrigatória**: Se uma captura for possível, apenas movimentos de captura serão permitidos
- **Captura múltipla**: Após uma captura, se outra captura for possível, continue clicando

### Objetivo
Capturar todas as peças do adversário ou bloquear todos os seus movimentos.

## Executando o Jogo

### Opção 1: Menu Principal
```bash
cd /jogos/Checkers
python run_menu.py
```

### Opção 2: Execução Direta
```bash
cd /jogos/Checkers/International_Checkers/src/python
python Main_International.py
```

## Estrutura de Arquivos

```
International_Checkers/
├── src/
│   └── python/
│       ├── Main_International.py    # Arquivo principal
│       ├── Board_opperations.py     # Regras do jogo modificadas
│       ├── Gui.py                   # Interface gráfica
│       └── ...                      # Outros arquivos do motor
├── assets/                          # Recursos gráficos
└── README.md                        # Este arquivo
```

## Dependências

- Python 3.7+
- Pygame
- Arquivos do motor de busca (search_engine)

## Notas Técnicas

- O motor de busca original foi mantido para compatibilidade
- As regras foram modificadas no arquivo `Board_opperations.py`
- As cores do tabuleiro foram alteradas no arquivo `Gui.py`
- O jogo mantém a mesma interface e controles da versão clássica
