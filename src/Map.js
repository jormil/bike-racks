import React from 'react';

// Import Map module
import MapTools from './MapTools';

// Tools for updating the map
const mapTools = new MapTools();

class Map extends React.Component {

  // Setup map
  componentDidMount(){

    // Get the map to render to DOM
    const map = mapTools.initializeMap();
  }

  render() {
    // Go through racks and create new markers, fly to bounding box
    mapTools.refreshRacks(this.props.racks);

    return (
      <div className="map-container">
        <div id="map"></div>
      </div>
    );
  }
}

export default Map;
