import React, { Component } from 'react';

import Hero from './components/hero';
import DrinkSelector from './components/drinkSelector';
import Footer from './components/footer';

import PumpClient from './clients/Pump';

import 'bootstrap/dist/css/bootstrap.css'

class Home extends Component {
 
  pumpOn = () => {
    PumpClient.on(0, (result) => {
        
    });
  }

  pumpOff = () => {
    PumpClient.off(0, (result) => {
        
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
