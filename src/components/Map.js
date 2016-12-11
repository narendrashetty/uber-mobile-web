import React from 'react';
import Drawer from 'react-toolbox/lib/drawer';
import classNames from 'classnames';
import { hashHistory } from 'react-router';
import MapGL from 'react-map-gl';
import HTMLOverlay from 'react-map-gl/dist/overlays/html.react.js';
import SVGOverlay from 'react-map-gl/dist/overlays/svg.react.js';
import Dimensions from 'react-dimensions';
import ViewportMercator from 'viewport-mercator-project';

function round(x, n) {
  const tenN = Math.pow(10, n);
  return Math.round(x * tenN) / tenN;
}

export const Map = React.createClass({

  getInitialState() {
    return {
      'isLoading': true,
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
      'sourceLocation': [-122.4376, 37.7577],
      'destinationLocation': [4.898454, 52.365503]
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
          'sourceLocation': [pos.coords.longitude, pos.coords.latitude],
          'isLoading': false
        });
      });
    }
  },

  renderPath(sourceProject, destinationProject) {
    // let left, top, width;
    // if (sourceProject[0] < destinationProject[0]) {
    //   left = sourceProject[0];
    //   top = sourceProject[1];
    //   width = destinationProject[0] - sourceProject[0];
    // } else {
    //   left = destinationProject[0];
    //   top = destinationProject[1];
    //   width = sourceProject[0] - destinationProject[0];
    // }
    // return (
    //   <div className="path" style={{
    //     'position': 'absolute',
    //     'height': 10,
    //     'background': '#000',
    //     left,
    //     top,
    //     width
    //   }}></div>
    // );
  },

  redraw(config) {
    const sourceProject = config.project(this.state.sourceLocation);
    const destinationProject = config.project(this.state.destinationLocation);
    return (
      <div>
        {this.renderPath(sourceProject, destinationProject)}

        <div className="marker" style={{
          'top': sourceProject[1],
          'left': sourceProject[0]
        }}>
          <div className="ring"></div>
        </div>

        <div className="marker" style={{
          'top': destinationProject[1],
          'left': destinationProject[0]
        }}>
        </div>
      </div>
    );
  },

  renderOverlay() {
    return (
      <HTMLOverlay
        width={this.state.viewport.width}
        height={this.state.viewport.height}
        isDragging={false}
        redraw={this.redraw}
        project={(location) => {
          let viewport = this.state.viewport;
          const mercator = ViewportMercator({
            longitude: viewport.longitude,
            latitude: viewport.latitude,
            zoom: viewport.zoom,
            width: viewport.width,
            height: viewport.height
          });

          const pixel = mercator.project(location);
          return [round(pixel[0], 1), round(pixel[1], 1)];
        }} />
    );
  },

  renderLoading() {
    return (
      <div className="fullHeight map__loading">
        Loading
      </div>
    );
  },

  renderMap() {
    return (
      <MapGL
        {...this.state.viewport}
        onChangeViewport={(newViewport) => {
          const viewport = Object.assign({}, this.state.viewport, newViewport);
          this.setState({viewport});
        }}
      >
        {this.renderOverlay()}

      </MapGL>
    );
  },

  render() {
    return (
      <div className='fullWidth fullHeight map'>
        {(() => {
          if (this.state.isLoading) {
            return this.renderLoading();
          } else {
            return this.renderMap();
          }
        })()}        
      </div>
    );
  }
});

        // <SVGOverlay
        //   width={this.state.viewport.width}
        //   height={this.state.viewport.height}
        //   latitude={this.state.viewport.latitude}
        //   longitude={this.state.viewport.longitude}
        //   zoom={this.state.viewport.zoom}
        //   isDragging={false}
        //   redraw={(config) => {
        //     const sourcePixel = config.project(this.state.sourceLocation);
        //     const destinationPixel = config.project(this.state.destinationLocation);

        //     const d = `M ${sourcePixel[0] + 5} ${sourcePixel[1] + 5} Q ${Math.abs((sourcePixel[0] - destinationPixel[0]) / 2)} ${destinationPixel[1] - 100} ${destinationPixel[0] + 5} ${destinationPixel[1] + 5}`;

        //     return (
        //       <path id="arc1" fill="none" stroke="#446688" strokeWidth="2" d="M 50 150 A 100 100 0 1 0 150 50"></path>
        //     );
        //   }}
        // />

export default Dimensions()(Map);