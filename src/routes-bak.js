import React from 'react';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import App from './containers/App';
import Home from './components/Home';
import Book from './components/Book';

export default function() {

  const rootRoute = {
    childRoutes: [{
      path: '/',
      component: require('./containers/App'),
      childRoutes: [
        require('./routes/Calendar'),
        require('./routes/Course'),
        require('./routes/Grades'),
        require('./routes/Messages'),
        require('./routes/Profile')
      ]
    }]
  };

  return (
    <Router history={ hashHistory } routes{routeRoute}>
    </Router>
  );


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