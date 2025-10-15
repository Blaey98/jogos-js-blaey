#!/bin/bash
# Script para compilar o motor C de damas no ambiente virtual

echo "🔨 Compilando Motor C de Damas no Ambiente Virtual"
echo "=================================================="

# Ativar ambiente virtual
source venv_checkers/bin/activate

# Verificar se estamos no ambiente virtual
if [[ "$VIRTUAL_ENV" != "" ]]; then
    echo "✅ Ambiente virtual ativado: $VIRTUAL_ENV"
else
    echo "❌ Ambiente virtual não ativado"
    exit 1
fi

# Verificar dependências
echo "📋 Verificando dependências..."

# Verificar se Python está disponível
if ! command -v python &> /dev/null; then
    echo "❌ Python não encontrado no ambiente virtual"
    exit 1
fi

echo "✅ Python encontrado: $(python --version)"

# Verificar se gcc está instalado
if ! command -v gcc &> /dev/null; then
    echo "❌ GCC não encontrado"
    exit 1
fi

echo "✅ GCC encontrado: $(gcc --version | head -1)"

# Navegar para o diretório correto
cd "$(dirname "$0")"

# Método 1: Usar setuptools (recomendado)
echo "🔧 Compilando com setuptools..."

# Criar setup.py temporário
cat > setup_venv.py << 'EOF'
from setuptools import setup, Extension
import os

# Configurar paths
engine_dir = os.path.join('src', 'engine')
python_dir = os.path.join('src', 'python')

# Definir extensão
ext = Extension(
    "search_engine",
    sources=[os.path.join(engine_dir, "board_search.c")],
    include_dirs=[engine_dir],
    extra_compile_args=["-O3", "-march=native", "-mtune=native"],
    extra_link_args=["-O3"]
)

setup(
    name="search_engine",
    version="1.0.0",
    description="Motor C de Damas - Ambiente Virtual",
    ext_modules=[ext],
    script_args=["build_ext", "--inplace"]
)
EOF

# Compilar
if python setup_venv.py; then
    echo "✅ Compilação com setuptools bem-sucedida"
    rm setup_venv.py
else
    echo "❌ Falha na compilação com setuptools"
    rm setup_venv.py
    exit 1
fi

# Verificar se a compilação foi bem-sucedida
echo "🔍 Verificando resultado..."

if [ -f "search_engine.cpython-312-x86_64-linux-gnu.so" ]; then
    echo "✅ Motor C compilado com sucesso!"
    echo "📁 Arquivo: search_engine.cpython-312-x86_64-linux-gnu.so"
    
    # Copiar para o diretório python
    cp search_engine.cpython-312-x86_64-linux-gnu.so src/python/
    echo "✅ Arquivo copiado para src/python/"
    
    # Testar importação
    if python -c "import sys; sys.path.insert(0, 'src/python'); import search_engine; print('✅ Motor C carregado com sucesso')" 2>/dev/null; then
        echo "🎉 Motor C funcionando perfeitamente no ambiente virtual!"
    else
        echo "⚠️ Motor C compilado mas com problemas na importação"
    fi
else
    echo "❌ Motor C não foi compilado"
    exit 1
fi

echo ""
echo "🚀 Para usar o ambiente virtual:"
echo "   source venv_checkers/bin/activate"
echo "   python optimized_server.py --port 8081 --pool-size 4"
echo ""
echo "📊 Para testar:"
echo "   curl http://localhost:8081/api/health"
