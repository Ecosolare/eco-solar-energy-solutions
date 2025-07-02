const CACHE_NAME = 'eco-solar-v1.0.0';
const OFFLINE_URL = '/offline.html';

// Essential files to cache
const CACHE_URLS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/favicon.svg',
  // Add other critical assets here
];

// Install event - cache essential resources
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching essential files');
        return cache.addAll(CACHE_URLS);
      })
      .then(() => {
        console.log('Service Worker: Skip waiting');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Claiming clients');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip Chrome extension requests
  if (event.request.url.startsWith('chrome-extension://')) {
    return;
  }

  // Skip requests with no-cache headers
  if (event.request.headers.get('cache-control') === 'no-cache') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version if available
        if (response) {
          console.log('Service Worker: Serving from cache', event.request.url);
          return response;
        }

        // Otherwise fetch from network
        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response for caching
            const responseToCache = response.clone();

            // Cache successful responses
            caches.open(CACHE_NAME)
              .then((cache) => {
                // Only cache GET requests for same origin
                if (event.request.url.startsWith(self.location.origin)) {
                  console.log('Service Worker: Caching new resource', event.request.url);
                  cache.put(event.request, responseToCache);
                }
              });

            return response;
          })
          .catch(() => {
            // Network failed - try to serve offline page for navigation requests
            if (event.request.mode === 'navigate') {
              console.log('Service Worker: Serving offline page');
              return caches.match(OFFLINE_URL);
            }
            
            // For other requests, just let them fail
            throw new Error('Network unavailable');
          });
      })
  );
});

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered', event.tag);
  
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForms());
  }
  
  if (event.tag === 'energy-data-sync') {
    event.waitUntil(syncEnergyData());
  }
});

// Push notification handling
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push message received');
  
  const options = {
    body: event.data ? event.data.text() : 'New update from Eco Solar Energy Solutions',
    icon: '/favicon.svg',
    badge: '/favicon.svg',
    tag: 'eco-solar-notification',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '1'
    },
    actions: [
      {
        action: 'explore',
        title: 'View Details',
        icon: '/icon-action-view.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icon-action-close.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Eco Solar Energy Solutions', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification click received');
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      self.clients.openWindow('/')
    );
  } else if (event.action === 'close') {
    // Just close the notification
    return;
  } else {
    // Default action - open the app
    event.waitUntil(
      self.clients.openWindow('/')
    );
  }
});

// Helper functions for background sync
async function syncContactForms() {
  try {
    // Get pending form submissions from IndexedDB
    const pendingForms = await getPendingContactForms();
    
    for (const form of pendingForms) {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form.data)
        });
        
        if (response.ok) {
          await removePendingContactForm(form.id);
          console.log('Service Worker: Successfully synced contact form', form.id);
        }
      } catch (error) {
        console.error('Service Worker: Failed to sync contact form', form.id, error);
      }
    }
  } catch (error) {
    console.error('Service Worker: Error during contact form sync', error);
  }
}

async function syncEnergyData() {
  try {
    const response = await fetch('/api/energy-data');
    if (response.ok) {
      const data = await response.json();
      await cacheEnergyData(data);
      console.log('Service Worker: Successfully synced energy data');
    }
  } catch (error) {
    console.error('Service Worker: Error during energy data sync', error);
  }
}

// IndexedDB helper functions (simplified)
async function getPendingContactForms() {
  // In a real implementation, this would use IndexedDB
  return [];
}

async function removePendingContactForm(id) {
  // In a real implementation, this would remove from IndexedDB
  console.log('Removing pending form', id);
}

async function cacheEnergyData(data) {
  // In a real implementation, this would cache in IndexedDB
  console.log('Caching energy data', data);
}

// Message handling for communication with main thread
self.addEventListener('message', (event) => {
  console.log('Service Worker: Message received', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});
