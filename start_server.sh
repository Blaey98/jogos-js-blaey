#!/bin/bash

# Script para iniciar o servidor de jogos Blaey
# Uso: ./start_server.sh

echo "🎮 Iniciando servidor Blaey Games..."
echo "📁 Diretório: $(pwd)"
echo "🌐 Servidor será iniciado em: http://localhost:8000"
echo "⏹️  Para parar o servidor, pressione Ctrl+C"
echo ""

# Verificar se a porta 8000 está em uso
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Porta 8000 já está em uso!"
    echo "🔄 Tentando parar processo existente..."
    pkill -f "python3 -m http.server 8000" 2>/dev/null
    sleep 2
fi

# Iniciar servidor
echo "🚀 Iniciando servidor HTTP..."
python3 -m http.server 8000
