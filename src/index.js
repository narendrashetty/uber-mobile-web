import manifest from './manifest.json';
import icon96 from './images/96.png';
import icon144 from './images/144.png';
import icon192 from './images/192.png';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import './styles/app.scss';

import createRoutes from './routes';
import configureStore from './store';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

const store = configureStore();

if ('serviceWorker' in navigator) {
	const registration = runtime.register();
}

render(
  <Provider store={store}>
    { createRoutes() }
  </Provider>,
  document.getElementById('app')
);