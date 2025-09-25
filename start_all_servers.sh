#!/bin/bash

# Script para iniciar todos os servidores necessários para os jogos Blaey
# Uso: ./start_all_servers.sh

echo "🎮 Iniciando todos os servidores Blaey Games..."

# Função para verificar se uma porta está em uso
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo "⚠️  Porta $port já está em uso!"
        return 1
    fi
    return 0
}

# Parar servidores existentes
echo "🔄 Parando servidores existentes..."
pkill -f "python3 -m http.server" 2>/dev/null
sleep 2

# Iniciar servidor principal (porta 8000)
echo "🚀 Iniciando servidor principal na porta 8000..."
if check_port 8000; then
    python3 -m http.server 8000 &
    SERVER_8000_PID=$!
    echo "✅ Servidor principal iniciado (PID: $SERVER_8000_PID)"
else
    echo "❌ Não foi possível iniciar servidor na porta 8000"
fi

# Iniciar servidor do Pacman (porta 8080)
echo "👻 Iniciando servidor do Pacman na porta 8080..."
if check_port 8080; then
    cd jogos/pacman_js
    python3 -m http.server 8080 &
    PACMAN_SERVER_PID=$!
    cd ../..
    echo "✅ Servidor do Pacman iniciado (PID: $PACMAN_SERVER_PID)"
else
    echo "❌ Não foi possível iniciar servidor do Pacman na porta 8080"
fi

echo ""
echo "🌐 Servidores ativos:"
echo "   📱 Portal Principal: http://localhost:8000"
echo "   👻 Pacman: http://localhost:8080/index_mobile.html"
echo ""
echo "⏹️  Para parar todos os servidores, pressione Ctrl+C"
echo ""

# Manter o script rodando
wait
