import React from 'react';
import { Router, Route, hashHistory, IndexRedirect, getComponent } from 'react-router';

export default function() {
  return (
    <Router history={ hashHistory }>
      <Route path="/" name="base" getComponent={(nextState, cb) => {
        System.import('../containers/App')
        .then(function(m) {
          cb(null, m.default)
        });
      }}>
      	<Route path="home" name="home" getComponent={(nextState, cb) => {
          System.import('../components/Home')
          .then(function(m) {
            cb(null, m.default)
          });
        }}>
      		<Route path="book" name="book" getComponent={(nextState, cb) => {
            System.import('../components/Book')
            .then(function(m) {
              cb(null, m.default)
            });
          }} />
      	</Route>
      	<Route path="search" name="search" getComponent={(nextState, cb) => {
          System.import('../components/Home')
          .then(function(m) {
            cb(null, m.default)
          });
        }} />
      </Route>
    </Router>
  );
}