/**
 * Virtual Controls for Mobile Games
 * Controles virtuais para jogos mobile
 * D-pad e botões de ação
 */

class VirtualControls {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.options = {
            size: 80,
            padding: 20,
            opacity: 0.7,
            showLabels: true,
            ...options
        };
        
        this.controls = {
            dPad: null,
            actionButtons: []
        };
        
        this.callbacks = {
            direction: [],
            action: []
        };
        
        this.isVisible = true;
        this.init();
    }
    
    init() {
        this.createDPad();
        this.createActionButtons();
        this.setupEventListeners();
    }
    
    createDPad() {
        const size = this.options.size;
        const padding = this.options.padding;
        
        // Posição do D-pad (canto inferior esquerdo)
        const x = padding + size;
        const y = this.canvas.height - padding - size;
        
        this.controls.dPad = {
            center: { x, y },
            size: size,
            buttons: {
                up: {
                    x: x,
                    y: y - size/2,
                    width: size * 0.6,
                    height: size * 0.4,
                    direction: 'up'
                },
                down: {
                    x: x,
                    y: y + size/2,
                    width: size * 0.6,
                    height: size * 0.4,
                    direction: 'down'
                },
                left: {
                    x: x - size/2,
                    y: y,
                    width: size * 0.4,
                    height: size * 0.6,
                    direction: 'left'
                },
                right: {
                    x: x + size/2,
                    y: y,
                    width: size * 0.4,
                    height: size * 0.6,
                    direction: 'right'
                }
            }
        };
    }
    
    createActionButtons() {
        const size = this.options.size;
        const padding = this.options.padding;
        
        // Botão de ação (canto inferior direito)
        const x = this.canvas.width - padding - size;
        const y = this.canvas.height - padding - size;
        
        this.controls.actionButtons = [
            {
                x: x,
                y: y,
                size: size,
                label: 'SPACE',
                action: 'space'
            }
        ];
    }
    
    setupEventListeners() {
        // Eventos de toque
        this.canvas.addEventListener('touchstart', this.handleTouch.bind(this));
        this.canvas.addEventListener('touchend', this.handleTouchEnd.bind(this));
        this.canvas.addEventListener('touchcancel', this.handleTouchEnd.bind(this));
        
        // Eventos de mouse para desktop
        this.canvas.addEventListener('mousedown', this.handleMouse.bind(this));
        this.canvas.addEventListener('mouseup', this.handleMouseEnd.bind(this));
    }
    
    handleTouch(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        this.checkTouch(x, y);
    }
    
    handleTouchEnd(e) {
        e.preventDefault();
        this.clearActiveDirection();
    }
    
    handleMouse(e) {
        e.preventDefault();
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.checkTouch(x, y);
    }
    
    handleMouseEnd(e) {
        e.preventDefault();
        this.clearActiveDirection();
    }
    
    checkTouch(x, y) {
        // Verificar D-pad
        if (this.controls.dPad) {
            Object.values(this.controls.dPad.buttons).forEach(button => {
                if (this.isPointInButton(x, y, button)) {
                    this.triggerDirection(button.direction);
                    return;
                }
            });
        }
        
        // Verificar botões de ação
        this.controls.actionButtons.forEach(button => {
            if (this.isPointInCircle(x, y, button.x, button.y, button.size/2)) {
                this.triggerAction(button.action);
                return;
            }
        });
    }
    
    isPointInButton(x, y, button) {
        return x >= button.x - button.width/2 &&
               x <= button.x + button.width/2 &&
               y >= button.y - button.height/2 &&
               y <= button.y + button.height/2;
    }
    
    isPointInCircle(x, y, centerX, centerY, radius) {
        const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
        return distance <= radius;
    }
    
    triggerDirection(direction) {
        this.triggerCallbacks('direction', direction);
    }
    
    triggerAction(action) {
        this.triggerCallbacks('action', action);
    }
    
    clearActiveDirection() {
        // Implementar feedback visual se necessário
    }
    
    triggerCallbacks(eventType, data) {
        this.callbacks[eventType].forEach(callback => {
            try {
                callback(data);
            } catch (error) {
                console.error('Error in virtual control callback:', error);
            }
        });
    }
    
    // Métodos para registrar callbacks
    onDirection(callback) {
        this.callbacks.direction.push(callback);
    }
    
    onAction(callback) {
        this.callbacks.action.push(callback);
    }
    
    // Método para desenhar os controles
    draw(context) {
        // Verificar se estamos na tela de game over ou vitória
        if (window.game && window.game.getCurrentStage) {
            const currentStage = window.game.getCurrentStage();
            if (currentStage !== 0) { // Só mostrar no jogo principal (stage 0)
                return;
            }
        }
        
        if (!this.isVisible) return;
        
        context.save();
        context.globalAlpha = this.options.opacity;
        
        this.drawDPad(context);
        this.drawActionButtons(context);
        
        context.restore();
    }
    
    drawDPad(context) {
        if (!this.controls.dPad) return;
        
        const { center, size, buttons } = this.controls.dPad;
        
        // Desenhar círculo central
        context.fillStyle = '#333';
        context.strokeStyle = '#666';
        context.lineWidth = 2;
        context.beginPath();
        context.arc(center.x, center.y, size * 0.3, 0, Math.PI * 2);
        context.fill();
        context.stroke();
        
        // Desenhar botões de direção
        Object.values(buttons).forEach(button => {
            this.drawDirectionButton(context, button);
        });
    }
    
    drawDirectionButton(context, button) {
        context.fillStyle = '#555';
        context.strokeStyle = '#777';
        context.lineWidth = 2;
        
        context.beginPath();
        context.rect(
            button.x - button.width/2,
            button.y - button.height/2,
            button.width,
            button.height
        );
        context.fill();
        context.stroke();
        
        // Desenhar seta
        if (this.options.showLabels) {
            context.fillStyle = '#fff';
            context.font = 'bold 12px Arial';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            
            let arrow = '';
            switch (button.direction) {
                case 'up': arrow = '↑'; break;
                case 'down': arrow = '↓'; break;
                case 'left': arrow = '←'; break;
                case 'right': arrow = '→'; break;
            }
            
            context.fillText(arrow, button.x, button.y);
        }
    }
    
    drawActionButtons(context) {
        this.controls.actionButtons.forEach(button => {
            context.fillStyle = '#4CAF50';
            context.strokeStyle = '#45a049';
            context.lineWidth = 2;
            
            context.beginPath();
            context.arc(button.x, button.y, button.size/2, 0, Math.PI * 2);
            context.fill();
            context.stroke();
            
            if (this.options.showLabels) {
                context.fillStyle = '#fff';
                context.font = 'bold 10px Arial';
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillText(button.label, button.x, button.y);
            }
        });
    }
    
    // Métodos de controle
    show() {
        this.isVisible = true;
    }
    
    hide() {
        this.isVisible = false;
    }
    
    toggle() {
        this.isVisible = !this.isVisible;
    }
    
    // Método para destruir
    destroy() {
        this.canvas.removeEventListener('touchstart', this.handleTouch);
        this.canvas.removeEventListener('touchend', this.handleTouchEnd);
        this.canvas.removeEventListener('touchcancel', this.handleTouchEnd);
        this.canvas.removeEventListener('mousedown', this.handleMouse);
        this.canvas.removeEventListener('mouseup', this.handleMouseEnd);
        
        this.callbacks.direction = [];
        this.callbacks.action = [];
    }
}

// Exportar para uso global
window.VirtualControls = VirtualControls;
