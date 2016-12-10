import React from 'react';
import Drawer from 'react-toolbox/lib/drawer';
import classNames from 'classnames';
import { hashHistory } from 'react-router';

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
    if (this.props.isSearch) {
      hashHistory.goBack();
    } else {
      this.setState({active: !this.state.active});
    }
  },

  gotoSearch() {
    if (!this.props.isSearch) {
      hashHistory.push('/search');
    }
  },

  renderMenu() {
    return (
      <div>
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
  },

  renderSearchbox() {
    return (
      <div className={classNames('searchBox', {
        'searchBox__expand': this.props.isSearch
      })}>

        {(() => {
          if (this.props.isSearch) {
            return (
              <div className="searchBox__source">
                <div className="searchBox__source__legend"></div>
                <input
                  type="text"
                  placeholder="Current Location"
                  className="searchBox__source__input"
                />
              </div>
            );
          }
        })()}

        <div className="searchBox__destination">
          <div className="searchBox__destination__legend"></div>
          <input
            type="text"
            placeholder="Where to?"
            className="searchBox__destination__input"
            onClick={ this.gotoSearch }
          />
        </div>
      </div>
    );
  },

  render() {
    return (
      <div className="fullHeight">
        <div className='fullWidth fullHeight map'></div>
        {this.renderSearchbox()}
        {this.renderMenu()}
      </div>
    );
  }
});

export default Splash;