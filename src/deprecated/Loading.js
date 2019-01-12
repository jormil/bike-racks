import React from 'react';


class Loading extends React.Component {

  render() {

    if (this.props.loaded)
    {
      return (
        <div className="loaded">loading!</div>
      );
    }
    else {
      return (
        <div className="loading">loading!</div>
      );
    }

  }

}

export default Loading;
