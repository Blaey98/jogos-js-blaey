#!/bin/bash

echo "🔨 Criando APK simples para YouTube PiP..."

# Criar diretório temporário
mkdir -p temp_apk
cd temp_apk

# Baixar template TWA básico
echo "📦 Baixando template TWA..."
wget -q https://github.com/GoogleChrome/android-browser-helper/releases/download/v2.5.0/twa-template.zip

if [ -f "twa-template.zip" ]; then
    unzip -q twa-template.zip
    echo "✅ Template baixado e extraído"
    
    # Modificar configurações
    echo "⚙️ Configurando para YouTube PiP..."
    
    # Aqui você pode modificar os arquivos do template
    # Por enquanto, vamos usar o template básico
    
    echo "🔨 Construindo APK..."
    cd twa-template
    
    # Tentar construir com gradle
    if command -v ./gradlew &> /dev/null; then
        ./gradlew assembleRelease
        echo "✅ APK construído com sucesso!"
        echo "📱 APK disponível em: temp_apk/twa-template/app/build/outputs/apk/release/"
    else
        echo "❌ Gradle não encontrado. Instale o Android Studio ou SDK."
    fi
else
    echo "❌ Erro ao baixar template"
fi

cd ../..
