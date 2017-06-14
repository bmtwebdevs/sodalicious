import React, { Component } from 'react';
import SelectedFoods from './SelectedFoods';
import FoodSearch from './FoodSearch';
import Hero from './components/hero/hero';
import DrinkSelector from './components/drinkSelector/drinkSelector';
import Footer from './components/footer/footer';

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

  render() {
    return (
      <div className='Home'>
        <Hero/>
        <DrinkSelector/>
        <div className='ui text container'>
          <SelectedFoods
            foods={selectedFoods}
            onFoodClick={this.removeFoodItem}
          />
          <FoodSearch
            onFoodClick={this.addFood}
          />
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Home;
