// DIBELS Practice Lab Service Worker
const CACHE_NAME = 'dibels-practice-lab-v1.0.4';
const STATIC_CACHE_NAME = 'dibels-static-v1.0.4';
const DYNAMIC_CACHE_NAME = 'dibels-dynamic-v1.0.4';

// Files to cache for offline functionality
const STATIC_FILES = [
  '/',
  '/index.html',
  '/styles.css',
  '/js/app.js',
  '/js/theme.js',
  '/js/timer.js',
  '/js/scoring.js',
  '/js/subtests.js',
  '/js/audio.js',
  '/js/print.js',
  '/js/accessibility.js',
  '/js/keyboard.js',
  '/js/progress.js',
  '/data/content.js',
  '/manifest.json',
  // Icon files
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Caching static files...');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Static files cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Error caching static files:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external requests
  if (url.origin !== location.origin) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          console.log('Serving from cache:', request.url);
          return cachedResponse;
        }

        // Fetch from network
        return fetch(request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response for caching
            const responseToCache = response.clone();

            // Cache dynamic content
            caches.open(DYNAMIC_CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseToCache);
              });

            return response;
          })
          .catch((error) => {
            console.log('Network request failed:', error);
            
            // Return offline page for navigation requests
            if (request.mode === 'navigate') {
              return caches.match('/index.html');
            }
            
            // Return a basic offline response for other requests
            return new Response('Offline content not available', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});

// Background sync for practice data
self.addEventListener('sync', (event) => {
  if (event.tag === 'practice-data-sync') {
    console.log('Syncing practice data...');
    event.waitUntil(syncPracticeData());
  }
});

// Push notifications for practice reminders
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey
      },
      actions: [
        {
          action: 'open',
          title: 'Open Practice Lab',
          icon: '/icons/icon-192x192.png'
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/icons/icon-192x192.png'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Helper function to sync practice data
async function syncPracticeData() {
  try {
    // Get practice data from IndexedDB
    const practiceData = await getPracticeDataFromIndexedDB();
    
    if (practiceData && practiceData.length > 0) {
      // In a real app, you would sync with a server here
      console.log('Practice data synced:', practiceData);
      
      // Clear synced data from local storage
      await clearSyncedPracticeData();
    }
  } catch (error) {
    console.error('Error syncing practice data:', error);
  }
}

// Helper function to get practice data from IndexedDB
async function getPracticeDataFromIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('DIBELSPracticeDB', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['practiceSessions'], 'readonly');
      const store = transaction.objectStore('practiceSessions');
      const getAllRequest = store.getAll();
      
      getAllRequest.onsuccess = () => resolve(getAllRequest.result);
      getAllRequest.onerror = () => reject(getAllRequest.error);
    };
  });
}

// Helper function to clear synced practice data
async function clearSyncedPracticeData() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('DIBELSPracticeDB', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['practiceSessions'], 'readwrite');
      const store = transaction.objectStore('practiceSessions');
      const clearRequest = store.clear();
      
      clearRequest.onsuccess = () => resolve();
      clearRequest.onerror = () => reject(clearRequest.error);
    };
  });
}

// Message handling for communication with main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    const urlsToCache = event.data.urls;
    event.waitUntil(
      caches.open(DYNAMIC_CACHE_NAME)
        .then((cache) => cache.addAll(urlsToCache))
    );
  }
});

console.log('Service Worker loaded successfully');
