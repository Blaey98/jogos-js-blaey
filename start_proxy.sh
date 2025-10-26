#!/bin/bash

echo "🚀 Iniciando Servidor Proxy para Among Us"
echo "=========================================="

# Verifica se Python está instalado
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 não encontrado. Instale Python3 primeiro."
    exit 1
fi

# Verifica se o arquivo proxy_server.py existe
if [ ! -f "proxy_server.py" ]; then
    echo "❌ Arquivo proxy_server.py não encontrado."
    exit 1
fi

echo "✅ Python3 encontrado"
echo "✅ Arquivo proxy_server.py encontrado"
echo ""
echo "🖥️  Iniciando servidor proxy na porta 8001..."
echo "📡 Acesse: http://localhost:8001"
echo "🎮 Jogo: http://localhost:8001/proxy/www.agame.com/game/among-us"
echo ""
echo "Pressione Ctrl+C para parar o servidor"
echo ""

# Inicia o servidor proxy
python3 proxy_server.py
