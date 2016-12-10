import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './components/Home';

export default function() {
  return (
    <Router history={ hashHistory }>
      <Route path="/" component={App}>
      	<IndexRoute component={Home} />
      	<Route path="search" component={Home} />
      </Route>
    </Router>
  );
}