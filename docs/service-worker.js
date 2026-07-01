const CACHE_PREFIX = "gajiworks-static-";
const CACHE_NAME = `${CACHE_PREFIX}v3`;
const CORE_ASSETS = [
    "./styles.css?v=1.0.2",
    "./site.js?v=1.0.2",
    "./gajiworks-logo.ico",
    "./images/gajiworks-logo.png"
];
const CACHEABLE_DESTINATIONS = new Set(["style", "script", "font", "image"]);

self.addEventListener("install", event => {
    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS)));
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys
                .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
                .map(key => caches.delete(key))
        ))
    );
    self.clients.claim();
});

self.addEventListener("fetch", event => {
    const request = event.request;
    const url = new URL(request.url);

    if (request.method !== "GET" || url.origin !== self.location.origin || !CACHEABLE_DESTINATIONS.has(request.destination)) {
        return;
    }

    event.respondWith(
        caches.match(request).then(cachedResponse => {
            if (cachedResponse) return cachedResponse;

            return fetch(request).then(networkResponse => {
                if (!networkResponse.ok) return networkResponse;

                const responseToCache = networkResponse.clone();
                return caches.open(CACHE_NAME)
                    .then(cache => cache.put(request, responseToCache))
                    .then(() => networkResponse);
            });
        })
    );
});
