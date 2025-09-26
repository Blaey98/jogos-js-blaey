#!/bin/bash

echo "🚀 Iniciando deploy para Firebase Hosting..."

# Verificar se está logado
echo "📋 Verificando autenticação..."
firebase projects:list > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "❌ Não está logado no Firebase. Execute: firebase login"
    exit 1
fi

echo "✅ Autenticado no Firebase"

# Fazer deploy
echo "🔄 Fazendo deploy..."
firebase deploy --only hosting

if [ $? -eq 0 ]; then
    echo "✅ Deploy concluído com sucesso!"
    echo "🌐 Seu site está atualizado em: https://jogos-js-blaey--jogos-blaey.us-east4.hosted.app/"
else
    echo "❌ Erro no deploy. Verifique os logs acima."
fi
