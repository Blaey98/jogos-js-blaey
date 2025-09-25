// Sistema de Navegação - Blaey Games
// Adiciona botão "Voltar ao Portal" em todos os jogos

class GameNavigation {
    constructor() {
        this.init();
    }

    init() {
        // Verificar se estamos em um jogo (não na página principal)
        if (this.isInGame()) {
            this.addNavigationButton();
        }
    }

    isInGame() {
        // Verificar se estamos dentro de uma pasta de jogo
        const path = window.location.pathname;
        return path.includes('/jogos/') && !path.endsWith('/');
    }

    addNavigationButton() {
        // Criar botão de navegação
        const navButton = document.createElement('div');
        navButton.id = 'game-nav-button';
        navButton.innerHTML = `
            <a href="/" class="nav-link">
                <span class="nav-icon">🏠</span>
                <span class="nav-text">Voltar ao Portal</span>
            </a>
        `;

        // Adicionar estilos
        const style = document.createElement('style');
        style.textContent = `
            #game-nav-button {
                position: fixed;
                top: 20px;
                left: 20px;
                z-index: 9999;
                background: rgba(0, 0, 0, 0.8);
                border-radius: 25px;
                padding: 10px 20px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                transition: all 0.3s ease;
            }

            #game-nav-button:hover {
                background: rgba(0, 0, 0, 0.9);
                transform: scale(1.05);
            }

            .nav-link {
                color: white;
                text-decoration: none;
                display: flex;
                align-items: center;
                gap: 8px;
                font-family: Arial, sans-serif;
                font-size: 14px;
                font-weight: bold;
            }

            .nav-icon {
                font-size: 16px;
            }

            .nav-text {
                white-space: nowrap;
            }

            @media (max-width: 768px) {
                #game-nav-button {
                    top: 10px;
                    left: 10px;
                    padding: 8px 16px;
                }

                .nav-link {
                    font-size: 12px;
                }

                .nav-text {
                    display: none;
                }
            }
        `;

        // Adicionar ao DOM
        document.head.appendChild(style);
        document.body.appendChild(navButton);
    }

    // Método para remover o botão (se necessário)
    removeNavigationButton() {
        const button = document.getElementById('game-nav-button');
        if (button) {
            button.remove();
        }
    }
}

// Inicializar navegação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new GameNavigation();
});

// Exportar para uso em outros arquivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameNavigation;
}
