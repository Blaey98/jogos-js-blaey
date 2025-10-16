#!/bin/bash

echo "🚀 Iniciando servidor local para Portal de Jogos..."
echo "📁 Diretório: $(pwd)"
echo ""

# Verifica se a porta 3000 está em uso
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Porta 3000 já está em uso. Tentando porta 3001..."
    PORT=3001
else
    PORT=3000
fi

echo "🌐 Servidor iniciado em: http://localhost:$PORT"
echo ""
echo "📱 Páginas disponíveis:"
echo "   • Jogos Verticais: http://localhost:$PORT/jogos-verticais.html"
echo "   • Jogos Horizontais: http://localhost:$PORT/jogos-horizontais.html"
echo "   • Lista Completa: http://localhost:$PORT/lista-jogos.html"
echo ""
echo "⏹️  Para parar o servidor, pressione Ctrl+C"
echo ""

# Inicia o servidor Python
python3 -m http.server $PORT