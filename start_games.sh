#!/bin/bash

# Script para iniciar todos os jogos Blaey
# Uso: ./start_games.sh

echo "🎮 Iniciando Portal Blaey Games..."

# Parar servidores existentes
echo "🔄 Parando servidores existentes..."
pkill -f "python3 -m http.server" 2>/dev/null
pkill -f "serve_sinuca" 2>/dev/null
sleep 2

# Iniciar servidor principal
echo "🌐 Iniciando servidor principal na porta 8000..."
python3 -m http.server 8000 &
PORTAL_PID=$!

echo ""
echo "✅ Portal iniciado com sucesso!"
echo "🌐 Portal Principal: http://localhost:8000"
echo ""
echo "🎮 Jogos disponíveis:"
echo "   👻 Pacman: http://localhost:8000/jogos/pacman_js/index_mobile.html"
echo "   🎱 Sinuca: http://localhost:8000/jogos/sinuca/html5games/index.html"
echo "   ♟️ Xadrez: http://localhost:8000/jogos/chess_js/index.html"
echo "   🔴 Damas: http://localhost:8000/jogos/damas/rapid-draughts-main/index.html"
echo ""
echo "⏹️  Para parar o servidor, pressione Ctrl+C"
echo ""

# Manter o script rodando
wait
