const VERSION = 'v1';

const DEBUG = true;

const {
  assets,
} = global.serviceWorkerOption;

let ASSETS = [
  ...assets
];

// On install, load all our assets into a 'static' cache
self.oninstall = event => event.waitUntil(async function () {
  const cache = await global.caches.open(`static-${VERSION}`);
  await cache.addAll(ASSETS);

  return self.skipWaiting();
}());

self.onactivate = event => {
  var cacheWhitelist = [`static-${VERSION}`, `dynamic--${VERSION}`];

  event.waitUntil(
    global.caches.keys().then(cacheNames => {
      return Promise.all(cacheNames.map(cacheName => {
        if (cacheWhitelist.indexOf(cacheName) === -1) {
          return caches.delete(cacheName);
        }    
      }));
    })
  );
};


self.onfetch = event => {
  // Parse the request URL so we can separate domain, path and query.
  event.parsedUrl = new URL(event.request.url);
  
  if (ASSETS.indexOf(`.${event.parsedUrl.pathname}`) > -1) {
    event.respondWith(global.caches.match(event.request));
    return;
  }

  staleWhileRevalidate(event);
};

// staleWhileRevalidate is a caching strategy. It responds with
// whatever it got cached (if anything), while updating the cache
// in the background.
function staleWhileRevalidate(event) {
  const fetchedVersion = fetch(event.request);
  // Since we _might_ be responding with the fetched response
  // and also using it to populate the cache, we need to make a copy.
  const fetchedCopy = fetchedVersion.then(response => response.clone());
  const cachedVersion = global.caches.match(event.request);

  event.respondWith(async function () {
    try {
      // Respond with whatever is ready first, fetched or cached version.
      // Since fetch() will reject when offline, resolve to cachedVersion
      // on reject so we always resolve to something.
      const response = await Promise.race([
        fetchedVersion.catch(_ => cachedVersion),
        cachedVersion
      ]);
      // However, caches.match() will resolve to `undefined` if there’s
      // nothing in cache. If that’s the case, wait for the network response.
      if (!response) {
        return await fetchedVersion;
      }
      return response;
    } catch(_) {
      // If nothing returns a valid response (rejects or is undefined),
      // we just return 404.
      return new Response(null, {status: 404});
    }
  }());

  event.waitUntil(async function () {
    try {
      const response = await fetchedCopy;
      const cache = await global.caches.open(`dynamic-${VERSION}`);
      return cache.put(event.request, response);
    } catch(_) {/* eat errors */}
  }());
}















