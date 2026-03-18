// ================================================================
//  VoiceAuthentix — Service Worker
//  Enables PWA offline support and caching
// ================================================================

const CACHE_NAME = "voiceauthentix-v1";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];

// ── Install: cache static assets ─────────────────────────────────
self.addEventListener("install", (event) => {
  console.log("[SW] Installing VoiceAuthentix Service Worker...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[SW] Caching static assets");
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// ── Activate: clean old caches ───────────────────────────────────
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating VoiceAuthentix Service Worker...");
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log("[SW] Deleting old cache:", name);
            return caches.delete(name);
          })
      )
    )
  );
  self.clients.claim();
});

// ── Fetch: serve from cache, fallback to network ─────────────────
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Always fetch API requests from network (never cache)
  if (url.pathname.startsWith("/api/") || url.hostname !== location.hostname) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response(
          JSON.stringify({ error: "Backend offline. Start python main.py on your laptop." }),
          { headers: { "Content-Type": "application/json" } }
        );
      })
    );
    return;
  }

  // Serve static assets from cache first
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      });
    })
  );
});

// ── Push Notifications (for FAKE detection alerts) ───────────────
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "VoiceAuthentix Alert";
  const options = {
    body: data.body || "Deepfake detected!",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/icon-72x72.png",
    vibrate: [200, 100, 200],
    data: { url: data.url || "/" },
    actions: [
      { action: "view", title: "View Details" },
      { action: "dismiss", title: "Dismiss" },
    ],
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  if (event.action === "view") {
    event.waitUntil(clients.openWindow(event.notification.data.url));
  }
});
