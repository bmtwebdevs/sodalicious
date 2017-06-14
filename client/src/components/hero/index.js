import React, { Component } from 'react';
import './style.css';

class Hero extends Component {
  render() {
    return (
      <div className="Hero">
        <div className="jumbotron">
          <h1><img src="favicon.ico" style={{height:'100px'}} /> #Sodalicious</h1>
          <p>An Alexa controlled smart drinks mixer for the technogeek-connoisseur powered by <b>British Mixology Technology</b></p>
        </div>
      </div>
    );
  }
}

export default Hero;
