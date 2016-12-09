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
    setTimeout(() => {
      this.setState({
        'isSplash': false
      });
    }, 2000);
  },

  render() {
    // if (this.state.isSplash) {
    //   return <Splash />;
    // }
    return <Home />;
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