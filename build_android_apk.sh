#!/bin/bash

echo "🚀 Construindo APK Android com PiP Global..."

# Navegar para o diretório Android
cd android_native_pip

# Verificar se o Gradle está disponível
if ! command -v ./gradlew &> /dev/null; then
    echo "❌ Gradle wrapper não encontrado. Inicializando..."
    gradle wrapper
fi

# Limpar build anterior
echo "🧹 Limpando build anterior..."
./gradlew clean

# Construir APK
echo "🔨 Construindo APK..."
./gradlew assembleRelease

# Verificar se o build foi bem-sucedido
if [ $? -eq 0 ]; then
    echo "✅ APK construído com sucesso!"
    echo "📱 APK disponível em: android_native_pip/app/build/outputs/apk/release/app-release.apk"
    
    # Copiar APK para o diretório raiz
    cp app/build/outputs/apk/release/app-release.apk ../youtube-pip-global.apk
    echo "📱 APK copiado para: youtube-pip-global.apk"
    
    echo ""
    echo "🎯 Para instalar:"
    echo "   adb install youtube-pip-global.apk"
    echo ""
    echo "🎯 Para testar:"
    echo "   1. Instale o APK no seu dispositivo Android"
    echo "   2. Abra o app"
    echo "   3. Conceda permissões de sobreposição quando solicitado"
    echo "   4. Teste o PiP - ele deve funcionar em todas as telas!"
    
else
    echo "❌ Erro ao construir APK"
    exit 1
fi

# Voltar ao diretório raiz
cd ..