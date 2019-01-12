import React from 'react';

// List of bike racks
class RackList extends React.Component {

  render() {

      return (
        <div className={`rack-list ${this.props.racks.length==0 ? "hidden" : "shown"}`}>
          <h2>Racks on {this.props.currentStreet}</h2>
          {/* hide if no racks */}
          <ul>
            {this.props.racks.map((rack,i)=>{

                // Construct address
                const address = `${rack.Number} ${rack.Name}, Vancouver BC, Canada`;

                return (
                    <li key={rack.id}>
                      <div className="rack-address" >{address}</div>
                      <div className="rack-side" >{rack.Side}</div>
                    </li>
                  );
                }
              )
            }
          </ul>
        </div>
      );
  }
}

export default RackList;
