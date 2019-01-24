import React from 'react';

// List of streets
class StreetList extends React.Component {

  render() {

    return (

      // onSubmit is used for datalist
      <form onSubmit={(event)=>(this.props.changeStreet(event))}>

        <label htmlFor="street-select">Choose a street:</label>
        <select id="street-select" className="street-list" onChange={(event)=>(this.props.changeStreet(event))}>
          {this.props.streets.map((street,i) => {

            return <option key={street.Name + i}>{street.Name}</option>;

          })}
        </select>

        {/* Datalist is not supported by Safari */}
        <label htmlFor="street-data-list-input">Or search:</label>
        <input list="street-data-list" className="street-list" id="street-data-list-input"></input>
        <datalist id="street-data-list">
          {this.props.streets.map((street,i) => {

            return <option key={street.Name + i}>{street.Name}</option>;

          })}
        </datalist>
        <input type="submit" value="submit"></input>
      </form>
    );
  }
}

export default StreetList;
