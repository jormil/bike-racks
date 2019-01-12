import React from 'react';

// Components
import StreetList from './StreetList';
import RackList from './RackList';
import Map from './Map';

// Axios for AJAX
import axios from 'axios';

// Font awesome stuff
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBicycle } from '@fortawesome/free-solid-svg-icons';
library.add(faBicycle);


class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      streets:this.props.streets,
      racks:[],
    }

    // binding 'this'
    this.changeStreet=this.changeStreet.bind(this);
  }

  // Choosing a street
  changeStreet(event) {

    event.preventDefault();

    // Get streetname from selected option.
    let streetName;

    // select list
    if(event.type=="change"){
      streetName = event.target.value;
    }
    //datalist
    else if (event.type=="submit"){
      streetName = event.target.querySelector("#street-data-list-input").value;

      // If no street chosen, do nothing
      if(streetName=="")
      {
        return;
      }
    }

    // Get racks for this street
    axios.get('/streets/' + streetName)
       .then(resp => {

         let racks = resp.data;

         // Update racks
         this.setState({
            racks:racks,
         });

    })
    .catch(console.error);
  }

  render(){
    return (
        <div>
          <header>
            <h1>Bike Rack Locator<FontAwesomeIcon icon="bicycle" className="h1-bike"/></h1>
            <div className="chooser">
              <StreetList streets={this.state.streets} changeStreet={this.changeStreet}/>
            </div>
          </header>
        <RackList racks={this.state.racks}/>
        <Map racks={this.state.racks}/>
      </div>
    );
  }
}

export default App;
