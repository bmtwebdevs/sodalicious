import React, { Component } from 'react';
import Hero from './components/hero';

class App extends Component {
  
  render() {
    return (
      <div className='App'>
        <Hero />
        {this.props.children}
      </div>
    );
  }
}

export default App;
