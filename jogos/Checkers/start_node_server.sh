#!/bin/bash

# Script para iniciar o servidor Node.js puro
echo "🚀 Iniciando Servidor Node.js de Damas"
echo "=" * 50

# Navegar para o diretório do motor
cd src/engine-draughts

# Verificar se Node.js está disponível
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado"
    exit 1
fi

# Verificar se as dependências estão instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi

# Verificar se o motor está compilado
if [ ! -f "dist/english.cjs" ]; then
    echo "🔨 Compilando motor TypeScript..."
    npm run build
fi

# Iniciar servidor
echo "🌐 Iniciando servidor..."
echo "   URL: http://localhost:8081"
echo "   API: http://localhost:8081/api/health"
echo ""
echo "🛑 Para parar: Ctrl+C"
echo ""

node server.cjs
