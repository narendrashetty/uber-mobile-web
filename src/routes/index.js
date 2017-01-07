// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

import React from 'react';
import {Route, getComponent } from 'react-router';

export default (
  <Route path="/" name="base" getComponent={(nextState, cb) => {
    require.ensure([], (require) => {
      cb(null, require('../containers/App').default);
    }, 'BaseView');
  }}>
  	<Route path="home" name="home" getComponent={(nextState, cb) => {
      require.ensure([], (require) => {
        cb(null, require('../components/Home').default);
      }, 'HomeView');
    }}>
  		<Route path="book" name="book" getComponent={(nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, require('../components/Book').default);
        }, 'BookView');
      }} />
  	</Route>
  	<Route path="search" name="search" getComponent={(nextState, cb) => {
      require.ensure([], (require) => {
        cb(null, require('../components/Home').default);
      }, 'SearchView');
    }} />

    <Route path="payment" name="payment" getComponent={(nextState, cb) => {
      require.ensure([], (require) => {
        cb(null, require('../components/Payment').default);
      }, 'PaymentView');
    }} />

    <Route path="settings" name="settings" getComponent={(nextState, cb) => {
      require.ensure([], (require) => {
        cb(null, require('../components/Settings').default);
      }, 'SettingsView');
    }} />
  </Route>
);