import React from 'react';
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import Sidebar from 'react-sidebar';

export const Splash = React.createClass({

  componentDidMount() {
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition((pos) => {
        
    //   });
    // }
  },

  render() {
    return (
      <div className="fullWidth fullHeight">
        <div className='fullWidth fullHeight map'></div>
        <div className="searchBox"></div>
        <div className="nav"></div>
      </div>
    );
  }
});

export default Splash;