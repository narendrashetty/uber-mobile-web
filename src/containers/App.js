import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Splash from '../components/Splash';
import Home from '../components/Home';

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
        });
      });
    }
  },

  render() {
    if (this.state.isSplash) {
      return <Splash />;
    }
    return React.cloneElement(this.props.children, {
      sourceLocation: this.state.sourceLocation
    });
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