#!/bin/bash
# Script para iniciar o ambiente local do motor de busca C

echo "🚀 Iniciando Ambiente Local do Motor de Busca C"
echo "=============================================="

# Verificar se o ambiente virtual existe
if [ ! -d "venv_checkers" ]; then
    echo "❌ Ambiente virtual não encontrado. Execute primeiro:"
    echo "   python3 -m venv venv_checkers"
    echo "   ./compile_venv.sh"
    exit 1
fi

# Ativar ambiente virtual
echo "🔧 Ativando ambiente virtual..."
source venv_checkers/bin/activate

if [[ "$VIRTUAL_ENV" != "" ]]; then
    echo "✅ Ambiente virtual ativado: $VIRTUAL_ENV"
else
    echo "❌ Falha ao ativar ambiente virtual"
    exit 1
fi

# Verificar se o motor C está compilado
if [ ! -f "src/python/search_engine.cpython-312-x86_64-linux-gnu.so" ]; then
    echo "❌ Motor C não encontrado. Compilando..."
    ./compile_venv.sh
fi

# Testar o motor C
echo "🧪 Testando motor C..."
if python -c "import sys; sys.path.insert(0, 'src/python'); import search_engine; print('✅ Motor C OK')" 2>/dev/null; then
    echo "✅ Motor C funcionando perfeitamente!"
else
    echo "❌ Problema com o motor C"
    exit 1
fi

echo ""
echo "🎮 Opções disponíveis:"
echo "1. Iniciar servidor web (porta 8081)"
echo "2. Executar menu principal (pygame)"
echo "3. Testar motor C"
echo "4. Sair"
echo ""

read -p "Escolha uma opção (1-4): " choice

case $choice in
    1)
        echo "🌐 Iniciando servidor web na porta 8081..."
        echo "📱 Acesse: http://localhost:8081/api/health"
        echo "🛑 Para parar: Ctrl+C"
        echo ""
        python optimized_server.py --port 8081 --pool-size 2
        ;;
    2)
        echo "🎮 Iniciando menu principal..."
        python Menu_Principal.py
        ;;
    3)
        echo "🧪 Testando motor C..."
        python test_venv_engine.py
        ;;
    4)
        echo "👋 Saindo..."
        exit 0
        ;;
    *)
        echo "❌ Opção inválida"
        exit 1
        ;;
esac
