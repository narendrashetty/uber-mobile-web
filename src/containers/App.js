import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hashHistory } from 'react-router';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import registerEvents from 'serviceworker-webpack-plugin/lib/browser/registerEvents';

import Splash from '../components/Splash';

export const App = React.createClass({

  getInitialState() {
    return {
      'isSplash': true
    }
  },

  componentDidMount() {
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

    if ('serviceWorker' in navigator) {
      const registration = runtime.register();

      registerEvents(registration, {
        onInstalled: () => {
          console.log('onInstalled ');
        },
        onUpdateReady: () => {
          console.log('onUpdateReady');
        },

        onUpdating: () => {
          console.log('onUpdating');
        },
        onUpdateFailed: () => {
          console.log('onUpdateFailed');
        },
        onUpdated: () => {
          console.log('onUpdated');
        },
      });
    }
  },

  render() {

    return (
      <div className="fullHeight fullWidth">
        <Splash move={(this.props.location.pathname !== '/' && !this.state.isSplash)} />

        {(() => {
          if (this.props.location.pathname !== '/' && !this.state.isSplash) {
            return React.cloneElement(this.props.children, {
              sourceLocation: this.state.sourceLocation
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