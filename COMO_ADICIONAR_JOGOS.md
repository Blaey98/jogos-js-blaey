# 🎮 Como Adicionar Novos Jogos - Blaey Games

## 📁 Estrutura do Projeto

```
jogos-js-blaey/
├── index.html                 # Página principal
├── js/
│   └── games-config.js       # Configuração dos jogos
├── jogos/                    # Pasta dos jogos
│   ├── pacman_js/           # Jogo do Pacman
│   ├── chess_js/            # Jogo de Xadrez
│   ├── sinuca/              # Jogo de Sinuca
│   └── [novo_jogo]/         # Seu novo jogo aqui
└── firebase.json            # Configuração do Firebase
```

## 🚀 Como Adicionar um Novo Jogo

### Passo 1: Criar a Pasta do Jogo
```bash
mkdir jogos/meu_novo_jogo
cd jogos/meu_novo_jogo
```

### Passo 2: Adicionar o Jogo na Configuração
Edite o arquivo `js/games-config.js` e adicione um novo objeto ao array `games`:

```javascript
{
    id: 'meu_novo_jogo',                    // ID único do jogo
    title: 'Meu Novo Jogo',                 // Nome exibido
    description: 'Descrição do jogo...',     // Descrição curta
    icon: '🎮',                            // Emoji do jogo
    path: 'jogos/meu_novo_jogo/index.html', // Caminho para o jogo
    status: 'available',                    // 'available' ou 'coming-soon'
    category: 'arcade',                    // Categoria do jogo
    tags: ['mobile', 'fun', 'new'],        // Tags para busca
    featured: false                         // Se é destaque (true/false)
}
```

### Passo 3: Categorias Disponíveis
- `arcade` - Jogos de arcade clássicos
- `strategy` - Jogos de estratégia
- `puzzle` - Jogos de quebra-cabeça
- `sports` - Jogos esportivos
- `action` - Jogos de ação
- `adventure` - Jogos de aventura

### Passo 4: Status do Jogo
- `available` - Jogo disponível para jogar
- `coming-soon` - Jogo em desenvolvimento

### Passo 5: Tags Recomendadas
- `mobile` - Otimizado para mobile
- `classic` - Jogo clássico
- `new` - Jogo novo
- `fun` - Divertido
- `challenging` - Desafiador
- `simple` - Simples
- `multiplayer` - Multijogador

## 📱 Exemplo Completo

### Adicionando o Jogo "Tetris"

1. **Criar a pasta:**
```bash
mkdir jogos/tetris_js
```

2. **Adicionar ao `games-config.js`:**
```javascript
{
    id: 'tetris',
    title: 'Tetris',
    description: 'O famoso puzzle game. Organize as peças e sobreviva!',
    icon: '🧩',
    path: 'jogos/tetris_js/index.html',
    status: 'available',
    category: 'puzzle',
    tags: ['puzzle', 'classic', 'addictive'],
    featured: true
}
```

3. **Criar o arquivo do jogo:**
```html
<!-- jogos/tetris_js/index.html -->
<!DOCTYPE html>
<html>
<head>
    <title>Tetris</title>
</head>
<body>
    <!-- Seu jogo aqui -->
</body>
</html>
```

## 🔧 Funcionalidades Avançadas

### Filtrar Jogos por Categoria
```javascript
// Obter todos os jogos de arcade
const arcadeGames = getGamesByCategory('arcade');

// Obter jogos em destaque
const featuredGames = getFeaturedGames();

// Obter jogos disponíveis
const availableGames = getAvailableGames();
```

### Buscar Jogos por Tag
```javascript
// Buscar jogos mobile
const mobileGames = getGamesByTag('mobile');

// Buscar jogos clássicos
const classicGames = getGamesByTag('classic');
```

## 🚀 Deploy no Firebase

1. **Configurar Firebase:**
```bash
firebase init hosting
```

2. **Fazer Deploy:**
```bash
firebase deploy --only hosting
```

3. **URL do seu portal:**
```
https://seu-projeto.web.app
```

## 📝 Dicas Importantes

1. **Sempre teste o jogo** antes de marcar como `available`
2. **Use emojis** para os ícones dos jogos
3. **Mantenha descrições curtas** e atrativas
4. **Organize por categorias** para facilitar navegação
5. **Use tags relevantes** para melhor busca

## 🎯 Próximos Passos

- [ ] Adicionar sistema de pontuação global
- [ ] Implementar sistema de usuários
- [ ] Adicionar chat entre jogadores
- [ ] Criar sistema de rankings
- [ ] Implementar jogos multijogador

---

**Boa sorte criando seu portal de jogos! 🎮**
