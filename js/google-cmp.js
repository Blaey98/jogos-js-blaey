// Google CMP (Consent Management Platform) para GDPR
// Implementação para coletar consentimento de usuários no EEE, Reino Unido e Suíça

(function() {
    'use strict';

    // Função para obter consentimento armazenado
    function getStoredConsent() {
        try {
            const stored = localStorage.getItem('userConsent');
            return stored ? JSON.parse(stored) : null;
        } catch (e) {
            return null;
        }
    }

    // Função para salvar consentimento
    function saveConsent(consent) {
        try {
            localStorage.setItem('userConsent', JSON.stringify(consent));
            localStorage.setItem('userConsentDate', new Date().toISOString());
            return true;
        } catch (e) {
            return false;
        }
    }

    // Função para verificar se já existe consentimento
    function hasConsent() {
        const consent = getStoredConsent();
        return consent !== null;
    }

    // Função para mostrar o banner de consentimento
    function showConsentBanner() {
        const banner = document.createElement('div');
        banner.id = 'gdpr-consent-banner';
        banner.innerHTML = `
            <div class="gdpr-banner-content">
                <div class="gdpr-banner-text">
                    <h3>🍪 Uso de Cookies</h3>
                    <p>Utilizamos cookies e tecnologias similares para personalizar conteúdo, 
                    fornecer recursos de mídia social e analisar nosso tráfego. 
                    Também compartilhamos informações sobre seu uso do site com nossos 
                    parceiros de mídia social e análise.</p>
                </div>
                <div class="gdpr-banner-buttons">
                    <button id="gdpr-accept-all" class="gdpr-button gdpr-button-primary">
                        Aceitar Todos
                    </button>
                    <button id="gdpr-manage" class="gdpr-button gdpr-button-secondary">
                        Gerenciar Preferências
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);

        // Adicionar eventos
        document.getElementById('gdpr-accept-all').addEventListener('click', function() {
            acceptAllConsent();
        });

        document.getElementById('gdpr-manage').addEventListener('click', function() {
            showManageDialog();
        });

        // Adicionar animação
        setTimeout(() => {
            banner.classList.add('gdpr-banner-show');
        }, 100);
    }

    // Função para aceitar todos os consentimentos
    function acceptAllConsent() {
        const consent = {
            purposes: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            vendors: ['1'],
            date: new Date().toISOString()
        };
        
        saveConsent(consent);
        hideConsentBanner();
        
        // Notificar que o consentimento foi dado
        if (window.onConsentUpdate) {
            window.onConsentUpdate(consent);
        }
    }

    // Função para gerenciar preferências
    function showManageDialog() {
        const dialog = document.createElement('div');
        dialog.id = 'gdpr-manage-dialog';
        dialog.innerHTML = `
            <div class="gdpr-dialog-overlay">
                <div class="gdpr-dialog-content">
                    <div class="gdpr-dialog-header">
                        <h2>Gerenciar Preferências de Cookies</h2>
                        <button class="gdpr-dialog-close">&times;</button>
                    </div>
                    <div class="gdpr-dialog-body">
                        <div class="gdpr-preference-section">
                            <h3>Cookies Essenciais</h3>
                            <p>Estes cookies são necessários para o funcionamento do site e não podem ser desativados.</p>
                            <label class="gdpr-toggle">
                                <input type="checkbox" checked disabled>
                                <span class="gdpr-toggle-label">Sempre ativados</span>
                            </label>
                        </div>
                        
                        <div class="gdpr-preference-section">
                            <h3>Cookies de Análise</h3>
                            <p>Nos ajudam a entender como os visitantes interagem com o site.</p>
                            <label class="gdpr-toggle">
                                <input type="checkbox" id="pref-analytics" checked>
                                <span class="gdpr-toggle-slider"></span>
                            </label>
                        </div>
                        
                        <div class="gdpr-preference-section">
                            <h3>Cookies de Marketing</h3>
                            <p>Usados para personalizar anúncios e medir a eficácia das campanhas.</p>
                            <label class="gdpr-toggle">
                                <input type="checkbox" id="pref-marketing" checked>
                                <span class="gdpr-toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                    <div class="gdpr-dialog-footer">
                        <button id="gdpr-save-preferences" class="gdpr-button gdpr-button-primary">
                            Salvar Preferências
                        </button>
                        <button id="gdpr-accept-all-dialog" class="gdpr-button gdpr-button-secondary">
                            Aceitar Todos
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(dialog);

        // Eventos
        document.querySelector('.gdpr-dialog-close').addEventListener('click', function() {
            document.getElementById('gdpr-manage-dialog').remove();
        });

        document.getElementById('gdpr-save-preferences').addEventListener('click', function() {
            saveCustomPreferences();
        });

        document.getElementById('gdpr-accept-all-dialog').addEventListener('click', function() {
            acceptAllConsent();
            document.getElementById('gdpr-manage-dialog').remove();
        });

        // Fechar ao clicar fora
        document.querySelector('.gdpr-dialog-overlay').addEventListener('click', function(e) {
            if (e.target === this) {
                document.getElementById('gdpr-manage-dialog').remove();
            }
        });
    }

    // Função para salvar preferências personalizadas
    function saveCustomPreferences() {
        const analytics = document.getElementById('pref-analytics').checked;
        const marketing = document.getElementById('pref-marketing').checked;
        
        const purposes = ['1']; // Sempre essenciais
        
        if (analytics) purposes.push('7'); // Analytics
        if (marketing) purposes.push('4'); // Marketing
        
        const consent = {
            purposes: purposes,
            vendors: ['1'],
            date: new Date().toISOString()
        };
        
        saveConsent(consent);
        hideConsentBanner();
        document.getElementById('gdpr-manage-dialog').remove();
        
        if (window.onConsentUpdate) {
            window.onConsentUpdate(consent);
        }
    }

    // Função para esconder o banner
    function hideConsentBanner() {
        const banner = document.getElementById('gdpr-consent-banner');
        if (banner) {
            banner.classList.remove('gdpr-banner-show');
            banner.classList.add('gdpr-banner-hide');
            setTimeout(() => {
                banner.remove();
            }, 300);
        }
    }

    // Inicializar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        // Verificar se já existe consentimento
        if (!hasConsent()) {
            // Mostrar banner após um pequeno delay
            setTimeout(showConsentBanner, 1000);
        }
    }

    // Exportar funções globais
    window.GDPRCMP = {
        hasConsent: hasConsent,
        getConsent: getStoredConsent,
        showBanner: showConsentBanner,
        showManage: showManageDialog
    };

})();
