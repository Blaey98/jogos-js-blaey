# 🎮 Jogos Blaey

Portal de jogos desenvolvidos em JavaScript puro com interface moderna e responsiva.

## 🎯 Jogos Disponíveis

### ♔ Xadrez
- **Descrição**: Jogue xadrez contra o poderoso Stockfish 16
- **Recursos**: Engine de xadrez profissional, múltiplos níveis de dificuldade
- **Tecnologia**: JavaScript, Stockfish.js, Chess.js

### 🔴 Damas
- **Descrição**: Clássico jogo de damas com IA inteligente
- **Recursos**: 15 níveis de dificuldade, interface intuitiva
- **Tecnologia**: JavaScript puro, algoritmo minimax

### 🎱 Sinuca
- **Descrição**: Jogue sinuca 8-ball com física realista
- **Recursos**: Efeitos visuais, física de bolas, múltiplas caçapas
- **Tecnologia**: JavaScript, Canvas API

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação

1. **Clone o repositório:**
```bash
git clone <url-do-repositorio>
cd jogos_blaey
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Execute o servidor:**
```bash
npm start
```

4. **Acesse no navegador:**
```
http://localhost:3000
```

### Modo de Desenvolvimento
```bash
npm run dev
```

## 📁 Estrutura do Projeto

```
jogos_blaey/
├── public/                    # Arquivos estáticos
│   ├── index.html            # Página principal de seleção
│   └── games/                # Jogos organizados
│       ├── chess/            # Jogo de xadrez
│       ├── checkers/         # Jogo de damas
│       └── sinuca/           # Jogo de sinuca
├── src/
│   └── index.js              # Servidor Express
├── tests/                    # Testes (futuro)
├── package.json              # Configurações do projeto
└── README.md                 # Este arquivo
```

## 🎮 Como Jogar

### Acessando os Jogos
1. Acesse `http://localhost:3000`
2. Escolha um jogo na página principal
3. Clique em "Jogar" para iniciar

### Controles dos Jogos

#### Xadrez
- Clique e arraste para mover peças
- Use os controles laterais para configurações
- Engine automática para jogadas do computador

#### Damas
- Clique na peça para selecionar
- Clique na casa de destino para mover
- Capturas automáticas quando possível

#### Sinuca
- Clique na bola branca
- Arraste para definir direção e força
- Solte para atirar

## 🛠️ Tecnologias Utilizadas

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Jogos**: 
  - Xadrez: Stockfish.js, Chess.js, Chessboard.js
  - Damas: JavaScript puro com algoritmo minimax
  - Sinuca: Canvas API, física customizada
- **Estilo**: CSS Grid, Flexbox, Gradientes, Animações

## 🔧 Scripts Disponíveis

```bash
npm start          # Inicia o servidor em produção
npm run dev        # Inicia com nodemon (desenvolvimento)
npm test           # Executa testes (futuro)
```

## 🌐 URLs dos Jogos

- **Página Principal**: http://localhost:3000
- **Xadrez**: http://localhost:3000/games/chess/
- **Damas**: http://localhost:3000/games/checkers/
- **Sinuca**: http://localhost:3000/games/sinuca/

## 📱 Responsividade

Todos os jogos são totalmente responsivos e funcionam em:
- 💻 Desktop
- 📱 Tablets
- 📱 Smartphones

## 🎨 Características

- ✅ Interface moderna e intuitiva
- ✅ Design responsivo
- ✅ JavaScript puro (sem frameworks pesados)
- ✅ Performance otimizada
- ✅ Compatibilidade cross-browser
- ✅ Efeitos visuais e animações
- ✅ Controles touch-friendly

## 🚀 Próximas Funcionalidades

- [ ] Sistema de pontuação
- [ ] Histórico de partidas
- [ ] Modo multiplayer online
- [ ] Mais jogos (Jogo da Velha, Snake, etc.)
- [ ] Sistema de usuários
- [ ] Rankings e estatísticas

## 📄 Licença

MIT License - Veja o arquivo LICENSE para detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novos jogos
- Melhorar a interface
- Otimizar performance

---

**Desenvolvido com ❤️ para diversão garantida!**
# blaey_jogos_js
