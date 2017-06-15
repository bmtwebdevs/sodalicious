import React, { Component } from 'react';

import Hero from '../hero';
import DrinkSelector from '../drinkSelector';
import Footer from '../footer';

import 'bootstrap/dist/css/bootstrap.css'

class Home extends Component {
 
  render() {
    return (
      <div className='Home'>
        <DrinkSelector/>
        <div className='ui text container'>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Home;
