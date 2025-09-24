(function() {
    'use strict';
    console.log('🚀 Carregando integração real do rapid-draughts...');
    
    // Carrega o rapid-draughts real
    function loadScript(src, callback) {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            console.log(`✅ Script ${src} carregado com sucesso.`);
            if (callback) callback();
        };
        script.onerror = (e) => console.error(`❌ Erro ao carregar script ${src}:`, e);
        document.head.appendChild(script);
    }
    
    // Carrega o rapid-draughts real
    loadScript('./rapid-draughts-real.js', () => {
        console.log('✅ rapid-draughts-real.js carregado e exposto no window.');
        
        // Expõe as classes globalmente
        window.EnglishDraughts = window.EnglishDraughts;
        window.EnglishDraughtsComputerFactory = window.EnglishDraughtsComputerFactory;
        
        // Dispara evento de carregamento para que o jogo possa inicializar
        window.dispatchEvent(new CustomEvent('rapidDraughtsLoaded', {
            detail: {
                EnglishDraughts: window.EnglishDraughts,
                EnglishDraughtsComputerFactory: window.EnglishDraughtsComputerFactory
            }
        }));
    });
})();
