#!/bin/bash
# Script para compilar o motor C de damas

echo "🔨 Compilando Motor C de Damas"
echo "================================"

# Verificar dependências
echo "📋 Verificando dependências..."

# Verificar se Python está instalado
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 não encontrado"
    exit 1
fi

# Verificar se gcc está instalado
if ! command -v gcc &> /dev/null; then
    echo "❌ GCC não encontrado. Instalando..."
    # Tentar instalar (pode falhar sem sudo)
    apt update && apt install -y gcc python3-dev || {
        echo "⚠️ Não foi possível instalar GCC automaticamente"
        echo "Execute: sudo apt install gcc python3-dev"
        exit 1
    }
fi

echo "✅ Dependências OK"

# Navegar para o diretório correto
cd "$(dirname "$0")"

# Método 1: Usar setuptools (recomendado)
echo "🔧 Tentando compilação com setuptools..."

if python3 -c "import setuptools" 2>/dev/null; then
    echo "✅ Setuptools disponível"
    
    # Criar setup.py temporário
    cat > setup_temp.py << 'EOF'
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
    description="Motor C de Damas",
    ext_modules=[ext],
    script_args=["build_ext", "--inplace"]
)
EOF

    # Compilar
    if python3 setup_temp.py; then
        echo "✅ Compilação com setuptools bem-sucedida"
        rm setup_temp.py
    else
        echo "❌ Falha na compilação com setuptools"
        rm setup_temp.py
    fi
else
    echo "⚠️ Setuptools não disponível, tentando compilação manual..."
fi

# Método 2: Compilação manual com gcc
echo "🔧 Tentando compilação manual..."

# Encontrar headers do Python
PYTHON_INCLUDE=$(python3 -c "import sysconfig; print(sysconfig.get_path('include'))")
PYTHON_LIB=$(python3 -c "import sysconfig; print(sysconfig.get_path('stdlib'))")

if [ -d "$PYTHON_INCLUDE" ]; then
    echo "✅ Headers Python encontrados: $PYTHON_INCLUDE"
    
    # Compilar
    gcc -shared -fPIC -O3 -march=native -mtune=native \
        -I"$PYTHON_INCLUDE" \
        -I"src/engine" \
        -o "src/python/search_engine.so" \
        src/engine/board_search.c \
        -lpython3.10 2>/dev/null || \
    gcc -shared -fPIC -O3 -march=native -mtune=native \
        -I"$PYTHON_INCLUDE" \
        -I"src/engine" \
        -o "src/python/search_engine.so" \
        src/engine/board_search.c \
        -lpython3 2>/dev/null
    
    if [ -f "src/python/search_engine.so" ]; then
        echo "✅ Compilação manual bem-sucedida"
    else
        echo "❌ Falha na compilação manual"
    fi
else
    echo "❌ Headers Python não encontrados"
fi

# Verificar se a compilação foi bem-sucedida
echo "🔍 Verificando resultado..."

if [ -f "src/python/search_engine.so" ]; then
    echo "✅ Motor C compilado com sucesso!"
    echo "📁 Arquivo: src/python/search_engine.so"
    
    # Testar importação
    if python3 -c "import sys; sys.path.insert(0, 'src/python'); import search_engine; print('✅ Motor C carregado com sucesso')" 2>/dev/null; then
        echo "🎉 Motor C funcionando perfeitamente!"
    else
        echo "⚠️ Motor C compilado mas com problemas na importação"
    fi
else
    echo "❌ Motor C não foi compilado"
    echo "💡 Usando motor Python como fallback"
fi

echo ""
echo "🚀 Para iniciar o servidor:"
echo "   python3 optimized_server.py --port 8081 --pool-size 4"
echo ""
echo "📊 Para testar:"
echo "   curl http://localhost:8081/api/health"
