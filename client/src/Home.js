import React, { Component } from 'react';

import Hero from './components/hero';
import DrinkSelector from './components/drinkSelector';
import Footer from './components/footer';

import 'bootstrap/dist/css/bootstrap.css'

class Home extends Component {
 
  render() {
    return (
      <div className='Home'>
        <Hero/>
        <DrinkSelector/>
        <div className='ui text container'>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Home;
