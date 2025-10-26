# Como Encontrar o Ad Slot no Google AdSense

## 📝 Passo a Passo

### 1. Acesse o Google AdSense
- Vá para: https://adsense.google.com
- Faça login com sua conta

### 2. Vá para a seção de Anúncios
- No menu lateral, clique em **"Ads"** ou **"Anúncios"**
- Clique em **"By ad unit"** ou **"Por unidade de anúncio"**

### 3. Crie uma Nova Unidade de Anúncio
- Clique no botão **"+ New ad unit"** ou **"+ Nova unidade de anúncio"**
- Preencha os dados:
  - **Name (Nome):** Ex: "Banner Pacman 320x100"
  - **Ad size (Tamanho):** Selecione "320x100" ou "Responsive"
  - Escolha o tamanho desejado

### 4. Copie o Código Gerado
Após criar a unidade, o AdSense mostrará um código como:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7154773731438541"
     crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:inline-block;width:320px;height:100px"
     data-ad-client="ca-pub-7154773731438541"
     data-ad-slot="1234567890"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

### 5. Localize o Ad Slot
No código acima, o Ad Slot é o número após `data-ad-slot=`:
- **data-ad-slot="1234567890"** ← Este é o seu Ad Slot!

### 6. Alternativa: Visualizar Código Existente
Se você já tem unidades criadas:
1. Vá em **"Ads"** > **"By ad unit"**
2. Clique na unidade de anúncio
3. Clique em **"Get code"** ou **"Obter código"**
4. O Ad Slot aparecerá no código

## 📊 Exemplo Completo para o Pacman

### Primeiro, adicione o script no `<head>`:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7154773731438541"
     crossorigin="anonymous"></script>
```

### Depois, substitua o banner placeholder por:
```html
<div class="banner-ad">
    <ins class="adsbygoogle"
         style="display:inline-block;width:320px;height:100px"
         data-ad-client="ca-pub-7154773731438541"
         data-ad-slot="SEU_AD_SLOT_AQUI"></ins>
    <script>
         (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
</div>
```

## ⚠️ Importante
- **Ad Slot**: Número único de identificação da unidade de anúncio
- **Ad Client**: Já configurado (`ca-pub-7154773731438541`)
- **Tamanho**: 320x100px para o banner do Pacman

## 🔍 Dicas
1. Crie unidades específicas por jogo para melhor controle
2. Use nomes descritivos: "Banner Pacman Top", "Banner Chess Side"
3. Teste diferentes tamanhos para ver qual performa melhor
4. Monitore as estatísticas no AdSense Dashboard

## 📱 Layout Responsivo
Para o banner ser responsivo, use:
```html
<style>
    .banner-ad ins {
        display: block;
        width: 100%;
        max-width: 320px;
        height: 100px;
    }
</style>
```

## 🎯 Próximos Passos
1. Crie a unidade no AdSense
2. Copie o Ad Slot
3. Substitua "SEU_AD_SLOT_AQUI" no código
4. Faça deploy do arquivo atualizado
5. Aguarde a aprovação dos anúncios (pode levar alguns minutos a horas)
