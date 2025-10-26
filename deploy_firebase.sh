#!/bin/bash

# Script para deploy no Firebase Hosting
echo "🚀 Iniciando deploy para Firebase Hosting..."

# Verificar se Firebase CLI está instalado
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI não encontrado. Instalando..."
    npm install -g firebase-tools
fi

# Verificar se está logado
if ! firebase projects:list &> /dev/null; then
    echo "🔐 Fazendo login no Firebase..."
    firebase login
fi

# Verificar se o projeto está configurado
if [ ! -f ".firebaserc" ]; then
    echo "⚙️ Configurando projeto Firebase..."
    echo "Digite o ID do seu projeto Firebase:"
    read project_id
    firebase use $project_id
fi

# Fazer deploy
echo "📦 Fazendo deploy..."
firebase deploy --only hosting

echo "✅ Deploy concluído!"
echo "🌐 Seu site está disponível em: https://$(firebase projects:list | grep $(firebase use | grep 'Now using project' | cut -d' ' -f4) | cut -d' ' -f1).web.app"
