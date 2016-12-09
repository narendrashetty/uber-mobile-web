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
          <div className="ubDrawer__header">
            <div className="ubDrawer__dp">
            </div>
            <span className="ubDrawer__name">Narendra Shetty</span>
          </div>
          <div className="ubDrawer__body">
            <ul className="ubDrawer__menu">
              <li>Payment</li>
              <li> Your Trips</li>
              <li>Free Rides</li>
              <li>Help</li>
              <li>Settings</li>
            </ul>
          </div>
          <div className="ubDrawer__footer">
            <span>Legal</span>
            <span>v1.0.0</span>
          </div>
        </Drawer>
      </div>
    );
  }
});

export default Splash;