# 🌍 Acesso ao Jogo de Damas Internacionais

## 🎮 Acesso via Web

### URL Principal
```
http://localhost:3000/
```

### URL Direta do Jogo
```
http://localhost:3000/games/checkers-international/
```

## 🚀 Como Acessar

1. **Certifique-se de que o servidor está rodando:**
   ```bash
   node src/index.js
   ```

2. **Abra seu navegador e acesse:**
   - **Menu Principal**: `http://localhost:3000/`
   - **Damas Internacionais**: `http://localhost:3000/games/checkers-international/`

## 🎯 O que Você Verá

### Na Página Principal
- **Novo bloco**: "Damas Internacionais" com ícone 🌍
- **Descrição**: "Versão avançada com captura para trás e dama livre"
- **Botão**: "Jogar Damas Internacionais"

### Na Página do Jogo
- **Título**: "Damas Internacionais"
- **Regras explicadas**: Captura para trás, movimento livre da dama, etc.
- **Características visuais**: Tabuleiro branco/verde escuro
- **Instruções de instalação**: Como executar o jogo Python

## 🎨 Características Visuais

### Cores do Tabuleiro
- **Branco**: `(255, 255, 255)`
- **Verde escuro**: `(0, 100, 0)`

### Design da Página
- **Fundo**: Gradiente verde escuro
- **Cards**: Fundo branco com bordas arredondadas
- **Botões**: Gradiente verde com hover effects
- **Responsivo**: Funciona em desktop e mobile

## 🎲 Regras Implementadas

### ✅ Captura para Trás
- Peões podem capturar peças inimigas movendo-se para trás
- Funciona para ambos os lados (vermelho e preto)

### ✅ Movimento Livre da Dama
- Damas podem se mover quantas casas quiserem na diagonal
- Movimento livre em todas as direções diagonais

### ✅ Captura Múltipla
- Damas podem capturar várias peças em uma única jogada
- Capturas em sequência são obrigatórias

### ✅ Obrigatoriedade de Captura
- Se uma captura for possível, ela deve ser realizada
- Sistema detecta automaticamente capturas obrigatórias

## 🛠️ Execução do Jogo

### Via Menu Principal (Recomendado)
```bash
cd jogos/Checkers
python run_menu.py
```

### Execução Direta
```bash
cd public/games/checkers-international
python src/python/Main_International.py
```

## 📱 Compatibilidade

- **Navegadores**: Chrome, Firefox, Safari, Edge
- **Dispositivos**: Desktop, tablet, mobile
- **Resolução**: Responsivo (mínimo 800x600)

## 🎯 Próximos Passos

1. **Acesse**: `http://localhost:3000/`
2. **Clique**: No bloco "Damas Internacionais"
3. **Leia**: As regras e instruções
4. **Execute**: O jogo Python conforme instruído
5. **Divirta-se**: Com as regras internacionais!

---

**🎮 O jogo de Damas Internacionais está agora disponível na sua página web!**
