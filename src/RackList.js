import React from 'react';

// List of bike racks
class RackList extends React.Component {

  render() {

      return (
        // hide if no racks
        <ul className={`rack-list ${this.props.racks.length==0 ? "hidden" : "shown"}`}>
          {this.props.racks.map((rack,i)=>{

              // Construct address
              const address = `${rack.Number} ${rack.Name}, Vancouver BC, Canada`;

              return (
                  <li key={address+i}>
                    <div className="rack-address" >{address}</div>
                    <div className="rack-side" >{rack.Side}</div>
                  </li>
                );
              }
            )
          }
        </ul>
      );
  }
}

export default RackList;
