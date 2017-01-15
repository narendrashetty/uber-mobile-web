import path from 'path';
import fs from 'fs';
import Express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import expressStaticGzip from 'express-static-gzip';
import device from 'express-device';

import createMemoryHistory from 'history/lib/createMemoryHistory';
import configureStore from './store';
import routes from './routes';

const server = Express();
const port = process.env.PORT || 3000;

server.use('/manifest.json', Express.static('./dist/manifest.json'));
server.use('/favicon.ico', Express.static('./dist/static/images/favicon.ico'));

server.use('/sw.js',  Express.static('./dist/sw.js'));
server.use('/static', expressStaticGzip('./dist/static', {
  'maxAge': 31536000,
  setHeaders: function(res, path, stat) {
    res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
    return res;
  }
}));

/* At the top, with other redirect methods before other routes */
server.get('*',function(req,res,next){
  if(req.headers['x-forwarded-proto']!='https')
    res.redirect('https://' + req.hostname + req.url);
  else
    next(); /* Continue to other routes if we're not redirecting */
});

server.use(device.capture());

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

      if (req.device.type === 'phone') {

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
        res.send('Please use Mobile to browse, or use chrome dev tools to change the user agent');
      }

    } else {
      res.status(404).send('Not found')
    }
  });
});

server.listen(port);
console.log('=== Go to http://localhost:' + port + ' ===');