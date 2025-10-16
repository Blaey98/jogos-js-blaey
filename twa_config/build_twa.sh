#!/bin/bash

# Script para construir TWA com Bubblewrap
echo "🔨 Construindo TWA com Bubblewrap..."

# Verificar se Bubblewrap está instalado
if ! command -v bubblewrap &> /dev/null; then
    echo "📦 Instalando Bubblewrap..."
    npm install -g @bubblewrap/cli
fi

# Navegar para diretório de configuração
cd twa_config

# Inicializar projeto TWA se não existir
if [ ! -d "android" ]; then
    echo "🚀 Inicializando projeto TWA..."
    bubblewrap init --manifest=./twa-manifest.json
fi

# Construir APK
echo "🔨 Construindo APK..."
bubblewrap build

echo "✅ TWA construído com sucesso!"
echo "📱 APK disponível em: twa_config/android/app-release.apk"
echo ""
echo "📋 Próximos passos:"
echo "1. Instale o APK no seu dispositivo Android"
echo "2. Teste o PiP nativo"
echo "3. Publique na Google Play Store se necessário"
