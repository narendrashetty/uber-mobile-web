import React from 'react';
import Drawer from 'react-toolbox/lib/drawer';
import { hashHistory } from 'react-router';
import Map from './Map';
import Search from './Search';
import classNames from 'classnames';

export const Home = React.createClass({

  getInitialState() {
    return {
      'active': false,
      'destinationLocation': null
    };
  },

  componentDidMount() {
    this.setup(this.props);
  },

  componentWillReceiveProps(nextProps) {
    this.setup(nextProps);
  },

  setup(props) {
    this.setState({
      'isSearch': props.location.pathname === '/search',
      'isBook': props.location.pathname === '/home/book',
      'isHome': props.location.pathname === '/home'
    }, () => {
      if (this.state.isBook && !this.state.destinationLocation) {
        hashHistory.push('/home');
      }
    });
  },

  handleToggle() {
    if (!this.state.isHome) {
      hashHistory.push('/home');
      this.setState({
        'destinationLocation': null
      });
    } else {
      this.setState({active: !this.state.active});
    }
  },

  gotoSearch() {
    if (!this.state.isSearch) {
      hashHistory.push('/search');
    }
  },

  gotoPage(route) {
    hashHistory.push(`/${route}`);
  },

  onSuggestSelect(destination) {
    this.setState({
      'destinationLocation': [destination.location.lng, destination.location.lat]
    });
    hashHistory.push('/home/book');
  },

  renderMenu() {
    return (
      <div>
        <div
          className={classNames('nav', {
            'nav--back': !this.state.isHome
          })}
          onClick={this.handleToggle}>
            <div className="nav__icon">
            </div>
        </div>
        <Drawer active={this.state.active} onOverlayClick={this.handleToggle} className="ubDrawer">
          <div className="ubDrawer__header">
            <div className="ubDrawer__dp">
            </div>
            <span className="ubDrawer__name">Narendra Shetty</span>
          </div>
          <div className="ubDrawer__body">
            <ul className="ubDrawer__menu">
              <li onClick={() => this.gotoPage('payment')}>Payment</li>
              <li onClick={() => this.gotoPage('trips')}>Your Trips</li>
              <li onClick={() => this.gotoPage('rides')}>Free Rides</li>
              <li onClick={() => this.gotoPage('help')}>Help</li>
              <li onClick={() => this.gotoPage('settings')}>Settings</li>
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

  render() {
    return (
      <div className="fullHeight">
        <Map 
          destinationLocation={this.state.destinationLocation}
          sourceLocation={this.props.sourceLocation}
          isOnline={this.props.isOnline}
        />
        {(() => {
          if (!this.state.isBook) {
            return <Search 
              onSuggestSelect={this.onSuggestSelect}
              gotoSearch={this.gotoSearch}
              isSearch={this.state.isSearch}
              isOnline={this.props.isOnline}
            />;
          }
        })()}

        {(() => {
          if (this.props.children) {
            return React.cloneElement(this.props.children, {
              'isOnline': this.props.isOnline
            })
          }
        })()}
        
        {this.renderMenu()}
      </div>
    );
  }
});

export default Home;