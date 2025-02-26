const CACHE_NAME = "static-cache-v1";
const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/contact/index.html", // Add all pages you want to cache
    "/base.css",
    "/main.css",
    "/normalize.css",
    "/script.js",
    "/images/pioneer-logo.png",
];

// Install Service Worker & Cache Files
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Pre-caching assets");
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// Activate Service Worker & Remove Old Cache
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log("Deleting old cache:", cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch Requests & Serve from Cache
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
