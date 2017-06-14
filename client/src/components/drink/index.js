import React, { Component } from 'react';

import './style.css';

class Drink extends Component {

  render() {
    return (
      <li className="Drink">
        <h3 className="name">{this.props.name}</h3>
        
        <span className="description">{this.props.description}</span>
      </li>
    );
  }
}

export default Drink;