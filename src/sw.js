import toolbox from 'sw-toolbox';

const VERSION = 'v1';

const {
  assets,
} = global.serviceWorkerOption;

let ASSETS = [
  ...assets,
  './'
];

toolbox.options.debug = true;

toolbox.options.cache = {
  'name': 'uber-cache',
  'maxEntries': 100,
  'maxAgeSeconds': 2592e3
};

// On install, load all our assets into a 'static' cache
self.oninstall = event => self.skipWaiting();

self.onactivate = event => {
  const cacheWhitelist = [`static-v1`, `dynamic--v1`];

  event.waitUntil(
    global.caches.keys().then(cacheNames => {
      return Promise.all(cacheNames.map(cacheName => {
        if (cacheWhitelist.indexOf(cacheName) > -1) {
          return caches.delete(cacheName);
        }    
      }));
    })
  );
};

toolbox.precache([
  '/'
]);

toolbox.router.get('(.*).js', toolbox.fastest, {
  'origin':/.herokuapp.com|localhost|maps.googleapis.com/,
  'mode':'cors',
  'cache': {
    'name': 'js-assets',
    'maxEntries': 50,
    'maxAgeSeconds': 2592e3
  }
});

toolbox.router.get(/maps\/api\/js/, toolbox.fastest, {
  'origin':/maps.googleapis.com/,
  'mode':'cors',
  'cache': {
    'name': 'map-assets',
    'maxEntries': 50,
    'maxAgeSeconds': 2592e3
  }
});

toolbox.router.get('(.*).css', toolbox.fastest, {
  'origin':/.herokuapp.com|localhost/,
  'mode':'cors',
  'cache': {
    'name': 'css-assets',
    'maxEntries': 50,
    'maxAgeSeconds': 2592e3
  }
});

toolbox.router.get(/\.(eot|svg|ttf|woff)$/, toolbox.fastest, {
  'origin':/.herokuapp.com|localhost/,
  'mode':'cors',
  'cache': {
    'name': 'fonts-assets',
    'maxEntries': 50,
    'maxAgeSeconds': 2592e3
  }
});

toolbox.router.get('(.*)', toolbox.networkFirst);



// self.onfetch = event => {
//   // Parse the request URL so we can separate domain, path and query.
//   event.parsedUrl = new URL(event.request.url);

//   const BlacklistedDomain = [
//     'tiles.mapbox.com',
//     'api.mapbox.com'
//   ];

//   if (BlacklistedDomain.filter(domain => event.parsedUrl.origin.endsWith(domain)).length > 0) {
//     return;
//   }
  
//   if (ASSETS.indexOf(`.${event.parsedUrl.pathname}`) > -1) {
//     event.respondWith(global.caches.match(event.request));
//     return;
//   }

//   staleWhileRevalidate(event);
// };

// // staleWhileRevalidate is a caching strategy. It responds with
// // whatever it got cached (if anything), while updating the cache
// // in the background.
// function staleWhileRevalidate(event) {
//   const fetchedVersion = fetch(event.request);
//   // Since we _might_ be responding with the fetched response
//   // and also using it to populate the cache, we need to make a copy.
//   const fetchedCopy = fetchedVersion.then(response => response.clone());
//   const cachedVersion = global.caches.match(event.request);

//   event.respondWith(async function () {
//     try {
//       // Respond with whatever is ready first, fetched or cached version.
//       // Since fetch() will reject when offline, resolve to cachedVersion
//       // on reject so we always resolve to something.
//       const response = await Promise.race([
//         fetchedVersion.catch(_ => cachedVersion),
//         cachedVersion
//       ]);
//       // However, caches.match() will resolve to `undefined` if there’s
//       // nothing in cache. If that’s the case, wait for the network response.
//       if (!response) {
//         return await fetchedVersion;
//       }
//       return response;
//     } catch(_) {
//       // If nothing returns a valid response (rejects or is undefined),
//       // we just return 404.
//       return new Response(null, {status: 404});
//     }
//   }());

//   event.waitUntil(async function () {
//     try {
//       const response = await fetchedCopy;
//       const cache = await global.caches.open(`dynamic-${VERSION}`);
//       return cache.put(event.request, response);
//     } catch(_) {/* eat errors */}
//   }());
// }















