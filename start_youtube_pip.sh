#!/bin/bash

# Script para iniciar o YouTube PiP localmente
# Este script inicia um servidor HTTP simples para servir o arquivo HTML

echo "🎬 Iniciando YouTube PiP Player..."
echo "=================================="

# Verificar se Python está instalado
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    PYTHON_CMD="python"
else
    echo "❌ Python não encontrado. Instale Python para continuar."
    exit 1
fi

# Verificar se o arquivo HTML existe
if [ ! -f "youtube-pip.html" ]; then
    echo "❌ Arquivo youtube-pip.html não encontrado!"
    echo "   Certifique-se de estar no diretório correto."
    exit 1
fi

# Obter o diretório atual
CURRENT_DIR=$(pwd)

echo "📁 Diretório: $CURRENT_DIR"
echo "🌐 Iniciando servidor HTTP..."
echo ""
echo "✅ Servidor iniciado com sucesso!"
echo "🔗 Acesse: http://localhost:8000/youtube-pip.html"
echo "🔗 Ou: http://127.0.0.1:8000/youtube-pip.html"
echo ""
echo "⚠️  IMPORTANTE:"
echo "   - Configure sua chave da API do YouTube no arquivo HTML"
echo "   - Pressione Ctrl+C para parar o servidor"
echo ""
echo "🚀 Abrindo navegador..."

# Tentar abrir o navegador
if command -v xdg-open &> /dev/null; then
    xdg-open "http://localhost:8000/youtube-pip.html" &
elif command -v open &> /dev/null; then
    open "http://localhost:8000/youtube-pip.html" &
elif command -v start &> /dev/null; then
    start "http://localhost:8000/youtube-pip.html" &
fi

# Iniciar servidor HTTP
$PYTHON_CMD -m http.server 8000
