# 🚀 Configuração de Deploy Automático - Firebase Hosting + GitHub Actions

## Passo 1: Gerar Service Account do Firebase

1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Selecione o projeto `jogos-js-blaey`
3. Vá em **Project Settings** (ícone de engrenagem)
4. Clique na aba **Service accounts**
5. Clique em **Generate new private key**
6. Baixe o arquivo JSON (guarde com segurança!)

## Passo 2: Configurar Secrets no GitHub

1. Acesse seu repositório no GitHub
2. Vá em **Settings** → **Secrets and variables** → **Actions**
3. Clique em **New repository secret**
4. Nome: `FIREBASE_SERVICE_ACCOUNT_JOGOS_JS_BLAEY`
5. Valor: Cole todo o conteúdo do arquivo JSON baixado no Passo 1

## Passo 3: Verificar Configuração do Firebase

Certifique-se de que os arquivos estão corretos:

- ✅ `.firebaserc` - contém o projectId correto
- ✅ `firebase.json` - configuração do hosting
- ✅ `.github/workflows/firebase-hosting-deploy.yml` - workflow criado

## Passo 4: Testar o Deploy

1. Faça um commit e push para a branch `main`
2. Vá em **Actions** no GitHub para ver o workflow rodando
3. Aguarde a conclusão do deploy
4. Acesse o site para verificar se foi atualizado

## Comandos Úteis

```bash
# Verificar status do Firebase
firebase projects:list

# Fazer deploy manual (se necessário)
firebase deploy --only hosting

# Ver logs do Firebase
firebase hosting:channel:list
```

## Troubleshooting

- Se o deploy falhar, verifique os logs em **Actions** → **Deploy to Firebase Hosting**
- Certifique-se de que o Service Account tem permissões de **Firebase Hosting Admin**
- Verifique se o projectId no workflow está correto
