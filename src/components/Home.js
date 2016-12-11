import React from 'react';
import Drawer from 'react-toolbox/lib/drawer';
import classNames from 'classnames';
import { hashHistory } from 'react-router';
import MapGL from 'react-map-gl';
import HTMLOverlay from 'react-map-gl/dist/overlays/html.react.js';
import Dimensions from 'react-dimensions';
import Immutable from 'immutable';
import ViewportMercator from 'viewport-mercator-project';

function round(x, n) {
  const tenN = Math.pow(10, n);
  return Math.round(x * tenN) / tenN;
}

export const Home = React.createClass({

  getInitialState() {
    return {
      'active': false,
      'viewport': {
        'width': this.props.containerWidth,
        'height': this.props.containerHeight,
        'mapStyle': 'mapbox://styles/mapbox/basic-v9',
        'mapboxApiAccessToken': 'pk.eyJ1IjoibmFyZW5kcmFzaGV0dHkiLCJhIjoiY2l3am9veHJ2MDAwbDJ0cjI1NTkyM3llNSJ9.l2l38Z5jAyCO0_aOE-ABlA',
        'latitude': 37.7577,
        'longitude': -122.4376,
        'zoom': 12.011557070552028,
        'startDragLngLat': null,
        'isDragging': null
      },
      'locations': [-122.4376, 37.7577]
    };
  },

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const viewport = Object.assign({}, this.state.viewport, {
          'latitude': pos.coords.latitude,
          'longitude': pos.coords.longitude
        });
        this.setState({
          viewport,
          'locations': [pos.coords.longitude, pos.coords.latitude]
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
    // let HTMLViewport = this.state.viewport;
    
    return (
      <div className="fullHeight">
        <div className='fullWidth fullHeight map'>
          <MapGL
            {...this.state.viewport}
            onChangeViewport={(newViewport) => {
              const viewport = Object.assign({}, this.state.viewport, newViewport);
              this.setState({viewport});
            }}
          >
            <HTMLOverlay
              width={this.state.viewport.width}
              height={this.state.viewport.height}
              isDragging={false}
              redraw={(config) => {
                const project = config.project(config.isDragging);
                return (
                  <div style={{
                    'backgroundColor': '#000',
                    'width': 10,
                    'height': 10,
                    'position': 'absolute',
                    'borderRadius': 10,
                    'top': project[1],
                    'left': project[0]
                  }}>
                  </div>
                );
              }}
              project={() => {
                let viewport = this.state.viewport;
                const mercator = ViewportMercator({
                  longitude: viewport.longitude,
                  latitude: viewport.latitude,
                  zoom: viewport.zoom,
                  width: viewport.width,
                  height: viewport.height
                });

                const pixel = mercator.project(this.state.locations);
                return [round(pixel[0], 1), round(pixel[1], 1)];
              }}
            />
          </MapGL>
        </div>
        {this.renderSearchResult()}
        {this.renderSearchbox()}
        {this.renderMenu()}

      </div>
    );
  }
});

export default Dimensions()(Home);