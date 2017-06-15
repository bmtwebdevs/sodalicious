import React, { Component } from 'react';

import Hero from '../hero';
import DrinkSelector from '../drinkSelector';

import 'bootstrap/dist/css/bootstrap.css'

class Home extends Component {
 
  render() {
    return (
      <div className='Home'>
          <DrinkSelector/>
      </div>
    );
  }
}

export default Home;
