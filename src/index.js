import manifest from './manifest.json';
import icon96 from './images/96.png';
import icon144 from './images/144.png';
import icon192 from './images/192.png';
import favicon from './images/favicon.ico';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { hashHistory, match, Router } from 'react-router';
import routes from './routes';

import './styles/app.scss';

import createRoutes from './routes';
import configureStore from './store';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

let preloadedState = window.__PRELOADED_STATE__;
if (preloadedState === 'preloadedState') {
  preloadedState = {};
} else {
  preloadedState = JSON.parse(preloadedState);
}

const store = configureStore(preloadedState);

if ('serviceWorker' in navigator) {
  const registration = runtime.register();
}


match({ 
  'history': hashHistory,
  routes
}, (error, redirectLocation, renderProps) => {

  render(
    <Provider store={store}>
      <Router {...renderProps} />
    </Provider>,
    document.getElementById('app')
  );
});