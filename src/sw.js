const cacheName = 'v1';

const DEBUG = true;

const {
  assets,
} = global.serviceWorkerOption;

let cacheFiles = [
  ...assets,
  './'
];

cacheFiles = cacheFiles.map((path) => {
  return new URL(path, global.location).toString();
});


self.addEventListener('install', (event) => {
  
  event.waitUntil(
    global.caches.open(cacheName).then((cache) => {
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('activate', (event) => {
  
  event.waitUntil(

    global.caches.keys().then((cacheNames) => {
      return Promise.all(cacheNames.map((name) => {

        if (name !== cacheName) {
          return global.caches.delete(name);
        }
      }));
    })

  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Ignore not GET request.
  if (request.method !== 'GET') {
    if (DEBUG) {
      console.log(`[SW] Ignore non GET request ${request.method}`);
    }
    return;
  }

  const requestUrl = new URL(request.url);

  // Ignore difference origin.
  if (requestUrl.origin !== location.origin) {
    if (DEBUG) {
      console.log(`[SW] Ignore difference origin ${requestUrl.origin}`);
    }
    return;
  }


  event.respondWith(
    global.caches.match(request)
      .then((response) => {
        if (response) {
          return response;
        }

        return fetch(request)
          .then((responseNetwork) => {
            if (!responseNetwork || !responseNetwork.ok) {
              if (DEBUG) {
                console.log(`[SW] URL [${
                  requestUrl.toString()}] wrong responseNetwork: ${
                  responseNetwork.status} ${responseNetwork.type}`);
              }

              return responseNetwork;
            }

            if (DEBUG) {
              console.log(`[SW] URL ${requestUrl.href} fetched`);
            }

            const responseCache = responseNetwork.clone();

            global.caches
              .open(cacheName)
              .then((cache) => {
                return cache.put(request, responseCache);
              })
              .then(() => {
                if (DEBUG) {
                  console.log(`[SW] Cache asset: ${requestUrl.href}`);
                }
              });

            return responseNetwork;
          })
          .catch(() => {
            // User is landing on our page.
            if (event.request.mode === 'navigate') {
              return global.caches.match('./');
            }

            return null;
          });


      })
  );
  
});















