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
      loading:true,
      streets:[],
      currentStreet:null,
      racks:[],
    }

    // binding 'this' to changeStreet handler
    this.changeStreet=this.changeStreet.bind(this);
  }

  // Get data from API
  componentDidMount() {
    axios.get('/streets')
       .then(resp => {

      this.setState({
        loading:false,
        streets:resp.data
      });

    })
    .catch(console.error);
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

      // If no street chosen, do nothing!
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
            currentStreet:streetName,
         });

    })
    .catch(console.error);
  }

  render(){

    // use class + CSS to indicate loading
    const chooserClasses = `chooser ${this.state.loading ? 'loading' : 'loaded'}`;

      return (
          <div>
            <header>
              <h1>Bike Rack Locator<FontAwesomeIcon icon="bicycle" className="h1-bike"/></h1>
              <div className={chooserClasses}>
                <StreetList streets={this.state.streets} changeStreet={this.changeStreet}/>
              </div>
            </header>
          <RackList racks={this.state.racks} currentStreet={this.state.currentStreet}/>
          <Map racks={this.state.racks}/>
        </div>
      );
    //}
  }
}

export default App;
