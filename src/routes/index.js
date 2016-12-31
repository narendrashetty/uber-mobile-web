import React from 'react';
import { Router, Route, hashHistory, IndexRedirect, getComponent } from 'react-router';

export default function() {
  return (
    <Router history={ hashHistory }>
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
      </Route>
    </Router>
  );
}