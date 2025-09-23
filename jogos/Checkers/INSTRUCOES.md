# Instruções - Jogos de Damas

## 🎮 Como Executar

### Opção 1: Menu Principal (Recomendado)
Execute o menu principal que permite escolher entre as duas versões:

**Windows:**
```bash
run_menu.bat
```

**Linux/Mac:**
```bash
python run_menu.py
```

### Opção 2: Execução Direta

**Damas Clássicas:**
```bash
python src/python/Main.py
```

**Damas Internacionais:**
```bash
python International_Checkers/src/python/Main_International.py
```

## 🎯 Diferenças entre as Versões

### Damas Clássicas
- Regras tradicionais de damas
- Peões só capturam para frente
- Damas se movem 1 casa por vez
- Tabuleiro marrom/bege

### Damas Internacionais ✨
- **Captura para trás**: Peões podem capturar movendo-se para trás
- **Dama livre**: Damas podem se mover quantas casas quiserem na diagonal
- **Captura múltipla**: Damas podem capturar várias peças em uma jogada
- **Tabuleiro branco/verde escuro**

## 🎲 Como Jogar

1. **Clique** na peça que deseja mover
2. **Clique** no destino desejado
3. **Capturas obrigatórias**: Se uma captura for possível, apenas movimentos de captura serão permitidos
4. **Captura múltipla**: Continue clicando para capturas adicionais

## 🏆 Objetivo
Capturar todas as peças do adversário ou bloquear todos os seus movimentos.

## 📁 Estrutura Modular

```
Checkers/
├── src/python/                    # Damas Clássicas
├── International_Checkers/        # Damas Internacionais
│   ├── src/python/
│   └── README.md
├── Menu_Principal.py              # Menu de seleção
├── run_menu.py                    # Executor do menu
└── run_menu.bat                   # Executor Windows
```

## 🔧 Requisitos
- Python 3.7+
- Pygame
- Arquivos do motor de busca (já incluídos)

## 🆕 Novidades Implementadas

✅ **Pasta modular** para damas internacionais  
✅ **Cores do tabuleiro** alteradas para branco/verde escuro  
✅ **Regras internacionais** implementadas  
✅ **Menu principal** para escolha entre versões  
✅ **Captura para trás** funcionando  
✅ **Movimento livre das damas** implementado  

## 🎨 Interface

O menu principal oferece:
- Navegação com setas do teclado
- Seleção com ENTER
- Descrição de cada versão
- Interface intuitiva e moderna

---

**Divirta-se jogando! 🎮**
