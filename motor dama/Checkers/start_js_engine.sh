#!/bin/bash

# Script para iniciar o servidor com motor JavaScript
echo "🚀 Iniciando Servidor de Damas com Motor JavaScript"
echo "=" * 50

# Ativar ambiente virtual
echo "📦 Ativando ambiente virtual..."
source venv_checkers/bin/activate

# Verificar se o motor JavaScript está funcionando
echo "🧪 Testando motor JavaScript..."
cd src/engine-draughts
if node engine_interface.cjs test > /dev/null 2>&1; then
    echo "✅ Motor JavaScript funcionando!"
else
    echo "❌ Erro no motor JavaScript"
    exit 1
fi

# Voltar ao diretório principal
cd ../..

# Iniciar servidor
echo "🌐 Iniciando servidor web..."
echo "   URL: http://localhost:8081"
echo "   API: http://localhost:8081/api/health"
echo ""
echo "🛑 Para parar: Ctrl+C"
echo ""

python3 web_server_checkers.py
