import React from 'react';
import Drawer from 'react-toolbox/lib/drawer';
import classNames from 'classnames';
import { hashHistory } from 'react-router';
import MapGL from 'react-map-gl';
import HTMLOverlay from 'react-map-gl/dist/overlays/html.react.js';
import Dimensions from 'react-dimensions';
import Immutable from 'immutable';
import ViewportMercator from 'viewport-mercator-project';
import Map from './Map';
import Geosuggest from 'react-geosuggest';

function round(x, n) {
  const tenN = Math.pow(10, n);
  return Math.round(x * tenN) / tenN;
}

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
      'isSearch': props.location.pathname === '/search'
    });
  },

  handleToggle() {
    if (this.state.isSearch) {
      hashHistory.goBack();
    } else {
      this.setState({active: !this.state.active});
    }
  },

  gotoSearch() {
    if (!this.state.isSearch) {
      hashHistory.push('/search');
    }
  },

  onSuggestSelect(destination) {
    this.setState({
      'destinationLocation': [destination.location.lng, destination.location.lat]
    });
    hashHistory.push('/');
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
        'searchBox__expand': this.state.isSearch
      })}>

        {(() => {
          if (this.state.isSearch) {
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
          <Geosuggest
            location={new google.maps.LatLng(52.363632, 4.926588)}
            radius="20"
            onClick={this.gotoSearch}
            placeholder="Where to?"
            inputClassName="searchBox__destination__input"
            onSuggestSelect={this.onSuggestSelect}
          />
        </div>
      </div>
    );
  },

  render() {
    return (
      <div className="fullHeight">
        <Map 
          destinationLocation={this.state.destinationLocation}
        />
        {this.renderSearchbox()}
        {this.renderMenu()}
      </div>
    );
  }
});

export default Dimensions()(Home);