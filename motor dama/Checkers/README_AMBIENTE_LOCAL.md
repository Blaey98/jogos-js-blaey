# 🎮 Ambiente Local do Motor de Busca C - Damas

## ✅ Configuração Concluída!

O ambiente local para o motor de busca C de damas foi configurado com sucesso!

### 🏗️ **Estrutura do Ambiente:**

```
jogos/Checkers/
├── venv_checkers/              # Ambiente virtual Python
├── src/
│   ├── engine/                 # Código fonte C
│   └── python/                 # Wrapper Python + Motor C compilado
├── compile_venv.sh             # Script de compilação
├── start_local_environment.sh  # Script de inicialização
└── test_venv_engine.py         # Teste do motor C
```

### 🚀 **Como Usar:**

#### **Opção 1: Script Automático (Recomendado)**
```bash
./start_local_environment.sh
```

#### **Opção 2: Manual**
```bash
# 1. Ativar ambiente virtual
source venv_checkers/bin/activate

# 2. Iniciar servidor web
python optimized_server.py --port 8081 --pool-size 2

# 3. Ou executar menu principal
python Menu_Principal.py
```

### 🌐 **URLs Disponíveis:**

- **API Health:** `http://localhost:8081/api/health`
- **Servidor Web:** `http://localhost:8081/`

### 🧪 **Testar o Motor C:**

```bash
source venv_checkers/bin/activate
python test_venv_engine.py
```

### 📋 **Status dos Componentes:**

- ✅ **Ambiente Virtual:** Configurado e ativo
- ✅ **Motor C:** Compilado e funcionando
- ✅ **Dependências:** Todas instaladas
- ✅ **Servidor:** Pronto para uso
- ✅ **Testes:** Motor C validado

### 🔧 **Comandos Úteis:**

```bash
# Recompilar motor C
./compile_venv.sh

# Testar motor C
python test_venv_engine.py

# Verificar ambiente virtual
source venv_checkers/bin/activate
which python
pip list
```

### 🎯 **Funcionalidades do Motor C:**

- **Função Principal:** `search_position(p1, p2, p1k, p2k, player, time, depth)`
- **Parâmetros:** 6 inteiros de 64 bits + tempo/profundidade
- **Retorno:** Melhor movimento calculado
- **Performance:** Otimizado com flags `-O3 -march=native`

### 🛠️ **Solução de Problemas:**

1. **Motor C não carrega:**
   ```bash
   ./compile_venv.sh
   ```

2. **Ambiente virtual não ativa:**
   ```bash
   source venv_checkers/bin/activate
   ```

3. **Dependências faltando:**
   ```bash
   pip install -r requirements.txt
   ```

### 📊 **Performance:**

- **Compilação:** GCC 13.3.0 com otimizações
- **Python:** 3.12.3 no ambiente virtual
- **Motor:** Compilado para arquitetura nativa
- **Memória:** Otimizado para jogos de damas

---

## 🎉 **Pronto para Usar!**

O motor de busca C está funcionando perfeitamente no ambiente local. Você pode agora:

1. **Jogar damas** com IA de alta performance
2. **Usar o servidor web** para interface gráfica
3. **Executar testes** para validar funcionamento
4. **Desenvolver** novas funcionalidades

**Divirta-se jogando! 🎮**
