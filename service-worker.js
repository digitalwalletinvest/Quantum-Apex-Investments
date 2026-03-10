const CACHE_NAME = "quantum-apex-cache-v1";

const urlsToCache = [
  "/Quantum-Apex-Investments/",
  "/Quantum-Apex-Investments/index.html",
  "/Quantum-Apex-Investments/login.html",
  "/Quantum-Apex-Investments/register.html",
  "/Quantum-Apex-Investments/manifest.json",

  "/Quantum-Apex-Investments/icons/icon-72.png",
  "/Quantum-Apex-Investments/icons/icon-96.png",
  "/Quantum-Apex-Investments/icons/icon-128.png",
  "/Quantum-Apex-Investments/icons/icon-144.png",
  "/Quantum-Apex-Investments/icons/icon-152.png",
  "/Quantum-Apex-Investments/icons/icon-192.png",
  "/Quantum-Apex-Investments/icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
