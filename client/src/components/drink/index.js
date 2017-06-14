import React, { Component } from 'react';

import './style.css';

class Drink extends Component {

  render() {
    return (
      <li className="Drink">
        <h3 className="name">{this.props.name}</h3>
        <img className="photo" src={this.props.image} />
        <span className="description">{this.props.description}</span>
      </li>
    );
  }
}

export default Drink;