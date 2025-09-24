# 🎮 Como Acessar os Jogos (Sem Servidor)

## ✅ **Sistema 100% Local**

Os jogos agora funcionam **completamente offline**, sem necessidade de servidor Node.js!

## 🌐 **Formas de Acessar**

### **1. URLs Diretas (Copie e cole no navegador)**

#### **Damas Clássicas:**
```
file:///home/jeff/Área de trabalho/jogos-js-blaey/public/games/checkers/index.html
```

#### **Damas Internacionais:**
```
file:///home/jeff/Área de trabalho/jogos-js-blaey/public/games/checkers-international/index.html
```

### **2. Via Terminal (Abre automaticamente)**

#### **Damas Clássicas:**
```bash
xdg-open "file:///home/jeff/Área de trabalho/jogos-js-blaey/public/games/checkers/index.html"
```

#### **Damas Internacionais:**
```bash
xdg-open "file:///home/jeff/Área de trabalho/jogos-js-blaey/public/games/checkers-international/index.html"
```

### **3. Via Gerenciador de Arquivos**

1. Abra o gerenciador de arquivos
2. Navegue até: `/home/jeff/Área de trabalho/jogos-js-blaey/public/games/`
3. Escolha a pasta:
   - `checkers/` → Damas Clássicas
   - `checkers-international/` → Damas Internacionais
4. Clique duplo em `index.html`

## 🎯 **Funcionalidades Disponíveis**

### **✅ Modo Expert Funcionando**
- Selecione: "Expert (Profundidade 7)"
- Bot usa biblioteca `rapid-draughts` local
- Movimentos inteligentes sem servidor

### **✅ Status do Bot**
- **"Bot Local Ativo"** quando biblioteca carregada
- **"Carregando Bot..."** durante carregamento
- Indicador visual em tempo real

### **✅ Níveis de Dificuldade**
- **Fácil (Profundidade 1)**: Motor local simples
- **Médio (Profundidade 3)**: Motor local médio
- **Difícil (Profundidade 5)**: Motor local avançado
- **Expert (Profundidade 7)**: Biblioteca rapid-draughts

## 🔧 **Troubleshooting**

### **Se o jogo não carregar:**
1. Verifique se o arquivo `rapid-draughts.cjs` está presente
2. Abra o console do navegador (F12) para ver erros
3. Verifique se JavaScript está habilitado

### **Se o bot não funcionar:**
1. Aguarde o carregamento da biblioteca (1-2 segundos)
2. Verifique o status do bot no canto superior
3. Se necessário, recarregue a página

### **Logs de Debug:**
- Abra DevTools (F12)
- Veja console para logs detalhados:
  ```
  📚 Carregando biblioteca rapid-draughts...
  ✅ Biblioteca rapid-draughts carregada com sucesso!
  🤖 Usando rapid-draughts com profundidade 7
  ```

## 🎉 **Vantagens do Sistema Local**

- ✅ **Sem Servidor**: Não precisa de Node.js
- ✅ **Offline**: Funciona sem internet
- ✅ **Rápido**: Sem latência de rede
- ✅ **Simples**: Apenas abra o arquivo HTML
- ✅ **Inteligente**: Motor TypeScript completo
- ✅ **Confiável**: Sem dependências externas

## 🚀 **Pronto para Jogar!**

**Os jogos estão prontos para uso direto, sem servidor!** 🎯
