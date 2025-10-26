// YouTube Shared JavaScript - Funcionalidades compartilhadas entre os módulos

// Configuração da API do YouTube
const YOUTUBE_API_KEY = 'AIzaSyD1jmhxA0IpnT61WWsm2wQijCC8PVpIgkU';
const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Sistema de fallback para quando API falha
let apiFallbackMode = false;
let fallbackVideos = [];

// Vídeos de fallback quando API não funciona
const FALLBACK_VIDEOS = [
    {
        videoId: 'dQw4w9WgXcQ',
        title: 'Rick Astley - Never Gonna Give You Up',
        channelTitle: 'Rick Astley',
        publishedAt: '2009-10-25T06:57:33Z',
        viewCount: '1000000000',
        description: 'The official video for "Never Gonna Give You Up" by Rick Astley'
    },
    {
        videoId: 'jNQXAC9IVRw',
        title: 'Me at the zoo',
        channelTitle: 'jawed',
        publishedAt: '2005-04-23T20:57:33Z',
        viewCount: '200000000',
        description: 'The first video ever uploaded to YouTube'
    },
    {
        videoId: 'kJQP7kiw5Fk',
        title: 'Luis Fonsi - Despacito ft. Daddy Yankee',
        channelTitle: 'Luis Fonsi',
        publishedAt: '2017-01-13T04:00:00Z',
        viewCount: '8000000000',
        description: 'Despacito - Luis Fonsi ft. Daddy Yankee'
    },
    {
        videoId: '9bZkp7q19f0',
        title: 'PSY - GANGNAM STYLE',
        channelTitle: 'officialpsy',
        publishedAt: '2012-07-15T07:00:00Z',
        viewCount: '4000000000',
        description: 'PSY - GANGNAM STYLE'
    },
    {
        videoId: 'YQHsXMglC9A',
        title: 'Adele - Hello',
        channelTitle: 'AdeleVEVO',
        publishedAt: '2015-10-23T07:00:00Z',
        viewCount: '3000000000',
        description: 'Adele - Hello'
    }
];

// Cache para melhorar performance
const videoCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

// Estado da aplicação
let currentVideos = [];
let searchHistory = [];
let currentVideo = null;
let pipPlayer = null;
let videoDuration = 0;
let currentTime = 0;
let timeUpdateInterval = null;
let videoStartTime = 0;
let isVideoPlaying = true;

// Função para verificar cache
function getCachedData(key) {
    const cached = videoCache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        console.log(`📦 Cache hit para: ${key}`);
        return cached.data;
    }
    return null;
}

// Função para salvar no cache
function setCachedData(key, data) {
    videoCache.set(key, {
        data: data,
        timestamp: Date.now()
    });
    console.log(`💾 Cache salvo para: ${key}`);
}

// Classe para representar um vídeo do YouTube
class YouTubeVideo {
    constructor(data) {
        this.id = data.id?.videoId || data.id;
        this.title = data.snippet?.title || data.title;
        this.channelTitle = data.snippet?.channelTitle || data.channelTitle;
        this.publishedAt = data.snippet?.publishedAt || data.publishedAt;
        this.description = data.snippet?.description || data.description;
        this.thumbnail = data.snippet?.thumbnails?.medium?.url || 
                        data.thumbnail || 
                        `https://img.youtube.com/vi/${this.id}/mqdefault.jpg`;
        this.viewCount = data.statistics?.viewCount || data.viewCount || '0';
        this.duration = data.contentDetails?.duration || data.duration || 'PT0S';
        this.url = `https://www.youtube.com/watch?v=${this.id}`;
        this.embedUrl = `https://www.youtube.com/embed/${this.id}`;
    }
}

