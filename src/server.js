import path from 'path';
import fs from 'fs';
import Express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import expressStaticGzip from 'express-static-gzip';

import createMemoryHistory from 'history/lib/createMemoryHistory';
import configureStore from './store';
import routes from './routes';

const server = Express();
const port = process.env.PORT || 3000;

server.use('/manifest.json', Express.static('./dist/manifest.json'));
server.use('/favicon.ico', Express.static('./dist/static/images/favicon.ico'));

server.use('/sw.js',  Express.static('./dist/sw.js', {
  'maxAge': 31536000,
  setHeaders: function(res, path, stat) {
    res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
    return res;
  }
}));
server.use('/static', expressStaticGzip('./dist/static', {
  'maxAge': 31536000,
  setHeaders: function(res, path, stat) {
    res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
    return res;
  }
}));


server.use((req, res)=> {
  match({
    'routes': routes,
    'location': req.url
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {

      // Create a new Redux store instance
      const store = configureStore();

      // Render the component to a string
      const html = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      const preloadedState = store.getState();

      fs.readFile('./dist/index.html', 'utf8', function (err, file) {
        if (err) {
          return console.log(err);
        }
        let document = file.replace(/<div id="app"><\/div>/, `<div id="app">${html}</div>`);
        document = document.replace(/'preloadedState'/, `'${JSON.stringify(preloadedState)}'`);
        res.setHeader('Cache-Control', 'public, max-age=31536000');
        res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
        res.send(document);
      });

    } else {
      res.status(404).send('Not found')
    }
  });
});

server.listen(port);
console.log('=== Go to http://localhost:' + port + ' ===');






// import express from 'express';
// import fs from 'fs';
// import path from 'path';
// import React from 'react';
// import { renderToString } from 'react-dom/server';
// import createRoutes from './routes';
// import configureStore from './store';
// import { Provider } from 'react-redux';

// const store = configureStore();


// function handleRender(req, res) {
//   const html = renderToString(
//     <Provider store={store}>
//       { createRoutes() }
//     </Provider>
//   );

//   const preloadedState = store.getState()


//   fs.readFile('../dist/index.html', 'utf8', function (err, file) {
//     if (err) {
//     return console.log(err);
//     }


//     const document = file.replace(/<div id="app"><\/div>/, `<div id="app">${html}</div>`);
//     res.send(document);
//   });
// }

// const app = express();
// // Serve built files with express static files middleware
// app.use('/', express.static(path.join(__dirname, '../dist')));
// // Serve normal requests with our handleRender function
// app.get('*', handleRender);
// app.listen(3000);
// console.log('=== Go to http://localhost:3000 ===');