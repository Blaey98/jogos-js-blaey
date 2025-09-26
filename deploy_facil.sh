#!/bin/bash

echo "🚀 DEPLOY FÁCIL - Firebase Hosting"
echo "================================="

# Passo 1: Reautenticar
echo "1️⃣ Reautenticando no Firebase..."
firebase login --reauth --no-localhost

# Passo 2: Deploy
echo "2️⃣ Fazendo deploy..."
firebase deploy --only hosting

echo "✅ Pronto! Seu site foi atualizado!"
echo "🌐 Acesse: https://jogos-js-blaey--jogos-blaey.us-east4.hosted.app/"
