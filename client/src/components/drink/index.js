import React, { Component } from 'react';

import './style.css';

class Drink extends Component {

  render() {
    var path = this.props.image ? 'url(drink_images/' + this.props.image + ')' : null;

    return (
      <li className="Drink">
        <div className="drinkImage" style={{backgroundImage: path}}>
          <span className="drinkName">{this.props.name}</span>
          </div>
      </li>
    );
  }
}

export default Drink;