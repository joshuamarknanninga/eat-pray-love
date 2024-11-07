// frontend/public/service-worker.js
/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'eat-pray-love-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/static/js/bundle.js',
    // Add other assets and routes you want to cache
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
    );
});
