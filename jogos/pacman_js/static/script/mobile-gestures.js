/**
 * Mobile Gestures Library for Pacman Game
 * Biblioteca de gestos de toque para jogos mobile
 * Compatível com todos os dispositivos móveis
 */

class MobileGestures {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.options = {
            minSwipeDistance: 30,
            maxSwipeTime: 500,
            doubleTapDelay: 300,
            longPressDelay: 500,
            ...options
        };
        
        this.touchStart = null;
        this.touchEnd = null;
        this.lastTap = 0;
        this.longPressTimer = null;
        this.isLongPress = false;
        
        this.callbacks = {
            swipe: [],
            tap: [],
            doubleTap: [],
            longPress: [],
            touchStart: [],
            touchEnd: [],
            touchMove: []
        };
        
        this.init();
    }
    
    init() {
        // Prevenir zoom e scroll
        this.canvas.style.touchAction = 'none';
        
        // Eventos de toque
        this.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
        this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
        this.canvas.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false });
        this.canvas.addEventListener('touchcancel', this.handleTouchCancel.bind(this), { passive: false });
        
        // Eventos de mouse para desktop
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
        
        // Prevenir context menu
        this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    }
    
    handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        this.touchStart = {
            x: touch.clientX,
            y: touch.clientY,
            time: Date.now()
        };
        
        this.isLongPress = false;
        this.longPressTimer = setTimeout(() => {
            this.isLongPress = true;
            this.triggerCallbacks('longPress', {
                x: this.touchStart.x,
                y: this.touchStart.y,
                duration: Date.now() - this.touchStart.time
            });
        }, this.options.longPressDelay);
        
        this.triggerCallbacks('touchStart', {
            x: this.touchStart.x,
            y: this.touchStart.y
        });
    }
    
    handleTouchMove(e) {
        e.preventDefault();
        if (this.touchStart) {
            const touch = e.touches[0];
            this.triggerCallbacks('touchMove', {
                x: touch.clientX,
                y: touch.clientY,
                startX: this.touchStart.x,
                startY: this.touchStart.y
            });
        }
    }
    
    handleTouchEnd(e) {
        e.preventDefault();
        if (this.longPressTimer) {
            clearTimeout(this.longPressTimer);
            this.longPressTimer = null;
        }
        
        if (!this.touchStart) return;
        
        const touch = e.changedTouches[0];
        this.touchEnd = {
            x: touch.clientX,
            y: touch.clientY,
            time: Date.now()
        };
        
        const deltaX = this.touchEnd.x - this.touchStart.x;
        const deltaY = this.touchEnd.y - this.touchStart.y;
        const deltaTime = this.touchEnd.time - this.touchStart.time;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        this.triggerCallbacks('touchEnd', {
            x: this.touchEnd.x,
            y: this.touchEnd.y,
            deltaX,
            deltaY,
            distance,
            duration: deltaTime
        });
        
        // Detectar tipo de gesto
        if (this.isLongPress) {
            // Long press já foi tratado
        } else if (distance < 10 && deltaTime < this.options.doubleTapDelay) {
            // Tap simples ou duplo
            const now = Date.now();
            if (now - this.lastTap < this.options.doubleTapDelay) {
                this.triggerCallbacks('doubleTap', {
                    x: this.touchEnd.x,
                    y: this.touchEnd.y
                });
                this.lastTap = 0;
            } else {
                this.lastTap = now;
                this.triggerCallbacks('tap', {
                    x: this.touchEnd.x,
                    y: this.touchEnd.y
                });
            }
        } else if (distance > this.options.minSwipeDistance && deltaTime < this.options.maxSwipeTime) {
            // Swipe
            const direction = this.getSwipeDirection(deltaX, deltaY);
            this.triggerCallbacks('swipe', {
                direction,
                deltaX,
                deltaY,
                distance,
                duration: deltaTime
            });
        }
        
        this.touchStart = null;
        this.touchEnd = null;
    }
    
    handleTouchCancel(e) {
        e.preventDefault();
        if (this.longPressTimer) {
            clearTimeout(this.longPressTimer);
            this.longPressTimer = null;
        }
        this.touchStart = null;
        this.touchEnd = null;
    }
    
    // Eventos de mouse para desktop
    handleMouseDown(e) {
        e.preventDefault();
        this.touchStart = {
            x: e.clientX,
            y: e.clientY,
            time: Date.now()
        };
        this.triggerCallbacks('touchStart', {
            x: this.touchStart.x,
            y: this.touchStart.y
        });
    }
    
    handleMouseMove(e) {
        if (this.touchStart) {
            this.triggerCallbacks('touchMove', {
                x: e.clientX,
                y: e.clientY,
                startX: this.touchStart.x,
                startY: this.touchStart.y
            });
        }
    }
    
    handleMouseUp(e) {
        e.preventDefault();
        if (!this.touchStart) return;
        
        this.touchEnd = {
            x: e.clientX,
            y: e.clientY,
            time: Date.now()
        };
        
        const deltaX = this.touchEnd.x - this.touchStart.x;
        const deltaY = this.touchEnd.y - this.touchStart.y;
        const deltaTime = this.touchEnd.time - this.touchStart.time;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        this.triggerCallbacks('touchEnd', {
            x: this.touchEnd.x,
            y: this.touchEnd.y,
            deltaX,
            deltaY,
            distance,
            duration: deltaTime
        });
        
        if (distance < 10 && deltaTime < this.options.doubleTapDelay) {
            const now = Date.now();
            if (now - this.lastTap < this.options.doubleTapDelay) {
                this.triggerCallbacks('doubleTap', {
                    x: this.touchEnd.x,
                    y: this.touchEnd.y
                });
                this.lastTap = 0;
            } else {
                this.lastTap = now;
                this.triggerCallbacks('tap', {
                    x: this.touchEnd.x,
                    y: this.touchEnd.y
                });
            }
        } else if (distance > this.options.minSwipeDistance && deltaTime < this.options.maxSwipeTime) {
            const direction = this.getSwipeDirection(deltaX, deltaY);
            this.triggerCallbacks('swipe', {
                direction,
                deltaX,
                deltaY,
                distance,
                duration: deltaTime
            });
        }
        
        this.touchStart = null;
        this.touchEnd = null;
    }
    
    getSwipeDirection(deltaX, deltaY) {
        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);
        
        if (absX > absY) {
            return deltaX > 0 ? 'right' : 'left';
        } else {
            return deltaY > 0 ? 'down' : 'up';
        }
    }
    
    triggerCallbacks(eventType, data) {
        this.callbacks[eventType].forEach(callback => {
            try {
                callback(data);
            } catch (error) {
                console.error('Error in gesture callback:', error);
            }
        });
    }
    
    // Métodos para registrar callbacks
    onSwipe(callback) {
        this.callbacks.swipe.push(callback);
    }
    
    onTap(callback) {
        this.callbacks.tap.push(callback);
    }
    
    onDoubleTap(callback) {
        this.callbacks.doubleTap.push(callback);
    }
    
    onLongPress(callback) {
        this.callbacks.longPress.push(callback);
    }
    
    onTouchStart(callback) {
        this.callbacks.touchStart.push(callback);
    }
    
    onTouchEnd(callback) {
        this.callbacks.touchEnd.push(callback);
    }
    
    onTouchMove(callback) {
        this.callbacks.touchMove.push(callback);
    }
    
    // Método para limpar callbacks
    removeAllCallbacks() {
        Object.keys(this.callbacks).forEach(key => {
            this.callbacks[key] = [];
        });
    }
    
    // Método para destruir a instância
    destroy() {
        this.canvas.removeEventListener('touchstart', this.handleTouchStart);
        this.canvas.removeEventListener('touchmove', this.handleTouchMove);
        this.canvas.removeEventListener('touchend', this.handleTouchEnd);
        this.canvas.removeEventListener('touchcancel', this.handleTouchCancel);
        this.canvas.removeEventListener('mousedown', this.handleMouseDown);
        this.canvas.removeEventListener('mousemove', this.handleMouseMove);
        this.canvas.removeEventListener('mouseup', this.handleMouseUp);
        
        if (this.longPressTimer) {
            clearTimeout(this.longPressTimer);
        }
        
        this.removeAllCallbacks();
    }
}

// Exportar para uso global
window.MobileGestures = MobileGestures;
