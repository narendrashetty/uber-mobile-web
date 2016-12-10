import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './containers/App';

export default function() {
  return (
    <Router history={ hashHistory }>
      <Route path="/" component={App}>
      	<Route path="search" />
      </Route>
    </Router>
  );
}