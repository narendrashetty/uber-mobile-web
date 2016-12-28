import React from 'react';
import { hashHistory } from 'react-router';
import MapGL from 'react-map-gl';
import HTMLOverlay from 'react-map-gl/dist/overlays/html.react.js';
import SVGOverlay from 'react-map-gl/dist/overlays/svg.react.js';
import Dimensions from 'react-dimensions';
import ViewportMercator from 'viewport-mercator-project';

const CONFIG = {
  'mapStyle': 'mapbox://styles/mapbox/basic-v9',
  'mapboxApiAccessToken': 'pk.eyJ1IjoibmFyZW5kcmFzaGV0dHkiLCJhIjoiY2l3am9veHJ2MDAwbDJ0cjI1NTkyM3llNSJ9.l2l38Z5jAyCO0_aOE-ABlA',
  'zoom': 12.011557070552028,
  'startDragLngLat': null,
  'isDragging': null
};

function round(x, n) {
  const tenN = Math.pow(10, n);
  return Math.round(x * tenN) / tenN;
}

export const Map = React.createClass({

  getInitialState() {
    return {
      'isLoading': true,
      'viewport': {}
    };
  },

  componentDidMount() {
    this.setup(this.props);
  },

  componentWillReceiveProps(nextProps) {
    this.setup(nextProps);
  },

  setup(props) {
    let latitude = this.props.sourceLocation[1];
    let longitude = this.props.sourceLocation[0];
    let height = this.props.containerHeight;
    let width = this.props.containerWidth;


    if (this.props.destinationLocation) {
      let diff = [
        Math.abs(this.props.sourceLocation[0] - this.props.destinationLocation[0]) / 2,
        Math.abs(this.props.sourceLocation[1] - this.props.destinationLocation[1]) / 2
      ];

      let center = [
        this.props.destinationLocation[0] + diff[0],
        this.props.destinationLocation[1] + diff[1]
      ];

      if (this.props.sourceLocation[0] < this.props.destinationLocation[0]) {
        center[0] = this.props.sourceLocation[0] + diff[0];
      }

      if (this.props.sourceLocation[1] < this.props.destinationLocation[1]) {
        center[1] = this.props.sourceLocation[1] + diff[1];
      }
      latitude = center[1];
      longitude = center[0];
      height = this.props.containerHeight / 2;
    }

    this.setState({
      'viewport': {
        ...CONFIG,
        width,
        height,
        latitude,
        longitude
      },
      'isLoading': false
    });
  },

  renderPath(config) {
    const sourcePixel = config.project(this.props.sourceLocation);
    const destinationPixel = config.project(this.props.destinationLocation);

    let diff = Math.abs(sourcePixel[0] - destinationPixel[0]) / 2;
    let center = destinationPixel[0] + diff;

    if (sourcePixel[0] < destinationPixel[0]) {
      center = sourcePixel[0] + diff;
    }

    let altitude = destinationPixel[1] - (this.state.viewport.zoom * 2);

    let d = `M ${sourcePixel[0] + 5} ${sourcePixel[1] + 5} Q ${center} ${altitude} ${destinationPixel[0] + 5} ${destinationPixel[1] + 5}`;
    return (
      <path
        id="arc1"
        fill="none"
        stroke="#446688"
        strokeWidth="2"
        d={d}
      >
      </path>
    );
  },

  renderDots(config) {
    const sourceProject = config.project(this.props.sourceLocation);
    return (
      <div>
        <div className="marker" style={{
          'top': sourceProject[1],
          'left': sourceProject[0]
        }}>
          <div className="ring"></div>
        </div>

        {(() => {
          if (this.props.destinationLocation) {
            const destinationProject = config.project(this.props.destinationLocation);
            return (
              <div className="marker" style={{
                'top': destinationProject[1],
                'left': destinationProject[0]
              }}>
              </div>
            );
          }
        })()}
      </div>
    );
  },

  renderOverlay() {
    return (
      <div>
        <HTMLOverlay
          width={this.state.viewport.width}
          height={this.state.viewport.height}
          isDragging={false}
          redraw={this.renderDots}
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

          {(() => {
          if (this.props.destinationLocation) {
            return (
              <SVGOverlay
                width={this.state.viewport.width}
                height={this.state.viewport.height}
                latitude={this.state.viewport.latitude}
                longitude={this.state.viewport.longitude}
                zoom={this.state.viewport.zoom}
                isDragging={false}
                redraw={this.renderPath}
              />
            );
          }
        })()}
      </div>
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
    if (this.props.isOnline) {
      return (
        <MapGL
          {...this.state.viewport}
          onChangeViewport={(newViewport) => {
            this.setState({
              'viewport': Object.assign({}, this.state.viewport, newViewport)
            });
          }}
        >
          {this.renderOverlay()}
        </MapGL>
      );
    } else {
      return this.renderOffline();
    }
  },

  renderOffline() {
    return (
      <div className="map__offline">
        You need Internet access to access Map :(
      </div>
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

export default Dimensions()(Map);