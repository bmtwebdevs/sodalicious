import React, { Component } from 'react';
import './style.css';

class Hero extends Component {
  render() {
    return (
      <div className="Hero">
        <div className="jumbotron">
          <h1>#Sodalicious</h1>
          <p>An Alexa controlled smart drinks mixer for the technogeek-connoisseur powered by <b>British Mixology Technology</b></p>
          <p><a className="btn btn-danger btn-lg" href="#" role="button">Make a drink</a></p>
        </div>
      </div>
    );
  }
}

export default Hero;
