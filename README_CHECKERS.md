# 🎮 Jogo de Damas com Motor C

Este projeto implementa um jogo de damas completo com um motor de busca avançado em C, interface web em JavaScript e servidor API em Python.

## 🚀 Como Executar

### Método 1: Servidor Automático (Recomendado)
```bash
cd /home/novo_user/Área\ de\ trabalho/jogos_blaey
python3 start_checkers_server.py
```

### Método 2: Servidores Separados
```bash
# Terminal 1: Servidor Principal (porta 3000)
cd /home/novo_user/Área\ de\ trabalho/jogos_blaey
python3 -m http.server 3000

# Terminal 2: API do Motor (porta 8081)
cd /home/novo_user/Área\ de\ trabalho/jogos_blaey/jogos/Checkers
python3 setup_local_server.py
```

## 🌐 Acesso aos Jogos

Após iniciar o servidor, acesse:

- **Damas Clássicas**: http://localhost:3000/games/checkers/
- **Damas Internacionais**: http://localhost:3000/games/checkers-international/
- **Xadrez**: http://localhost:3000/games/chess/
- **Sinuca**: http://localhost:3000/games/sinuca/

## 🔧 API do Motor

- **Health Check**: http://localhost:8081/api/health
- **Status**: http://localhost:8081/api/status
- **Movimento**: POST http://localhost:8081/api/move
- **Validação**: POST http://localhost:8081/api/validate

## 🏗️ Arquitetura do Motor C

### Arquivos Principais do Motor

#### `/jogos/Checkers/src/engine/`
- **`board_search.c`** - Algoritmo principal de busca (Minimax com Alpha-Beta)
- **`board_eval.c`** - Avaliação de posições do tabuleiro
- **`neural_net.c`** - Rede neural para avaliação avançada
- **`Checkers_NN.c`** - Interface Python para treinamento da rede neural
- **`hash_table.c`** - Tabela de transposição para otimização
- **`killer_table.c`** - Tabela de movimentos killer
- **`draw_table.c`** - Detecção de empates por repetição
- **`set.c`** - Estrutura de dados para posições das peças

### Características do Motor

#### 🧠 Algoritmo de Busca
- **Minimax com Alpha-Beta Pruning**
- **Profundidade configurável** (padrão: 6-8 níveis)
- **Extensão de busca** para capturas forçadas
- **Redução de busca** para movimentos tardios

#### 🎯 Avaliação de Posições
- **Avaliação material** (peças normais: 50, damas: 70)
- **Avaliação posicional** com tabelas específicas
- **Padrões táticos** (Right Lock, Triangle, Oreo, Bridge, Dog)
- **Distância ao centro** para damas
- **Tail pins** (damas bloqueando peças inimigas)
- **Bônus por vantagem material**

#### ⚡ Otimizações
- **Tabela de transposição** (1MB de memória)
- **Movimentos killer** para ordenação
- **Detecção de empates** por repetição
- **Bitboards** para representação eficiente
- **Geração de movimentos** otimizada

#### 🤖 Rede Neural (Opcional)
- **Arquitetura**: 128 entradas → 5 camadas → 1 saída
- **Função de ativação**: ReLU
- **Treinamento**: Backpropagation com gradiente descendente
- **Interface Python** para treinamento e teste

## 📊 Interface Python

### Arquivos de Interface
- **`Main.py`** - Interface principal com multiprocessing
- **`c_engine_wrapper.py`** - Wrapper para compatibilidade
- **`checkers_api_server.py`** - Servidor HTTP API
- **`bitboard_converter.py`** - Conversão entre formatos
- **`Board_opperations.py`** - Operações do tabuleiro

### API Endpoints

#### POST `/api/move`
```json
{
  "board": [[1,0,1,0,1,0,1,0], ...],
  "player": 2,
  "difficulty": 3,
  "game_type": "classic"
}
```

#### Resposta
```json
{
  "success": true,
  "move": {
    "fromRow": 2,
    "fromCol": 1,
    "toRow": 3,
    "toCol": 0,
    "captured": false
  },
  "search_info": {
    "depth": 6,
    "eval": 45,
    "leafs": 12543,
    "hashes": 892
  }
}
```

## 🎮 Interface Web

### Características
- **Interface responsiva** com CSS moderno
- **Animações suaves** para movimentos
- **Diferentes níveis de dificuldade**
- **Modo multiplayer** (humano vs IA)
- **Validação de movimentos** em tempo real
- **Indicadores visuais** para movimentos válidos

### Controles
- **Clique** na peça para selecionar
- **Clique** no destino para mover
- **Enter** para confirmar movimento
- **R** para reiniciar jogo
- **Esc** para cancelar seleção

## 🔧 Configuração Avançada

### Compilação do Motor C
```bash
cd jogos/Checkers
python3 src/python/Package_engine.py build_ext --inplace
```

### Treinamento da Rede Neural
```bash
cd jogos/Checkers/src/python
python3 train_neural_net.py
```

### Teste de Performance
```bash
cd jogos/Checkers/src/python
python3 bot_vs_bot.py
```

## 📈 Performance

### Benchmarks Típicos
- **Profundidade 6**: ~50ms por movimento
- **Profundidade 8**: ~500ms por movimento
- **Profundidade 10**: ~5s por movimento
- **Nós por segundo**: ~1M-10M (dependendo da posição)

### Memória
- **Tabela de transposição**: 1MB
- **Outras estruturas**: ~100KB
- **Total**: ~1.1MB por instância

## 🐛 Solução de Problemas

### Motor C não carrega
```bash
# Verificar se o arquivo .so existe
ls -la jogos/Checkers/src/python/search_engine.*

# Recompilar se necessário
cd jogos/Checkers
python3 src/python/Package_engine.py build_ext --inplace
```

### Erro de permissão
```bash
# Tornar scripts executáveis
chmod +x start_checkers_server.py
chmod +x jogos/Checkers/setup_local_server.py
```

### Porta em uso
```bash
# Verificar processos usando as portas
lsof -i :3000
lsof -i :8081

# Matar processos se necessário
kill -9 <PID>
```

## 📝 Logs e Debug

### Ativar logs detalhados
```bash
# Servidor com debug
python3 start_checkers_server.py 2>&1 | tee server.log

# API com debug
cd jogos/Checkers
python3 setup_local_server.py 2>&1 | tee api.log
```

### Verificar status
```bash
# Health check
curl http://localhost:8081/api/health

# Status detalhado
curl http://localhost:8081/api/status
```

## 🎯 Próximos Passos

1. **Compilar motor C** com headers Python
2. **Treinar rede neural** com dados de jogos
3. **Implementar abertura** de livros
4. **Adicionar análise** de jogos
5. **Interface de configuração** avançada

## 📚 Referências

- [Algoritmo Minimax](https://en.wikipedia.org/wiki/Minimax)
- [Alpha-Beta Pruning](https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning)
- [Bitboards](https://en.wikipedia.org/wiki/Bitboard)
- [Tabelas de Transposição](https://en.wikipedia.org/wiki/Transposition_table)

---

**Desenvolvido por**: Collin Kees (Motor C) + Adaptações para Web
**Licença**: MIT
**Versão**: 1.0.0
