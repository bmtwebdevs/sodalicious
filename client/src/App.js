import React, { Component } from 'react';
import SelectedFoods from './SelectedFoods';
import FoodSearch from './FoodSearch';
import Hero from './components/hero/hero';
import DrinkSelector from './components/drinkSelector/drinkSelector';
import Footer from './components/footer/footer';

class App extends Component {
  
  render() {
    return (
      <div className='App'>
        {this.props.children}
      </div>
    );
  }
}

export default App;
