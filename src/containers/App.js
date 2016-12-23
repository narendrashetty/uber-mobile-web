import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hashHistory } from 'react-router';

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