const CACHE_NAME = 'hostel-finder-v1'; // Change this version when you update core files!

const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/contact-us.html',
  '/faq.html',
  '/home-page.html',
  '/hostel-details.html',
  '/hostel-model.html',
  '/owner.html',
  '/offline.html',
  '/reviews.html',
  '/style.css',
  '/chatbot.css',
  '/main.js',
  '/calculator.js',
  '/chatbot.js',
  '/contact-us.js',
  '/developer-info.js',
  '/faq.js',
  '/hostel-details.js',
  '/owner.js',
  '/reviews.js',
  '/test.js',
  '/room.jpg',
  '/manifest.json',
  '/animation/textures/alpha_glass_baseColor.png',
  '/animation/textures/interiors_baseColor.jpeg',
  '/animation/textures/normal_baseColor.jpeg',
  '/animation/scene.bin',
  '/animation/scene.gltf',
  '/images/icon-192.png',
  '/images/icon-512.png',
  '/images/fallback.png',
];



// Install: Pre-cache core files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activate: Delete old caches if version changed
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
        .filter(name => name !== CACHE_NAME)
        .map(name => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

// Fetch: Serve from cache, dynamically cache images
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Serve from cache if available
      if (cachedResponse) {
        return cachedResponse;
      }
      
      // Else, fetch from network
      return fetch(event.request).then(networkResponse => {
        // Dynamically cache images in /images/ with specified formats
        if (
          event.request.url.match(/\/images\/.*\.(jpg|jpeg|png|gif|svg)$/i)
        ) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Optional: fallback if offline and no cache available
        // Example: return a fallback image for images
        if (event.request.destination === 'image') {
          return caches.match('/images/fallback.png');
        }
        //Optional: fallback for HTML pages
        if (event.request.destination === 'document') {
           return caches.match('/offline.html');
        }
        return;
      });
    })
  );
});