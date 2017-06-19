import React, { Component } from 'react';
import './style.css';
var jquery = require("jquery");

class Hero extends Component {
  scrollToSelectDrink() {
    setTimeout(function () {
      var scrollTo = jquery('#selectDrink')

      jquery('html,body').animate({ scrollTop: scrollTo.offset().top });
    }, 200);
  }

  render() {
    return (
      <div className="hero">
        <div className="overlay"></div>
        <div className="header">
          <h1><img src="favicon.ico" style={{ height: '100px' }} /> #Sodalicious</h1>
          <p>An Alexa controlled smart drinks mixer for the technogeek-connoisseur powered by <b>British Mixology Technology</b></p>
          <button  className={'btn btn-lg btn-make'} id="300" onClick={() => this.scrollToSelectDrink()}>Make a drink</button>
        </div>
      </div>
    );
  }
}
export default Hero;