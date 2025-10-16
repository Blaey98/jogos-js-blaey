# 📢 Como Adicionar Banner 320x100

## 📍 Localização do Banner

O espaço para o banner está localizado na página **jogos-verticais.html** na parte superior, logo após o cabeçalho.

## 🎯 Posição Exata

```html
<div class="banner-ad">
    <!-- Espaço reservado para banner 320x100 -->
</div>
```

## 📐 Especificações

- **Dimensões**: 320px (largura) x 100px (altura)
- **Posição**: Centralizado na parte superior da página
- **Estilo**: Borda tracejada cinza com fundo claro
- **Responsivo**: Adapta-se para mobile mantendo as proporções

## 🔧 Como Adicionar seu Banner

### Opção 1: Imagem
```html
<div class="banner-ad">
    <img src="caminho/para/seu/banner.jpg" alt="Banner" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
</div>
```

### Opção 2: Link com Imagem
```html
<div class="banner-ad">
    <a href="https://seu-link.com" target="_blank">
        <img src="caminho/para/seu/banner.jpg" alt="Banner" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
    </a>
</div>
```

### Opção 3: HTML Personalizado
```html
<div class="banner-ad">
    <!-- Seu conteúdo HTML personalizado aqui -->
    <div style="width: 100%; height: 100%; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
        SEU BANNER AQUI
    </div>
</div>
```

## 🎨 Estilos CSS Disponíveis

O banner já possui os seguintes estilos aplicados:

```css
.banner-ad {
    width: 320px;
    height: 100px;
    margin: 0 auto 30px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}
```

## 📱 Responsividade

O banner se adapta automaticamente para dispositivos móveis:

```css
@media (max-width: 768px) {
    .banner-ad {
        width: 100%;
        max-width: 320px;
    }
}
```

## ✅ Checklist

- [ ] Banner tem exatamente 320x100 pixels
- [ ] Imagem está otimizada para web
- [ ] Link funciona corretamente (se aplicável)
- [ ] Banner é responsivo em mobile
- [ ] Alt text está definido (acessibilidade)

## 🔗 Links para Testar

Após adicionar o banner, teste em:
- **Desktop**: http://localhost:3000/jogos-verticais.html
- **Mobile**: Use as ferramentas de desenvolvedor do navegador

---

**💡 Dica**: Mantenha o arquivo de backup antes de fazer alterações!
