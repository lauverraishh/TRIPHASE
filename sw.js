const CACHE = "triphase-offline-v1";
const offlineFallbackPage = "offline.html";

// On install, cache the offline page
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.add(offlineFallbackPage))
  );
});

// If the network fails, show the offline page
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.open(CACHE).then((cache) => cache.match(offlineFallbackPage));
      })
    );
  }
});
