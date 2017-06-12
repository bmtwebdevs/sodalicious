import React, { Component } from 'react';
import logo from '../../resources/logo.svg';
import './style.css';

import DrinksCatalog from '../../containers/drinksCatalogContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <DrinksCatalog />
      </div>
    );
  }
}

export default App;
