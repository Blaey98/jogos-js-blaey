// Service Worker para PWA - jogos-js-blaey
const CACHE_NAME = 'jogos-pwa-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/jogos/pacman_js/index_mobile.html',
  '/manifest.json',
  '/css/mobile-first.css',
  '/jogos/pacman_js/static/script/game.js',
  '/jogos/pacman_js/static/script/index.js',
  '/jogos/pacman_js/static/script/mobile-gestures.js',
  '/jogos/pacman_js/static/script/virtual-controls.js',
  '/jogos/pacman_js/static/font/PressStart2P.ttf'
];

// Install - Cache inicial
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('✅ Service Worker: Files cached');
        return cache.addAll(urlsToCache);
      })
      .catch((err) => {
        console.error('❌ Service Worker: Cache failed', err);
      })
  );
  self.skipWaiting(); // Ativar imediatamente
});

// Activate - Limpar caches antigos
self.addEventListener('activate', (event) => {
  console.log('🔄 Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); // Tomar controle imediatamente
});

// Fetch - Estratégia Cache First
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Cache hit - retornar do cache
        if (cachedResponse) {
          console.log('📦 Cache hit:', event.request.url);
          return cachedResponse;
        }
        
        // Cache miss - buscar da rede
        console.log('🌐 Network fetch:', event.request.url);
        return fetch(event.request)
          .then((response) => {
            // Verificar se resposta é válida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clonar resposta para cache
            const responseToCache = response.clone();
            
            // Adicionar ao cache
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          });
      })
      .catch(() => {
        // Fallback se offline e não em cache
        if (event.request.destination === 'document') {
          return caches.match('/');
        }
      })
  );
});

// Background Sync (para futuras features)
self.addEventListener('sync', (event) => {
  console.log('🔄 Background Sync:', event.tag);
});
