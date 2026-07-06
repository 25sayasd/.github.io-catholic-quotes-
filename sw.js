// Catholic Daily Virtue - Service Worker
// Provides offline support, caching, and background updates

const CACHE_NAME = 'catholic-virtue-v1';
const RUNTIME_CACHE = 'catholic-virtue-runtime';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/manifest.json',
    '/sw.js'
];

// ============================================
// Install Event - Cache essential files
// ============================================
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => {
                self.skipWaiting(); // Activate immediately
            })
    );
});

// ============================================
// Activate Event - Clean up old caches
// ============================================
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                self.clients.claim(); // Take control immediately
            })
    );
});

// ============================================
// Fetch Event - Serve from cache, update in background
// ============================================
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Only cache GET requests
    if (request.method !== 'GET') {
        return;
    }

    // External API calls - network first, fallback to offline
    if (url.hostname === 'api.anthropic.com') {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    // Cache successful responses
                    if (response.ok) {
                        const clonedResponse = response.clone();
                        caches.open(RUNTIME_CACHE).then((cache) => {
                            cache.put(request, clonedResponse);
                        });
                    }
                    return response;
                })
                .catch(() => {
                    // Return cached response if available
                    return caches.match(request)
                        .then((cachedResponse) => {
                            if (cachedResponse) {
                                return cachedResponse;
                            }
                            // If no cache, return offline page
                            return new Response(
                                'You appear to be offline. Please check your internet connection.',
                                { status: 503, statusText: 'Service Unavailable' }
                            );
                        });
                });
        );
        return;
    }

    // Static assets - cache first strategy
    if (request.method === 'GET' && (
        url.pathname.endsWith('.css') ||
        url.pathname.endsWith('.js') ||
        url.pathname.endsWith('.json') ||
        url.pathname.endsWith('.svg') ||
        url.pathname.endsWith('.png') ||
        url.pathname.endsWith('.jpg') ||
        url.pathname.endsWith('.jpeg') ||
        url.pathname.endsWith('.gif') ||
        url.pathname.endsWith('.webp') ||
        url.pathname.endsWith('.woff') ||
        url.pathname.endsWith('.woff2')
    )) {
        event.respondWith(
            caches.match(request)
                .then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    return fetch(request)
                        .then((response) => {
                            if (!response || response.status !== 200 || response.type === 'error') {
                                return response;
                            }
                            const clonedResponse = response.clone();
                            caches.open(RUNTIME_CACHE).then((cache) => {
                                cache.put(request, clonedResponse);
                            });
                            return response;
                        });
                })
        );
        return;
    }

    // HTML and other requests - network first, fallback to cache
    event.respondWith(
        fetch(request)
            .then((response) => {
                if (!response || response.status !== 200 || response.type === 'error') {
                    return response;
                }
                const clonedResponse = response.clone();
                caches.open(RUNTIME_CACHE).then((cache) => {
                    cache.put(request, clonedResponse);
                });
                return response;
            })
            .catch(() => {
                return caches.match(request)
                    .then((cachedResponse) => {
                        if (cachedResponse) {
                            return cachedResponse;
                        }
                        return new Response(
                            '<!DOCTYPE html><html><head><title>Offline</title></head><body style="font-family: system-ui; padding: 20px; text-align: center;"><h1>You\'re Offline</h1><p>Please check your internet connection to access this page.</p></body></html>',
                            { status: 503, headers: { 'Content-Type': 'text/html' } }
                        );
                    });
            })
    );
});

// ============================================
// Background Sync for future notifications
// ============================================
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-quotes') {
        event.waitUntil(syncQuotes());
    }
});

async function syncQuotes() {
    try {
        const response = await fetch('/quotes-data');
        const quotes = await response.json();
        const cache = await caches.open(RUNTIME_CACHE);
        await cache.put('/quotes-data', new Response(JSON.stringify(quotes)));
    } catch (error) {
        console.error('Failed to sync quotes:', error);
    }
}

// ============================================
// Push Notifications (Optional - for future use)
// ============================================
self.addEventListener('push', (event) => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.quote || 'New daily verse available',
            icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect fill="%231a1a2e" width="192" height="192"/><text x="50%" y="50%" font-size="120" fill="%23d4af37" text-anchor="middle" dominant-baseline="middle" font-family="serif">✝</text></svg>',
            badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><text x="50%" y="50%" font-size="120" fill="%23d4af37" text-anchor="middle" dominant-baseline="middle" font-family="serif">✝</text></svg>',
            tag: 'daily-quote',
            requireInteraction: false,
            actions: [
                {
                    action: 'open',
                    title: 'View Quote'
                }
            ]
        };

        event.waitUntil(
            self.registration.showNotification('Catholic Daily Virtue', options)
        );
    }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' })
            .then((clientList) => {
                // Check if app is already open
                for (let client of clientList) {
                    if (client.url === '/' && 'focus' in client) {
                        return client.focus();
                    }
                }
                // If not open, open it
                if (clients.openWindow) {
                    return clients.openWindow('/');
                }
            })
    );
});

// ============================================
// Message Handler for client communication
// ============================================
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CLEAR_CACHE') {
        caches.delete(RUNTIME_CACHE).then(() => {
            event.ports[0].postMessage({ success: true });
        });
    }
});
