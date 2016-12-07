import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import './styles/app.scss';

import createRoutes from './routes';
import configureStore from './store';

const store = configureStore();

render(
  <Provider store={store}>
    { createRoutes() }
  </Provider>,
  document.getElementById('app')
);