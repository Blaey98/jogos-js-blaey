// Integração Real do Rapid-Draughts
// Carrega a biblioteca simplificada e funcional

(function() {
    'use strict';
    
    console.log('🚀 Carregando integração do rapid-draughts...');
    
    // Carrega o rapid-draughts simplificado
    function loadRapidDraughts() {
        return new Promise((resolve, reject) => {
            // Verifica se já está carregado
            if (typeof window.EnglishDraughts !== 'undefined' && 
                typeof window.EnglishDraughtsComputerFactory !== 'undefined') {
                console.log('✅ Rapid-draughts já carregado!');
                resolve(true);
                return;
            }
            
            console.log('📦 Carregando rapid-draughts simplificado...');
            
            // Cria script tag para carregar o módulo
            const script = document.createElement('script');
            script.src = './rapid-draughts-simple-fixed.js';
            script.type = 'text/javascript';
            
            script.onload = () => {
                console.log('✅ Rapid-draughts simplificado carregado!');
                console.log('🔧 EnglishDraughts:', typeof window.EnglishDraughts);
                console.log('🔧 EnglishDraughtsComputerFactory:', typeof window.EnglishDraughtsComputerFactory);
                resolve(true);
            };
            
            script.onerror = (error) => {
                console.error('❌ Erro ao carregar rapid-draughts:', error);
                reject(error);
            };
            
            document.head.appendChild(script);
        });
    }
    
    // Tenta carregar imediatamente
    loadRapidDraughts().then(success => {
        if (success) {
            console.log('✅ Rapid-draughts carregado com sucesso!');
        }
    }).catch(error => {
        console.error('❌ Erro ao carregar rapid-draughts:', error);
        
        // Fallback: tenta novamente após 1 segundo
        setTimeout(() => {
            console.log('🔄 Tentando carregar rapid-draughts novamente...');
            loadRapidDraughts();
        }, 1000);
    });
    
    // Fallback para carregamento assíncrono
    let attempts = 0;
    const maxAttempts = 20;
    
    const checkLibrary = () => {
        if (typeof window.EnglishDraughts !== 'undefined' && 
            typeof window.EnglishDraughtsComputerFactory !== 'undefined') {
            console.log('✅ Biblioteca rapid-draughts carregada!');
            return true;
        }
        return false;
    };
    
    const interval = setInterval(() => {
        attempts++;
        if (checkLibrary() || attempts >= maxAttempts) {
            clearInterval(interval);
            if (attempts >= maxAttempts) {
                console.error('❌ Timeout ao carregar rapid-draughts');
            }
        }
    }, 500);
    
    console.log('📚 Integração do rapid-draughts iniciada');
})();