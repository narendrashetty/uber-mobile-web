const isBrowser = typeof window !== 'undefined';

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hashHistory } from 'react-router';


import Splash from '../components/Splash';

export const App = React.createClass({

  getInitialState() {
    let isOnline = true;
    if (isBrowser) {
      isOnline = window.navigator.onLine;
    }

    return {
      'isSplash': true,
      isOnline
    }
  },

  componentDidMount() {
    if (isBrowser) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          this.setState({
            'sourceLocation': [pos.coords.longitude, pos.coords.latitude],
            'isSplash': false
          }, () => {
            if (this.props.location.pathname === '/') {
              hashHistory.push('/home');
            }
          });
        });
      }
    }

    window.addEventListener('online', () => {
      this.setState({
        'isOnline': true
      });
    });

    window.addEventListener('offline', () => {
      this.setState({
        'isOnline': false
      });
    });
  },

  render() {

    return (
      <div className="fullHeight fullWidth">
        <Splash move={(this.props.location.pathname !== '/' && !this.state.isSplash)} />

        {(() => {
          if (this.props.location.pathname !== '/' && !this.state.isSplash) {
            return React.cloneElement(this.props.children, {
              'sourceLocation': this.state.sourceLocation,
              'isOnline': this.state.isOnline
            });
          }
        })()}
      </div>
    );

    
  }
});

export default App;

// function mapStateToProps() {
//   return {};
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     'actions': bindActionCreators(actions, dispatch)
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App);