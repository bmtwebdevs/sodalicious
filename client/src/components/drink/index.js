import React, { Component } from 'react';

import './style.css';

/* NOT IN USE CURRENTLY */

class Drink extends Component {

  render() {
    var path = this.props.image ? 'url(drink_images/' + this.props.image + ')' : null;

    return (
      <li className="Drink" >
        <div className="drinkImage" style={{backgroundImage: path}} onClick={this.props.onSelect} id={this.props._id}>
          <span className="drinkName">{this.props.name}</span>
          </div>
      </li>
    );
  }
}

export default Drink;