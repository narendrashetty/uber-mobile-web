import React from 'react';
import { hashHistory } from 'react-router';
import MapGL from 'react-map-gl';
import HTMLOverlay from 'react-map-gl/dist/overlays/html.react.js';
import SVGOverlay from 'react-map-gl/dist/overlays/svg.react.js';
import Dimensions from 'react-dimensions';
import ViewportMercator from 'viewport-mercator-project';
import ObjectAssign from 'object-assign';

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
      'viewport': {},
      'pathTotalLength': 0
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
    let pathTotalLength = this.state.pathTotalLength;


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
      height = this.props.containerHeight - 334;
      pathTotalLength = this.refs.svg.refs.path.getTotalLength();
    }

    this.setState({
      'viewport': {
        ...CONFIG,
        width,
        height,
        latitude,
        longitude,
      },
      pathTotalLength,
      'isLoading': false
    });
  },

  renderPath(config) {
    const sourcePixel = config.project(this.props.sourceLocation);
    const destinationPixel = config.project(this.props.destinationLocation);

    let centerX = Math.abs(sourcePixel[0] + destinationPixel[0]) / 2;
    let centerY = Math.abs(sourcePixel[1] + destinationPixel[1]) / 2;

    if (sourcePixel[0] > destinationPixel[0] && sourcePixel[1] >= destinationPixel[1]) {
      centerX += (sourcePixel[1] - centerY);
      centerY -= (sourcePixel[1] - centerY);
    } else if (sourcePixel[0] <= destinationPixel[0] && sourcePixel[1] < destinationPixel[1]) {
      centerX += (destinationPixel[1] - centerY);
      centerY -= (destinationPixel[1] - centerY);
    }


    if (sourcePixel[0] < destinationPixel[0] && sourcePixel[1] >= destinationPixel[1]) {
      centerX += (sourcePixel[1] - centerY);
      centerY -= (sourcePixel[1] - centerY);
    } else if (sourcePixel[0] > destinationPixel[0] && sourcePixel[1] < destinationPixel[1]) {
      centerX -= (destinationPixel[1] - centerY);
      centerY -= (destinationPixel[1] - centerY);
    }

    let d = `M ${sourcePixel[0]} ${sourcePixel[1]} Q ${centerX} ${centerY} ${destinationPixel[0]} ${destinationPixel[1]}`;
    return (
      <svg>
        <path
          id="arc1"
          fill="none"
          stroke="#000"
          strokeWidth="3"
          d={d}
          className="path2"
        >
        </path>
        <path
          id="arc1"
          fill="none"
          stroke="#000"
          strokeWidth="3"
          d={d}
          ref="path"
          className="path"
          style={{
            'strokeDasharray': this.state.pathTotalLength,
            'strokeDashoffset': this.state.pathTotalLength
          }}
        >
        </path>
      </svg>
    );
  },

  renderDots(config) {
    const sourceProject = config.project(this.props.sourceLocation);

    if (this.props.destinationLocation) {
      const destinationProject = config.project(this.props.destinationLocation);
      return (
        <div>
          <div className="marker marker--dark" style={{
            'top': sourceProject[1],
            'left': sourceProject[0]
          }}>
          </div>

          <div className="marker marker--dark marker--destination" style={{
            'top': destinationProject[1],
            'left': destinationProject[0]
          }}>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="marker" style={{
            'top': sourceProject[1],
            'left': sourceProject[0]
          }}>
            <div className="ring"></div>
          </div>
        </div>
      );
    }
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
                ref="svg"
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
            let pathTotalLength = this.state.pathTotalLength;
            if (this.props.destinationLocation) {
              pathTotalLength = this.refs.svg.refs.path.getTotalLength();
            }
            this.setState({
              'viewport': ObjectAssign({}, this.state.viewport, newViewport),
              pathTotalLength
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