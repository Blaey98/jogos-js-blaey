#!/bin/bash

# Script simples para iniciar o servidor principal
# Uso: ./start_simple.sh

echo "🎮 Iniciando servidor Blaey Games..."

# Parar servidores existentes
echo "🔄 Parando servidores existentes..."
pkill -f "python3 -m http.server" 2>/dev/null
sleep 2

# Iniciar servidor principal
echo "🚀 Iniciando servidor na porta 8000..."
echo "🌐 Acesse: http://localhost:8000"
echo "👻 Pacman: http://localhost:8000/jogos/pacman_js/index_mobile.html"
echo ""
echo "⏹️  Para parar, pressione Ctrl+C"
echo ""

python3 -m http.server 8000
