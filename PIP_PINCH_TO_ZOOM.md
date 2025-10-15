# 🎮 PiP Pinch-to-Zoom - Controle com Pinça dos Dedos

## ✨ Implementação do Pinch-to-Zoom Mobile

### 🎯 **Objetivo Alcançado**
- ✅ **Pinch-to-zoom**: Aumentar/diminuir PiP com pinça dos dedos
- ✅ **Touch dragging**: Arrastar PiP com um dedo
- ✅ **Aspect ratio mantido**: Sempre 16:9 durante o zoom
- ✅ **Limites inteligentes**: Respeita tamanhos mínimos e máximos
- ✅ **Experiência mobile**: Otimizado para dispositivos touch

### 🔧 **Implementação Técnica**

#### **1. Variáveis de Controle**
```javascript
// Pinch-to-zoom variables
let isPinching = false;
let initialDistance = 0;
let initialWidth = 0;
let initialHeight = 0;
let initialAspectRatio = 16 / 9;
```

#### **2. Funções de Cálculo**
```javascript
// Função para calcular distância entre dois toques
function getDistance(touch1, touch2) {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

// Função para calcular o centro entre dois toques
function getCenter(touch1, touch2) {
    return {
        x: (touch1.clientX + touch2.clientX) / 2,
        y: (touch1.clientY + touch2.clientY) / 2
    };
}
```

#### **3. Event Listeners Touch**
```javascript
// Touch events para pinch-to-zoom
pipDragOverlay.addEventListener('touchstart', touchStart, { passive: false });
document.addEventListener('touchmove', touchMove, { passive: false });
document.addEventListener('touchend', touchEnd, { passive: false });
```

#### **4. Função touchStart**
```javascript
function touchStart(e) {
    e.preventDefault();
    
    if (e.touches.length === 2) {
        // Pinch gesture
        isPinching = true;
        isDragging = false;
        
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        
        initialDistance = getDistance(touch1, touch2);
        initialWidth = pipWindow.offsetWidth;
        initialHeight = pipWindow.offsetHeight;
        
        // Calcular aspect ratio atual
        initialAspectRatio = initialWidth / initialHeight;
    } else if (e.touches.length === 1) {
        // Single touch - start dragging
        const touch = e.touches[0];
        
        // Não arrastar se tocar nos botões ou controles
        if (touch.target.closest('.pip-close-button') ||
            touch.target.closest('.pip-size-button') ||
            touch.target.closest('.pip-size-controls') ||
            touch.target.closest('.pip-play-button-bottom') ||
            touch.target.closest('.pip-controls-bottom') ||
            touch.target.closest('.pip-progress-container') ||
            touch.target.closest('.pip-progress-handle')) {
            return;
        }
        
        isDragging = true;
        isPinching = false;
        
        initialX = touch.clientX - xOffset;
        initialY = touch.clientY - yOffset;
    }
}
```

