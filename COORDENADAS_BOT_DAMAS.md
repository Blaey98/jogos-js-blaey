# 🎯 Coordenadas do Bot - Damas

## 📋 **Mapeamento de Coordenadas do Tabuleiro**

### **Layout do Tabuleiro (8x8):**
```
8 | a8   c8   e8   g8     (bits: 0, 2, 4, 6) - PRIMEIRA FILEIRA DO BOT
7 |   b7   d7   f7   h7   (bits: 4, 5, 6, 7) - SEGUNDA FILEIRA
6 | a6   c6   e6   g6     (bits: 8, 9, 10, 11)
5 |   b5   d5   f5   h5   (bits: 12, 13, 14, 15)
4 | a4   c4   e4   g4     (bits: 16, 17, 18, 19)
3 |   b3   d3   f3   h3   (bits: 20, 21, 22, 23)
2 | a2   c2   e2   g2     (bits: 24, 25, 26, 27)
1 |   b1   d1   f1   h1   (bits: 28, 29, 30, 31)
   +-------------------
    a b c d e f g h
```

### **Coordenadas do Bot (Peças Escuras):**

#### **Primeira Fileira (Row 0) - Bot Inicia Aqui:**
- **a8**: (0,0) - bit 0 - **PERMITIDO**
- **c8**: (0,2) - bit 2 - **PERMITIDO**
- **e8**: (0,4) - bit 4 - **PERMITIDO**
- **g8**: (0,6) - bit 6 - **PERMITIDO**

#### **Segunda Fileira (Row 1) - Bot Pode Mover Para:**
- **b7**: (1,1) - bit 4 - **DESTINO VÁLIDO**
- **d7**: (1,3) - bit 5 - **DESTINO VÁLIDO**
- **f7**: (1,5) - bit 6 - **DESTINO VÁLIDO**
- **h7**: (1,7) - bit 7 - **DESTINO VÁLIDO**

#### **Terceira Fileira (Row 2) - Bot Pode Mover Para:**
- **a6**: (2,0) - bit 8 - **DESTINO VÁLIDO**
- **c6**: (2,2) - bit 9 - **DESTINO VÁLIDO**
- **e6**: (2,4) - bit 10 - **DESTINO VÁLIDO**
- **g6**: (2,6) - bit 11 - **DESTINO VÁLIDO**

## 🔧 **Mapeamento Bitmask para Coordenadas**

### **Função de Conversão:**
```javascript
const bitToPosition = {
    // Primeira fileira do bot (row 0)
    1: {row: 0, col: 1},    // bit 0 -> (0,1) b8
    2: {row: 0, col: 3},    // bit 1 -> (0,3) d8
    4: {row: 0, col: 5},    // bit 2 -> (0,5) f8
    8: {row: 0, col: 7},    // bit 3 -> (0,7) h8
    
    // Segunda fileira (row 1) - destinos válidos
    16: {row: 1, col: 1},   // bit 4 -> (1,1) b7
    32: {row: 1, col: 3},   // bit 5 -> (1,3) d7
    64: {row: 1, col: 5},   // bit 6 -> (1,5) f7
    128: {row: 1, col: 7},  // bit 7 -> (1,7) h7
    
    // Terceira fileira (row 2) - destinos válidos
    256: {row: 2, col: 1},  // bit 8 -> (2,1) b6
    512: {row: 2, col: 3},  // bit 9 -> (2,3) d6
    1024: {row: 2, col: 5}, // bit 10 -> (2,5) f6
    2048: {row: 2, col: 7}, // bit 11 -> (2,7) h6
    
    // Quarta fileira (row 3) - destinos válidos
    4096: {row: 3, col: 1}, // bit 12 -> (3,1) b5
    8192: {row: 3, col: 3}, // bit 13 -> (3,3) d5
    16384: {row: 3, col: 5}, // bit 14 -> (3,5) f5
    32768: {row: 3, col: 7}, // bit 15 -> (3,7) h5
    
    // Quinta fileira (row 4) - destinos válidos
    65536: {row: 4, col: 1}, // bit 16 -> (4,1) b4
    131072: {row: 4, col: 3}, // bit 17 -> (4,3) d4
    262144: {row: 4, col: 5}, // bit 18 -> (4,5) f4
    524288: {row: 4, col: 7}, // bit 19 -> (4,7) h4
    
    // Sexta fileira (row 5) - destinos válidos
    1048576: {row: 5, col: 1}, // bit 20 -> (5,1) b3
    2097152: {row: 5, col: 3}, // bit 21 -> (5,3) c3
    4194304: {row: 5, col: 5}, // bit 22 -> (5,5) f3
    8388608: {row: 5, col: 7}, // bit 23 -> (5,7) h3
    
    // Sétima fileira (row 6) - destinos válidos
    16777216: {row: 6, col: 1}, // bit 24 -> (6,1) b2
    33554432: {row: 6, col: 3}, // bit 25 -> (6,3) d2
    67108864: {row: 6, col: 5}, // bit 26 -> (6,5) f2
    134217728: {row: 6, col: 7}, // bit 27 -> (6,7) h2
    
    // Oitava fileira (row 7) - destinos válidos
    268435456: {row: 7, col: 1}, // bit 28 -> (7,1) b1
    536870912: {row: 7, col: 3}, // bit 29 -> (7,3) d1
    1073741824: {row: 7, col: 5}, // bit 30 -> (7,5) f1
    2147483648: {row: 7, col: 7}  // bit 31 -> (7,7) h1
};
```

