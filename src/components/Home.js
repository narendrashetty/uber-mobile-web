import React from 'react';
import Drawer from 'react-toolbox/lib/drawer';

export const Splash = React.createClass({

  componentDidMount() {
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition((pos) => {
        
    //   });
    // }
  },

  getInitialState() {
    return {
      'active': false
    };
  },

  handleToggle() {
    this.setState({active: !this.state.active});
  },

  render() {
    return (
      <div className="fullHeight">
        <div className='fullWidth fullHeight map'></div>
        <div className="searchBox"></div>
        <div className="nav" onClick={this.handleToggle}></div>
        <Drawer active={this.state.active} onOverlayClick={this.handleToggle} className="ubDrawer">
          <h5>This is your Drawer.</h5>
          <p>You can embed any content you want, for example a Menu.</p>
        </Drawer>
      </div>
    );
  }
});

export default Splash;