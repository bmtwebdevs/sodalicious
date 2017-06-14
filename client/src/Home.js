import React, { Component } from 'react';

import SelectedFoods from './SelectedFoods';
import FoodSearch from './FoodSearch';
import Hero from './components/hero';
import DrinkSelector from './components/drinkSelector';
import Footer from './components/footer';

import Pump from './clients/Pump';

import 'bootstrap/dist/css/bootstrap.css'

class Home extends Component {
  state = {
    selectedFoods: [],
  }

  removeFoodItem = (itemIndex) => {
    const filteredFoods = this.state.selectedFoods.filter(
      (item, idx) => itemIndex !== idx,
    );
    this.setState({ selectedFoods: filteredFoods });
  }

  addFood = (food) => {
    const newFoods = this.state.selectedFoods.concat(food);
    this.setState({ selectedFoods: newFoods });
  }

  pumpOn = () => {
    Pump.on(0, (result) => {
        
    });
  }

  pumpOff = () => {
    Pump.off(0, (result) => {
        
    });
  }

  render() {
    return (
      <div className='Home'>
        <Hero/>
        <DrinkSelector/>
        <div className='ui text container'>
          
          <button onClick={this.pumpOn} title="Pump On">On</button>
          <button onClick={this.pumpOff} title="Pump Off">Off</button>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Home;