## 🎯 **Regras de Movimento do Bot**

### **1. Primeira Fileira (Row 0) - ORIGEM:**
- **a8 (0,0)**: Bot pode mover para **b7 (1,1)**
- **c8 (0,2)**: Bot pode mover para **d7 (1,3)**
- **e8 (0,4)**: Bot pode mover para **f7 (1,5)**
- **g8 (0,6)**: Bot pode mover para **h7 (1,7)**

### **2. Segunda Fileira (Row 1) - DESTINO:**
- **b7 (1,1)**: Bot pode mover para **a6 (2,0)** ou **c6 (2,2)**
- **d7 (1,3)**: Bot pode mover para **c6 (2,2)** ou **e6 (2,4)**
- **f7 (1,5)**: Bot pode mover para **e6 (2,4)** ou **g6 (2,6)**
- **h7 (1,7)**: Bot pode mover para **g6 (2,6)**

### **3. Movimentos Válidos:**
```javascript
// Movimentos da primeira fileira para segunda fileira
a8 -> b7: (0,0) -> (1,1)
c8 -> d7: (0,2) -> (1,3)
e8 -> f7: (0,4) -> (1,5)
g8 -> h7: (0,6) -> (1,7)

// Movimentos da segunda fileira para terceira fileira
b7 -> a6: (1,1) -> (2,0)
b7 -> c6: (1,1) -> (2,2)
d7 -> c6: (1,3) -> (2,2)
d7 -> e6: (1,3) -> (2,4)
f7 -> e6: (1,5) -> (2,4)
f7 -> g6: (1,5) -> (2,6)
h7 -> g6: (1,7) -> (2,6)
```

## 🚫 **Posições Proibidas para o Bot**

### **Colunas Pares (0, 2, 4, 6) - NUNCA:**
- **a8 (0,0)**: ❌ Proibido - coluna 0
- **c8 (0,2)**: ❌ Proibido - coluna 2
- **e8 (0,4)**: ❌ Proibido - coluna 4
- **g8 (0,6)**: ❌ Proibido - coluna 6

### **Colunas Ímpares (1, 3, 5, 7) - SEMPRE:**
- **b8 (0,1)**: ✅ Permitido - coluna 1
- **d8 (0,3)**: ✅ Permitido - coluna 3
- **f8 (0,5)**: ✅ Permitido - coluna 5
- **h8 (0,7)**: ✅ Permitido - coluna 7

## 🔍 **Debug e Logs**

### **Logs Esperados:**
```
🎯 Gerando movimentos válidos seguindo regras do jogo...
✅ Movimento válido: b8 -> 4 (casa escura disponível)
✅ Movimento válido: d8 -> 5 (casa escura disponível)
✅ Movimento válido: f8 -> 6 (casa escura disponível)
✅ Movimento válido: h8 -> 7 (casa escura disponível)
🎯 Total de movimentos encontrados: 4
```

### **Logs de Conversão:**
```
🔄 Convertendo movimento rapid-draughts: {"origin":1,"destination":16,"captures":0}
✅ Conversão: origem(1) -> (0,1), destino(16) -> (1,1)
✅ Movimento convertido para formato local: {"fromRow":0,"fromCol":1,"toRow":1,"toCol":1,"type":"move","capturedPieces":[]}
```

### **Logs de Execução:**
```
🎯 Executando movimento: origem(0,1) -> destino(1,1)
🔍 COORDENADAS DO BOT - Verificando movimento:
📍 Origem: linha 0, coluna 1
📍 Destino: linha 1, coluna 1
🔍 Peça na origem (0,1): 2
🔍 Peça no destino (1,1): 0
✅ COORDENADAS DO BOT VALIDADAS:
✅ Origem (0,1) tinha peça 2
✅ Destino (1,1) agora tem peça 2
🎯 MOVIMENTO DO BOT EXECUTADO COM SUCESSO!
```

## 🎮 **Como Usar**

### **1. Verificar Coordenadas:**
```javascript
// Verifica se a posição tem uma peça do bot
if (this.board[row][col] === 2) {
    console.log(`Peça do bot encontrada em (${row},${col})`);
}
```

### **2. Validar Movimento:**
```javascript
// Verifica se o destino está livre
if (this.board[toRow][toCol] === 0) {
    console.log(`Destino (${toRow},${toCol}) está livre`);
}
```

### **3. Executar Movimento:**
```javascript
// Move a peça do bot
this.board[fromRow][fromCol] = 0;
this.board[toRow][toCol] = 2;
```

## ✅ **Status Atual**

- ✅ **Coordenadas Corretas**: Bot joga da primeira fileira (row 0)
- ✅ **Movimentos Válidos**: Bot move para casas escuras disponíveis
- ✅ **Sem Posições Ocupadas**: Bot não tenta mover para posições ocupadas
- ✅ **Logs Detalhados**: Rastreamento completo de movimentos

**O bot agora joga corretamente com as coordenadas da primeira fileira!** 🚀
