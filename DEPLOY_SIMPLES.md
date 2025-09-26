# 🚀 Deploy Simples - Firebase Hosting

## Método 1: Script Automático (MAIS FÁCIL)

```bash
# Execute este comando no terminal:
./deploy.sh
```

## Método 2: Comando Direto

```bash
# 1. Fazer login (se necessário)
firebase login

# 2. Fazer deploy
firebase deploy --only hosting
```

## Método 3: Se der erro de autenticação

```bash
# 1. Reautenticar
firebase login --reauth

# 2. Deploy
firebase deploy --only hosting
```

## ✅ Resultado

Após o deploy, seu site será atualizado em:
**https://jogos-js-blaey--jogos-blaey.us-east4.hosted.app/**

## 🔧 Troubleshooting

Se der erro, tente:
1. `firebase logout` e depois `firebase login`
2. Verificar se o projeto está correto: `firebase use jogos-js-blaey`
3. Verificar configuração: `firebase projects:list`
