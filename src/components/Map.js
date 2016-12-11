import React from 'react';
import Drawer from 'react-toolbox/lib/drawer';
import classNames from 'classnames';
import { hashHistory } from 'react-router';
import MapGL from 'react-map-gl';
import HTMLOverlay from 'react-map-gl/dist/overlays/html.react.js';
import Dimensions from 'react-dimensions';
import ViewportMercator from 'viewport-mercator-project';

function round(x, n) {
  const tenN = Math.pow(10, n);
  return Math.round(x * tenN) / tenN;
}

export const Map = React.createClass({

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
  },

  renderOverlay() {
    return (
      <HTMLOverlay
        width={this.state.viewport.width}
        height={this.state.viewport.height}
        isDragging={false}
        redraw={(config) => {
          const project = config.project(config.isDragging);
          return (
            <div className="marker" style={{
              'top': project[1],
              'left': project[0]
            }}>
              <div className="ring"></div>
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
        }} />
    );
  },

  render() {
    return (
      <div className='fullWidth fullHeight map'>
        <MapGL
          {...this.state.viewport}
          onChangeViewport={(newViewport) => {
            const viewport = Object.assign({}, this.state.viewport, newViewport);
            this.setState({viewport});
          }}
        >
          {this.renderOverlay()}
        </MapGL>
      </div>
    );
  }
});

export default Dimensions()(Map);