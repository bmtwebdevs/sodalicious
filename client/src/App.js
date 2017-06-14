import React, { Component } from 'react';
import SelectedFoods from './SelectedFoods';
import FoodSearch from './FoodSearch';

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
