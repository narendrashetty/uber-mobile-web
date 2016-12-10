import React from 'react';
import Drawer from 'react-toolbox/lib/drawer';
import classNames from 'classnames';
import { hashHistory } from 'react-router';
import MapGL from 'react-map-gl';
import Dimensions from 'react-dimensions';

export const Home = React.createClass({

  getInitialState() {
    return {
      'active': false,
      'latitude': 37.7577,
      'longitude': -122.4376
    };
  },

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.setState({
          'latitude': pos.coords.latitude,
          'longitude': pos.coords.longitude
        });
      });
    }
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

  renderSearchResult() {
    if (this.state.isSearch) {
      return (
        <div className="fullHeight fullWidth searchResult">

        </div>
      );
    }
  },

  render() {

    return (
      <div className="fullHeight">
        <div className='fullWidth fullHeight map'>
          <MapGL
            width={this.props.containerWidth}
            height={this.props.containerHeight}
            latitude={this.state.latitude}
            longitude={this.state.longitude}
            zoom={12.011557070552028}
            startDragLngLat={null}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            isDragging={true}
            mapboxApiAccessToken="pk.eyJ1IjoibmFyZW5kcmFzaGV0dHkiLCJhIjoiY2l3am9veHJ2MDAwbDJ0cjI1NTkyM3llNSJ9.l2l38Z5jAyCO0_aOE-ABlA"
            onChangeViewport={viewport => {
              const {latitude, longitude, zoom} = viewport;
            }}
          />
        </div>
        {this.renderSearchResult()}
        {this.renderSearchbox()}
        {this.renderMenu()}

      </div>
    );
  }
});

export default Dimensions()(Home);