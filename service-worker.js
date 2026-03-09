const CACHE_NAME = 'quantum-apex-cache-v1';
const urlsToCache = [
  '/Quantum-Apex-Investments/',              // index.html
  '/Quantum-Apex-Investments/index.html',
  '/Quantum-Apex-Investments/icons/icon-152.png',
  '/Quantum-Apex-Investments/icons/icon-192.png',
  '/Quantum-Apex-Investments/icons/icon-512.png',
  '/Quantum-Apex-Investments/icons/splash.png',
  '/Quantum-Apex-Investments/manifest.json',
  '/Quantum-Apex-Investments/style.css',      // if you have external CSS
  '/Quantum-Apex-Investments/script.js'       // if you have external JS
];

// Install event - caching files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching app assets...');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Removing old cache:', cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch event - serve cached assets first
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
