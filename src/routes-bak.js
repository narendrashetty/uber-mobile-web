import React from 'react';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import App from './containers/App';
import Home from './components/Home';
import Book from './components/Book';

export default function() {



  return (
    <Router history={ hashHistory }>
      <Route path="/" component={App}>
      	<IndexRedirect to="/home" />
      	<Route path="home" component={Home}>
      		<Route path="book" component={Book} />
      	</Route>
      	<Route path="search" component={Home} />
      </Route>
    </Router>
  );
}