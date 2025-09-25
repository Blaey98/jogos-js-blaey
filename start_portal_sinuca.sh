#!/bin/bash

# Script para iniciar o portal principal e o servidor da Sinuca
# Uso: ./start_portal_sinuca.sh

echo "🎮 Iniciando Portal Blaey Games + Sinuca..."

# Parar servidores existentes
echo "🔄 Parando servidores existentes..."
pkill -f "python3 -m http.server" 2>/dev/null
pkill -f "serve_sinuca.py" 2>/dev/null
sleep 2

# Iniciar servidor da Sinuca (porta 8080)
echo "🎱 Iniciando servidor da Sinuca na porta 8080..."
cd jogos/sinuca
python3 serve_sinuca.py &
SINUCA_PID=$!
cd ../..

# Aguardar um pouco para o servidor da Sinuca inicializar
sleep 3

# Iniciar servidor principal (porta 8000)
echo "🌐 Iniciando portal principal na porta 8000..."
python3 -m http.server 8000 &
PORTAL_PID=$!

echo ""
echo "✅ Servidores iniciados com sucesso!"
echo "🌐 Portal Principal: http://localhost:8000"
echo "🎱 Sinuca: http://localhost:8080/index_simple.html"
echo ""
echo "⏹️  Para parar todos os servidores, pressione Ctrl+C"
echo ""

# Manter o script rodando
wait
