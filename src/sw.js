import toolbox from 'sw-toolbox';

const VERSION = 'v4';

const {
  assets,
} = global.serviceWorkerOption;

let ASSETS = [
  ...assets,
  './'
];

toolbox.options.debug = false;

toolbox.options.cache = {
  'name': `uber-cache-${VERSION}`,
  'maxEntries': 100,
  'maxAgeSeconds': 2592e3
};

// On install, load all our assets into a 'static' cache
self.oninstall = event => self.skipWaiting();

self.onactivate = event => {
  const cacheWhitelist = [
    `uber-cache-${VERSION}`,
    `js-assets-${VERSION}`,
    `map-assets-${VERSION}`,
    `css-assets-${VERSION}`,
    `fonts-assets-${VERSION}`
  ];

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

toolbox.precache([
  '/'
]);

toolbox.router.get('(.*).js', toolbox.fastest, {
  'origin':/.herokuapp.com|localhost|maps.googleapis.com/,
  'mode':'cors',
  'cache': {
    'name': `js-assets-${VERSION}`,
    'maxEntries': 50,
    'maxAgeSeconds': 2592e3
  }
});

toolbox.router.get(/maps\/api\/js/, toolbox.fastest, {
  'origin':/maps.googleapis.com/,
  'mode':'cors',
  'cache': {
    'name': `map-assets-${VERSION}`,
    'maxEntries': 50,
    'maxAgeSeconds': 2592e3
  }
});

toolbox.router.get('(.*).css', toolbox.fastest, {
  'origin':/.herokuapp.com|localhost/,
  'mode':'cors',
  'cache': {
    'name': `css-assets-${VERSION}`,
    'maxEntries': 50,
    'maxAgeSeconds': 2592e3
  }
});

toolbox.router.get(/\.(eot|svg|ttf|woff)$/, toolbox.fastest, {
  'origin':/.herokuapp.com|localhost/,
  'mode':'cors',
  'cache': {
    'name': `fonts-assets-${VERSION}`,
    'maxEntries': 50,
    'maxAgeSeconds': 2592e3
  }
});

toolbox.router.get('(.*)', toolbox.networkFirst);