#### **5. Função touchMove**
```javascript
function touchMove(e) {
    e.preventDefault();
    
    if (e.touches.length === 2 && isPinching) {
        // Pinch gesture
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        
        const currentDistance = getDistance(touch1, touch2);
        const scale = currentDistance / initialDistance;
        
        // Calcular novo tamanho mantendo aspect ratio
        const newWidth = initialWidth * scale;
        const newHeight = newWidth / initialAspectRatio;
        
        // Limites mínimos e máximos
        const minWidth = 240;
        const minHeight = 135;
        const maxWidth = Math.min(window.innerWidth - 20, 800);
        const maxHeight = Math.min(window.innerHeight - 100, 600);
        
        if (newWidth >= minWidth && newWidth <= maxWidth && 
            newHeight >= minHeight && newHeight <= maxHeight) {
            
            pipWindow.style.width = newWidth + 'px';
            pipWindow.style.height = newHeight + 'px';
            
            // Ajustar o iframe
            if (pipPlayer) {
                pipPlayer.style.width = '100%';
                pipPlayer.style.height = '100%';
            }
        }
    } else if (e.touches.length === 1 && isDragging) {
        // Single touch - continue dragging
        const touch = e.touches[0];
        
        currentX = touch.clientX - initialX;
        currentY = touch.clientY - initialY;
        
        xOffset = currentX;
        yOffset = currentY;
        
        // Limitar movimento dentro da tela
        const maxX = window.innerWidth - pipWindow.offsetWidth;
        const maxY = window.innerHeight - pipWindow.offsetHeight;
        
        xOffset = Math.max(0, Math.min(xOffset, maxX));
        yOffset = Math.max(0, Math.min(yOffset, maxY));
        
        pipWindow.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`;
        
        // Adicionar sombra durante o arrasto
        pipWindow.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.4), 0 6px 20px rgba(0, 0, 0, 0.3)';
    }
}
```

#### **6. Função touchEnd**
```javascript
function touchEnd(e) {
    e.preventDefault();
    
    if (e.touches.length === 0) {
        isDragging = false;
        isPinching = false;
        
        // Restaurar sombra
        pipWindow.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(0, 0, 0, 0.2)';
    }
}
```

### 🎨 **Funcionalidades Implementadas**

#### **Pinch-to-Zoom (2 dedos)**
- ✅ **Aumentar**: Afastar os dedos para aumentar a PiP
- ✅ **Diminuir**: Aproximar os dedos para diminuir a PiP
- ✅ **Aspect ratio mantido**: Sempre 16:9 durante o zoom
- ✅ **Limites respeitados**: Tamanhos mínimos e máximos
- ✅ **Smooth scaling**: Zoom suave e responsivo

#### **Touch Dragging (1 dedo)**
- ✅ **Arrastar**: Mover a PiP com um dedo
- ✅ **Limites de tela**: Não sai da área visível
- ✅ **Controles protegidos**: Não arrasta ao tocar nos botões
- ✅ **Feedback visual**: Sombra durante o arrasto

### 🎯 **Limites e Validações**

#### **Tamanhos Mínimos**
```javascript
const minWidth = 240;
const minHeight = 135;
```

#### **Tamanhos Máximos**
```javascript
const maxWidth = Math.min(window.innerWidth - 20, 800);
const maxHeight = Math.min(window.innerHeight - 100, 600);
```

#### **Validação de Limites**
```javascript
if (newWidth >= minWidth && newWidth <= maxWidth && 
    newHeight >= minHeight && newHeight <= maxHeight) {
    // Aplicar novo tamanho
}
```

### 📱 **Experiência Mobile**

#### **Gestos Suportados**
- ✅ **Pinch**: 2 dedos para zoom
- ✅ **Drag**: 1 dedo para arrastar
- ✅ **Tap**: 1 dedo para tocar nos controles
- ✅ **Multi-touch**: Suporte completo

#### **Controles Protegidos**
- ✅ **Botão fechar**: Não arrasta ao tocar
- ✅ **Botões de tamanho**: Não arrasta ao tocar
- ✅ **Botão play/pause**: Não arrasta ao tocar
- ✅ **Barra de progresso**: Não arrasta ao tocar
- ✅ **Display de tempo**: Não arrasta ao tocar

### 🎮 **Como Funciona**

#### **Pinch-to-Zoom**
1. **Dois dedos**: Detecta quando há 2 toques
2. **Distância inicial**: Calcula distância entre os dedos
3. **Movimento**: Calcula nova distância durante o movimento
4. **Escala**: Calcula fator de escala (nova distância / distância inicial)
5. **Novo tamanho**: Aplica escala mantendo aspect ratio 16:9
6. **Limites**: Verifica se está dentro dos limites permitidos
7. **Aplicação**: Atualiza tamanho da PiP e iframe

#### **Touch Dragging**
1. **Um dedo**: Detecta quando há 1 toque
2. **Posição inicial**: Armazena posição inicial do toque
3. **Movimento**: Calcula nova posição durante o movimento
4. **Limites**: Verifica se está dentro da tela
5. **Aplicação**: Atualiza posição da PiP

### 🚀 **Como Testar**

#### **Funcionalidades Básicas**
1. **Acesse**: `http://localhost:8000/youtube-pip.html`
2. **Pesquise** um vídeo
3. **Clique** em um vídeo
4. **Escolha** "Janela PiP com Controles"

#### **Teste de Pinch-to-Zoom**
1. **Coloque 2 dedos** na PiP
2. **Afastar os dedos**: PiP deve aumentar
3. **Aproximar os dedos**: PiP deve diminuir
4. **Verifique** que mantém aspect ratio 16:9
5. **Teste** os limites mínimos e máximos
6. **Confirme** que o vídeo se ajusta ao tamanho

#### **Teste de Touch Dragging**
1. **Coloque 1 dedo** na PiP
2. **Arraste**: PiP deve se mover
3. **Teste** os limites da tela
4. **Toque** nos controles para verificar proteção
5. **Confirme** que não arrasta ao tocar nos botões

#### **Teste Mobile**
1. **Teste** em dispositivo móvel
2. **Verifique** responsividade dos gestos
3. **Confirme** que funciona em diferentes tamanhos de tela
4. **Teste** em orientação portrait e landscape
5. **Verifique** a usabilidade

### 🎬 **Resultado**

A janela PiP agora tem **pinch-to-zoom** completo com:
- ✅ **Pinch-to-zoom**: Aumentar/diminuir com 2 dedos
- ✅ **Touch dragging**: Arrastar com 1 dedo
- ✅ **Aspect ratio mantido**: Sempre 16:9
- ✅ **Limites inteligentes**: Respeita tamanhos mínimos/máximos
- ✅ **Controles protegidos**: Não interfere com botões
- ✅ **Experiência mobile**: Otimizado para touch
- ✅ **Gestos suaves**: Responsivo e fluido
- ✅ **Multi-touch**: Suporte completo

**Perfeita para controle intuitivo em dispositivos móveis!** 🎮✨
