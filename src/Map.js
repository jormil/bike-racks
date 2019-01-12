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

  // Update markers and fly to correct spot
  componentDidUpdate(){

    // nullify old markers
    mapTools.resetMarkers();
    // Go through racks and create new markers, fly to bounding box
    mapTools.markRacks(this.props.racks);
  }

  render() {

    return (
      <div className="map-container">
        <div id="map"></div>
      </div>
    );
  }
}

export default Map;
