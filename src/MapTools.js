// MAPBOX stuff
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9yZGFubWlsbGVyIiwiYSI6ImNqcW41bTZxZjdlc3I0MnBkcWtrc2xlYW8ifQ.SBX1hj-2nItwHZatTC72Dw';

// GEOCODING STUFF
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

class MapTools {
    constructor() {

      this.mapboxgl = mapboxgl;

      // markers of racks of current street 
      this.markers = [];

      this.geocodingClient = mbxGeocoding({ accessToken: 'pk.eyJ1Ijoiam9yZGFubWlsbGVyIiwiYSI6ImNqcW41bTZxZjdlc3I0MnBkcWtrc2xlYW8ifQ.SBX1hj-2nItwHZatTC72Dw' });

        //This binding
        this.markRacks = this.markRacks.bind(this);
    }

    // create map and return it for dom
    initializeMap() {

      // New map
      this.map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v10',
          center: [0,0],
          zoom: 12,
          maxZoom: 15
      });

      // Send the map to Vancouver
      this.geocodingClient.forwardGeocode({

          query: `Vancouver BC, Canada`,
          limit: 1
        })
        .send()
        .then(response => {

          const x = response.body.features[0].center[0];
          const y = response.body.features[0].center[1];

          this.map.setCenter([x,y]);

        });

      // return for dom
      return this.map;

    }

    // wipe all markers
    resetMarkers() {

      this.markers.map((marker)=>{
        // Remove from the map
        marker.remove();
      });

      // Get rid of all markers
      this.markers = [];
    }

    // Create marks for racks, fly to that location
    markRacks(racks) {

      racks.map(rack=>{

        // Geocode address of each rack to make a marker
        this.geocodingClient.forwardGeocode({
            // Compose address
            query: `${rack.Number} ${rack.Name}, Vancouver BC, Canada`,
            limit: 1
          })
          .send()
          .then(response => {

            const xr = response.body.features[0].center[0];
            const yr = response.body.features[0].center[1];

             // New marker
              let marker = new this.mapboxgl.Marker() // initialize a new marker
              .setLngLat([xr, yr])
              .addTo(this.map);

              // Push this new marker onto array of markers
              this.markers.push(marker);

              if(this.markers.length==racks.length){

                  // Get least and greatest markers
                  this.map.fitBounds([
                    [
                      Math.min(...(this.markers.map(marker=>(marker.getLngLat().toArray()[0]))))
                      ,
                      Math.min(...(this.markers.map(marker=>(marker.getLngLat().toArray()[1]))))
                    ],
                    [
                      Math.max(...(this.markers.map(marker=>(marker.getLngLat().toArray()[0]))))
                      ,
                      Math.max(...(this.markers.map(marker=>(marker.getLngLat().toArray()[1]))))
                    ]
                  ]);
              }

          });
      });
    }
  }

export default MapTools;
