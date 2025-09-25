#!/bin/bash

# Script para iniciar o portal e a Sinuca corretamente
# Uso: ./start_sinuca_correct.sh

echo "🎮 Iniciando Portal Blaey Games com Sinuca..."

# Parar servidores existentes
echo "🔄 Parando servidores existentes..."
pkill -f "python3 -m http.server" 2>/dev/null
pkill -f "serve_sinuca" 2>/dev/null
sleep 2

# Iniciar servidor da Sinuca (porta 8080)
echo "🎱 Iniciando servidor da Sinuca na porta 8080..."
cd jogos/sinuca && python3 serve_sinuca.py &
SINUCA_PID=$!
cd ../..

# Aguardar um pouco para o servidor da Sinuca inicializar
sleep 3

# Iniciar servidor principal (porta 8000)
echo "🌐 Iniciando servidor principal na porta 8000..."
python3 -m http.server 8000 &
PORTAL_PID=$!

echo ""
echo "✅ Todos os servidores iniciados!"
echo "🌐 Portal Principal: http://localhost:8000"
echo "🎱 Sinuca: http://localhost:8080/index_simple.html"
echo ""
echo "🎮 Jogos disponíveis:"
echo "   👻 Pacman: http://localhost:8000/jogos/pacman_js/index_mobile.html"
echo "   🎱 Sinuca: http://localhost:8080/index_simple.html"
echo "   ♟️ Xadrez: http://localhost:8000/jogos/chess_js/index.html"
echo "   🔴 Damas: http://localhost:8000/jogos/damas/rapid-draughts-main/index.html"
echo ""
echo "⏹️  Para parar os servidores, pressione Ctrl+C"
echo ""

# Manter o script rodando
wait
