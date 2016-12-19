import React from 'react';
import { Router, Route, hashHistory, IndexRedirect, getComponent } from 'react-router';

export default function() {

  const rootRoute = {
    childRoutes: [{
      path: '/',
      getComponent(nextState, cb) {
        System.import('../containers/App')
        .then(function(m) {
          cb(null, m.default)
        });
      },

      indexRoute: {
        getComponent(nextState, cb) {
          System.import('../components/Home')
          .then(function(m) {
            cb(null, m.default)
          });
        }
      },

      childRoutes: [{
        path: 'book',
        getComponent(nextState, cb) {
          System.import('../components/Book')
          .then(function(m) {
            cb(null, m.default)
          });
        }
      }, {
        path: 'search',
        getComponent(nextState, cb) {
          System.import('../components/Home')
            .then(function(m) {
              cb(null, m.default)
            });
        }
      }]
    }]
  };

  // return (
  //   <Router history={ hashHistory } routes={rootRoute}>
  //   </Router>
  // );


  return (
    <Router history={ hashHistory }>
      <Route path="/" getComponent={(nextState, cb) => {
        System.import('../containers/App')
        .then(function(m) {
          cb(null, m.default)
        });
      }}>
      	<IndexRedirect to="/home" />
      	<Route path="home" getComponent={(nextState, cb) => {
          System.import('../components/Home')
          .then(function(m) {
            cb(null, m.default)
          });
        }}>
      		<Route path="book" getComponent={(nextState, cb) => {
            System.import('../components/Book')
            .then(function(m) {
              cb(null, m.default)
            });
          }} />
      	</Route>
      	<Route path="search" getComponent={(nextState, cb) => {
          System.import('../components/Home')
          .then(function(m) {
            cb(null, m.default)
          });
        }} />
      </Route>
    </Router>
  );
}