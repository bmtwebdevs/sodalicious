import React, { Component } from 'react';
import logo from '../../resources/logo.svg';
import './style.css';

import DrinksCatalog from '../../containers/drinksCatalogContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="hero-image">
          <div className="hero-text">
            <h1>#Sodalicious</h1>
            <p>An Alexa controlled smart drinks mixer for the technogeek-connoisseur powered by <b>British Mixology Technology</b></p>
            <button>Make a drink</button>
          </div>
        </div>
        <DrinksCatalog />
      </div>
    );
  }
}

export default App;