// Função para formatar duração
function formatDuration(duration) {
    if (!duration || duration === 'PT0S') return '0:00';
    
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return '0:00';
    
    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;
    
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Função para formatar contagem de visualizações
function formatViewCount(viewCount) {
    if (!viewCount) return '0 visualizações';
    
    const count = parseInt(viewCount);
    if (count >= 1000000000) {
        return `${(count / 1000000000).toFixed(1)}B visualizações`;
    } else if (count >= 1000000) {
        return `${(count / 1000000).toFixed(1)}M visualizações`;
    } else if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}K visualizações`;
    } else {
        return `${count} visualizações`;
    }
}

// Função para formatar data
function formatDate(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'há 1 dia';
    if (diffDays < 7) return `há ${diffDays} dias`;
    if (diffDays < 30) return `há ${Math.ceil(diffDays / 7)} semanas`;
    if (diffDays < 365) return `há ${Math.ceil(diffDays / 30)} meses`;
    return `há ${Math.ceil(diffDays / 365)} anos`;
}

// Função para formatar tempo
function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
}

// Função para mostrar notificação
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    if (!notification) return;
    
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Função para mostrar loading
function showLoading() {
    const loadingState = document.getElementById('loadingState');
    const errorState = document.getElementById('errorState');
    const videoGrid = document.getElementById('videoGrid');
    
    if (loadingState) loadingState.style.display = 'flex';
    if (errorState) errorState.style.display = 'none';
    if (videoGrid) videoGrid.style.display = 'none';
}

// Função para esconder loading
function hideLoading() {
    const loadingState = document.getElementById('loadingState');
    const videoGrid = document.getElementById('videoGrid');
    
    if (loadingState) loadingState.style.display = 'none';
    if (videoGrid) videoGrid.style.display = 'grid';
}

// Função para mostrar erro
function showError(message) {
    const loadingState = document.getElementById('loadingState');
    const errorState = document.getElementById('errorState');
    const errorMessage = document.getElementById('errorMessage');
    const videoGrid = document.getElementById('videoGrid');
    
    if (loadingState) loadingState.style.display = 'none';
    if (errorState) errorState.style.display = 'block';
    if (errorMessage) errorMessage.textContent = message;
    if (videoGrid) videoGrid.style.display = 'none';
}

// Função para carregar histórico de pesquisa
function loadSearchHistory() {
    try {
        const saved = localStorage.getItem('youtubeSearchHistory');
        if (saved) {
            searchHistory = JSON.parse(saved);
            displaySearchHistory();
        }
    } catch (e) {
        console.error('Erro ao carregar histórico:', e);
        searchHistory = [];
    }
}

// Função para salvar no histórico de pesquisa
async function saveToSearchHistory(query) {
    if (!query || query.trim() === '') return;
    
    const trimmedQuery = query.trim();
    
    // Remove duplicatas
    searchHistory = searchHistory.filter(item => item !== trimmedQuery);
    
    // Adiciona no início
    searchHistory.unshift(trimmedQuery);
    
    // Limita a 10 itens
    searchHistory = searchHistory.slice(0, 10);
    
    // Salva no localStorage
    try {
        localStorage.setItem('youtubeSearchHistory', JSON.stringify(searchHistory));
        displaySearchHistory();
    } catch (e) {
        console.error('Erro ao salvar histórico:', e);
    }
}

// Função para exibir histórico de pesquisa
function displaySearchHistory() {
    const searchHistoryContainer = document.getElementById('searchHistory');
    if (!searchHistoryContainer) return;
    
    if (searchHistory.length === 0) {
        searchHistoryContainer.innerHTML = '';
        return;
    }
    
    searchHistoryContainer.innerHTML = searchHistory
        .map(query => `<a href="#" class="history-item" onclick="searchFromHistory('${query}')">${query}</a>`)
        .join('');
}

// Função para pesquisar a partir do histórico
function searchFromHistory(query) {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = query;
        performSearch();
    }
}

// Função para usar vídeos de fallback
function useFallbackVideos(query) {
    console.log('🔄 [Fallback] Usando vídeos de fallback para:', query);
    
    // Filtrar vídeos de fallback baseado na query (busca simples)
    const filteredVideos = FALLBACK_VIDEOS.filter(video => 
        video.title.toLowerCase().includes(query.toLowerCase()) ||
        video.channelTitle.toLowerCase().includes(query.toLowerCase()) ||
        video.description.toLowerCase().includes(query.toLowerCase())
    );
    
    // Se não encontrar nada, usar todos os vídeos de fallback
    const videosToShow = filteredVideos.length > 0 ? filteredVideos : FALLBACK_VIDEOS;
    
    // Converter para formato esperado
    currentVideos = videosToShow.map(video => ({
        videoId: video.videoId,
        title: video.title,
        channelTitle: video.channelTitle,
        publishedAt: video.publishedAt,
        description: video.description,
        thumbnail: `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`,
        viewCount: video.viewCount,
        duration: 'PT3M30S' // Duração padrão
    }));
    
    displayVideos(currentVideos);
    hideLoading();
    showNotification('⚠️ Modo offline ativado - vídeos limitados', 'warning');
}

// Função para exibir vídeos
function displayVideos(videos) {
    const videoGrid = document.getElementById('videoGrid');
    if (!videoGrid) return;
    
    if (!videos || videos.length === 0) {
        videoGrid.innerHTML = '<div class="error"><p>Nenhum vídeo encontrado</p></div>';
        return;
    }
    
    videoGrid.innerHTML = videos.map(video => `
        <div class="video-card" onclick="openVideo('${video.id || video.videoId}')">
            <div class="video-thumbnail">
                <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
                <div class="video-duration">${formatDuration(video.duration)}</div>
            </div>
            <div class="video-info">
                <h3 class="video-title">${video.title}</h3>
                <p class="video-channel">${video.channelTitle}</p>
                <p class="video-meta">${formatViewCount(video.viewCount)} • ${formatDate(video.publishedAt)}</p>
            </div>
        </div>
    `).join('');
}

// Função para abrir vídeo
function openVideo(videoId) {
    const video = currentVideos.find(v => v.id === videoId || v.videoId === videoId);
    if (video) {
        currentVideo = video;
        
        // Navegar para a página de reprodução
        const currentPage = window.location.pathname;
        if (currentPage.includes('youtube-search.html')) {
            window.location.href = `youtube-play.html?id=${videoId}`;
        } else {
            // Se já estiver na página de reprodução, apenas atualizar
            loadVideoInModal(video);
        }
    }
}

// Função para carregar vídeo no modal
function loadVideoInModal(video) {
    const videoModal = document.getElementById('videoModal');
    const youtubePlayer = document.getElementById('youtubePlayer');
    const youtubeVideoTitle = document.getElementById('youtubeVideoTitle');
    const youtubeViews = document.getElementById('youtubeViews');
    const youtubeDate = document.getElementById('youtubeDate');
    const youtubeChannelName = document.getElementById('youtubeChannelName');
    const youtubeDescription = document.getElementById('youtubeDescription');
    
    if (videoModal) {
        videoModal.classList.add('active');
    }
    
    if (youtubePlayer) {
        youtubePlayer.src = video.embedUrl + '?autoplay=1&enablejsapi=1';
    }
    
    if (youtubeVideoTitle) {
        youtubeVideoTitle.textContent = video.title;
    }
    
    if (youtubeViews) {
        youtubeViews.textContent = formatViewCount(video.viewCount);
    }
    
    if (youtubeDate) {
        youtubeDate.textContent = formatDate(video.publishedAt);
    }
    
    if (youtubeChannelName) {
        youtubeChannelName.textContent = video.channelTitle;
    }
    
    if (youtubeDescription) {
        youtubeDescription.textContent = video.description || 'Descrição não disponível';
    }
}

// Função para fechar modal
function closeModal() {
    const videoModal = document.getElementById('videoModal');
    const youtubePlayer = document.getElementById('youtubePlayer');
    
    if (videoModal) {
        videoModal.classList.remove('active');
    }
    
    if (youtubePlayer) {
        youtubePlayer.src = '';
    }
}

// Função para retry search
function retrySearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput && searchInput.value.trim()) {
        performSearch();
    }
}

// Função para ativar PiP
function activatePiP(video) {
    const pipWindow = document.getElementById('pipWindow');
    const pipVideoContainer = document.getElementById('pipVideoContainer');
    
    if (!pipWindow || !pipVideoContainer) return;
    
    // Criar iframe do YouTube
    const iframe = document.createElement('iframe');
    iframe.src = video.embedUrl + '?autoplay=1&enablejsapi=1&controls=0&modestbranding=1&rel=0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    
    // Limpar container e adicionar iframe
    pipVideoContainer.innerHTML = '';
    pipVideoContainer.appendChild(iframe);
    
    // Ativar janela PiP
    pipWindow.classList.add('active', 'pip-global');
    
    // Salvar referência do player
    pipPlayer = iframe;
    
    showNotification('🎬 Janela flutuante ativada!', 'success');
}

// Função para fechar PiP
function closePiP() {
    const pipWindow = document.getElementById('pipWindow');
    const pipVideoContainer = document.getElementById('pipVideoContainer');
    
    if (pipWindow) {
        pipWindow.classList.remove('active', 'pip-global');
    }
    
    if (pipVideoContainer) {
        pipVideoContainer.innerHTML = '';
    }
    
    if (pipPlayer) {
        pipPlayer = null;
    }
    
    // Limpar localStorage
    localStorage.removeItem('globalPipVideo');
    localStorage.removeItem('globalPipActive');
    
    // Notificar outras janelas
    window.postMessage({
        type: 'GLOBAL_PIP_DEACTIVATED'
    }, '*');
    
    showNotification('🎬 Janela flutuante fechada', 'success');
}

// Função para toggle play/pause no PiP
function togglePiPPlayback() {
    if (pipPlayer) {
        // Enviar comando para o iframe do YouTube
        pipPlayer.contentWindow.postMessage('{"event":"command","func":"togglePlayback"}', '*');
        isVideoPlaying = !isVideoPlaying;
        
        // Atualizar ícone
        const playIcon = document.getElementById('playIconBottom');
        const pauseIcon = document.getElementById('pauseIconBottom');
        
        if (playIcon && pauseIcon) {
            if (isVideoPlaying) {
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
            } else {
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
            }
        }
    }
}

// Função para minimizar PiP
function minimizePiP() {
    const pipWindow = document.getElementById('pipWindow');
    if (pipWindow) {
        pipWindow.style.width = '200px';
        pipWindow.style.height = '113px';
    }
}

// Função para maximizar PiP
function maximizePiP() {
    const pipWindow = document.getElementById('pipWindow');
    if (pipWindow) {
        pipWindow.style.width = '400px';
        pipWindow.style.height = '225px';
    }
}

// Função para atualizar barra de progresso
function updateProgressBar(percentage) {
    const pipProgressBar = document.getElementById('pipProgressBar');
    const pipProgressHandle = document.getElementById('pipProgressHandle');
    
    if (pipProgressBar) {
        pipProgressBar.style.width = `${percentage}%`;
    }
    
    if (pipProgressHandle) {
        pipProgressHandle.style.left = `${percentage}%`;
    }
}

// Função para atualizar display de tempo
function updateTimeDisplay(time) {
    const pipTimeDisplay = document.getElementById('pipTimeDisplay');
    if (pipTimeDisplay) {
        pipTimeDisplay.textContent = formatTime(time);
    }
}

// Função para buscar vídeo
function seekVideo(event) {
    if (!pipPlayer || !videoDuration) return;
    
    const pipProgressContainer = document.getElementById('pipProgressContainer');
    if (!pipProgressContainer) return;
    
    const rect = pipProgressContainer.getBoundingClientRect();
    const percentage = (event.clientX - rect.left) / rect.width;
    const newTime = percentage * videoDuration;
    
    // Enviar comando para o iframe do YouTube
    pipPlayer.contentWindow.postMessage(`{"event":"command","func":"seekTo","args":[${newTime}]}`, '*');
}

// Função para iniciar arrastar progresso
function startProgressDrag(event) {
    event.preventDefault();
    
    const handleDrag = (e) => {
        seekVideo(e);
    };
    
    const stopDrag = () => {
        document.removeEventListener('mousemove', handleDrag);
        document.removeEventListener('mouseup', stopDrag);
    };
    
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', stopDrag);
}

// Listener para mensagens do iframe do YouTube
window.addEventListener('message', function(event) {
    if (event.origin !== 'https://www.youtube.com') return;
    
    try {
        const data = JSON.parse(event.data);
        
        // Receber duração do vídeo
        if (data.info && data.info.duration) {
            videoDuration = data.info.duration;
            console.log(`🎬 [YouTube] Duração do vídeo: ${videoDuration}s (${formatTime(videoDuration)})`);
        }
        
        // Receber tempo atual do vídeo
        if (data.info && data.info.currentTime !== undefined) {
            currentTime = data.info.currentTime;
            const percentage = videoDuration > 0 ? (currentTime / videoDuration) * 100 : 0;
            updateProgressBar(percentage);
            updateTimeDisplay(currentTime);
        }
        
        // Receber dados do vídeo
        if (data.info && data.info.videoData) {
            if (data.info.videoData.duration) {
                videoDuration = data.info.videoData.duration;
                console.log(`🎬 [YouTube] Duração via videoData: ${videoDuration}s (${formatTime(videoDuration)})`);
            }
        }
        
    } catch (e) {
        // Ignorar erros de parsing
    }
});

// Listener para mensagens globais do sistema PIP
window.addEventListener('message', function(event) {
    if (event.data.type === 'GLOBAL_PIP_ACTIVATED') {
        // Se outra página ativou a PIP global, ativa localmente também
        if (event.data.videoData) {
            activatePiP(event.data.videoData);
        }
    } else if (event.data.type === 'GLOBAL_PIP_DEACTIVATED') {
        // Se outra página desativou a PIP global, desativa localmente também
        const pipWindow = document.getElementById('pipWindow');
        if (pipWindow) {
            pipWindow.classList.remove('active');
        }
    } else if (event.data.type === 'TOGGLE_PLAY_PAUSE') {
        // Comando da janela PIP principal para play/pause
        console.log('🎬 [YouTube] Comando de play/pause recebido da janela PIP principal');
        togglePiPPlayback();
    }
});

// Verifica se há uma PIP ativa no localStorage ao carregar
window.addEventListener('load', function() {
    const isPipActive = localStorage.getItem('globalPipActive');
    const pipVideoData = localStorage.getItem('globalPipVideo');
    
    if (isPipActive === 'true' && pipVideoData) {
        try {
            const videoData = JSON.parse(pipVideoData);
            // Verifica se os dados não são muito antigos (5 minutos)
            if (Date.now() - videoData.timestamp < 300000) {
                activatePiP(videoData);
            }
        } catch (e) {
            console.error('Erro ao carregar dados da PIP:', e);
        }
    }
});

// Encerrar vídeo quando sair da página
window.addEventListener('beforeunload', function() {
    if (pipPlayer) {
        const pipWindow = document.getElementById('pipWindow');
        if (pipWindow && pipWindow.classList.contains('active')) {
            closePiP();
        }
    }
});

// Encerrar vídeo quando a página perder foco (opcional)
document.addEventListener('visibilitychange', function() {
    if (document.hidden && pipPlayer) {
        const pipWindow = document.getElementById('pipWindow');
        if (pipWindow && pipWindow.classList.contains('active')) {
            // Opcional: pausar quando a página perder foco
            // closePiP();
        }
    }
});
