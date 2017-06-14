import React, { Component } from 'react';
import logo from '../../resources/logo.svg';
import './style.css';

import DrinksCatalog from '../../containers/drinksCatalogContainer'

class App extends Component {
  render() {
    return (      
      <div className="App">
        <div className="jumbotron">
          <h1>#Sodalicious</h1>
          <p>An Alexa controlled smart drinks mixer for the technogeek-connoisseur powered by <b>British Mixology Technology</b></p>
          <p><a className="btn btn-danger btn-lg" href="#" role="button">Make a drink</a></p>
        </div>
        <DrinksCatalog />
      </div>
    );
  }
}

export default App;
