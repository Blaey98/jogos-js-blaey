# 🎮 Controles Mobile para Pacman

## 📱 Melhorias Implementadas

### ✅ Biblioteca de Gestos de Toque Avançada
- **Swipe Detection**: Detecção precisa de gestos de deslizar em todas as direções
- **Tap & Double Tap**: Suporte a toques simples e duplos
- **Long Press**: Detecção de pressão longa (600ms)
- **Touch Feedback**: Feedback visual para todos os gestos
- **Cross-Platform**: Funciona em Android, iOS, Windows Mobile, etc.

### ✅ Controles Virtuais
- **D-Pad Virtual**: Controles de direção na tela
- **Botões de Ação**: Botão de espaço/pausa virtual
- **Posicionamento Inteligente**: Controles posicionados para não interferir no jogo
- **Transparência Ajustável**: Controles com opacidade configurável
- **Labels Visuais**: Setas e textos para melhor usabilidade

### ✅ Otimizações Mobile
- **Prevenção de Scroll**: Desabilita scroll acidental durante o jogo
- **Context Menu**: Remove menu de contexto em toques longos
- **Touch Action**: Configuração otimizada para jogos
- **Orientation Change**: Suporte a mudanças de orientação
- **Device Detection**: Detecção automática de dispositivos móveis

## 🚀 Como Usar

### Para Jogadores:
1. **Swipe**: Deslize o dedo na direção desejada (cima, baixo, esquerda, direita)
2. **Tap**: Toque simples para pausar/despausar
3. **Double Tap**: Toque duplo para reiniciar o jogo
4. **Long Press**: Pressione e segure para mostrar/ocultar controles virtuais
5. **Controles Virtuais**: Use os botões na tela quando disponíveis

### Para Desenvolvedores:

#### Inicialização Básica:
```javascript
// Inicializar gestos mobile
const gestures = new MobileGestures(canvas, {
    minSwipeDistance: 25,
    maxSwipeTime: 400,
    doubleTapDelay: 300,
    longPressDelay: 600
});

// Inicializar controles virtuais
const virtualControls = new VirtualControls(canvas, {
    size: 60,
    padding: 15,
    opacity: 0.8,
    showLabels: true
});
```

#### Callbacks de Gestos:
```javascript
// Swipe
gestures.onSwipe(function(data) {
    console.log('Swipe:', data.direction);
    // data.direction: 'up', 'down', 'left', 'right'
});

// Tap
gestures.onTap(function(data) {
    console.log('Tap at:', data.x, data.y);
});

// Double Tap
gestures.onDoubleTap(function(data) {
    console.log('Double tap');
});

// Long Press
gestures.onLongPress(function(data) {
    console.log('Long press');
});
```

#### Controles Virtuais:
```javascript
// Direção
virtualControls.onDirection(function(direction) {
    console.log('Direction:', direction);
});

// Ação
virtualControls.onAction(function(action) {
    console.log('Action:', action);
});
```

## 📁 Arquivos Criados/Modificados

### Novos Arquivos:
- `static/script/mobile-gestures.js` - Biblioteca de gestos de toque
- `static/script/virtual-controls.js` - Controles virtuais
- `test_mobile_controls.html` - Página de teste
- `MOBILE_CONTROLS_README.md` - Esta documentação

### Arquivos Modificados:
- `index_mobile.html` - Integração dos novos controles
- `static/script/index.js` - Integração com o sistema de desenho

## 🔧 Configurações Avançadas

### Parâmetros de Gestos:
```javascript
const gestures = new MobileGestures(canvas, {
    minSwipeDistance: 25,    // Distância mínima para swipe (px)
    maxSwipeTime: 400,      // Tempo máximo para swipe (ms)
    doubleTapDelay: 300,    // Delay para double tap (ms)
    longPressDelay: 600     // Delay para long press (ms)
});
```

### Parâmetros de Controles Virtuais:
```javascript
const virtualControls = new VirtualControls(canvas, {
    size: 60,               // Tamanho dos controles (px)
    padding: 15,             // Padding da tela (px)
    opacity: 0.8,          // Opacidade (0-1)
    showLabels: true       // Mostrar labels/setas
});
```

## 🧪 Teste e Debug

### Página de Teste:
Acesse `test_mobile_controls.html` para testar todos os controles:
- Teste de gestos (swipe, tap, double tap, long press)
- Teste de controles virtuais
- Log em tempo real
- Feedback visual

### Debug no Console:
```javascript
// Verificar se os controles estão ativos
console.log('Gestures:', window.gestures);
console.log('Virtual Controls:', window.virtualControls);

// Testar gestos programaticamente
window.gestures.onSwipe(data => console.log('Swipe:', data));
```

## 📱 Compatibilidade

### Dispositivos Testados:
- ✅ Android (Chrome, Firefox, Samsung Browser)
- ✅ iOS (Safari, Chrome)
- ✅ Windows Mobile (Edge)
- ✅ Desktop (Chrome, Firefox, Safari)

### Recursos Suportados:
- ✅ Touch Events
- ✅ Mouse Events (desktop)
- ✅ Orientation Change
- ✅ Viewport Meta Tags
- ✅ CSS Touch Action
- ✅ Prevent Default

## 🐛 Solução de Problemas

### Problema: Gestos não funcionam
**Solução**: Verificar se `touch-action: none` está aplicado ao canvas

### Problema: Controles virtuais não aparecem
**Solução**: Verificar se `window.virtualControls.isVisible = true`

### Problema: Scroll acidental
**Solução**: Verificar se `preventDefault()` está sendo chamado nos eventos de touch

### Problema: Performance baixa
**Solução**: Reduzir `opacity` dos controles virtuais ou desabilitar `showLabels`

## 🎯 Próximas Melhorias

- [ ] Suporte a gestos multi-toque
- [ ] Vibração haptic feedback
- [ ] Controles personalizáveis
- [ ] Suporte a gamepad
- [ ] Analytics de uso
- [ ] Acessibilidade melhorada

## 📞 Suporte

Para problemas ou sugestões, verifique:
1. Console do navegador para erros
2. Página de teste para funcionalidade básica
3. Configurações de dispositivo
4. Versão do navegador
