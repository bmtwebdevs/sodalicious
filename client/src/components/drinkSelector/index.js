import React, { Component } from 'react';

import DrinkClient from '../../clients/Drink';

import './style.css';

var jquery = require("jquery");

class DrinkSelector extends Component {
  state = {
    drinks: [],
    searchValue: '',
    drink: '',
    drinkName: '',
    size: 0
  }

  componentDidMount() {
    DrinkClient.search('', (drinks) => {
      this.setState({
        drinks: drinks
      });
    });
  }

  handleSearchChange = (e) => {
    const value = e.target.value;

    this.setState({
      searchValue: value,
    });

    DrinkClient.search(value, (drinks) => {
      this.setState({
        drinks: drinks
      });
    });
  }

  pickDrink(id, name) {
    this.setState({
      drink: id,
      drinkName: name
    });

    setTimeout(function () {
      var scrollTo = jquery('#sizeBar')

      jquery('html,body').animate({ scrollTop: scrollTo.offset().top });
    }, 200);
  }

  canMake() {
    return (this.state.drink.length > 0 && this.state.size > 0);
  }

  pickSize(size) {
    this.setState({
      size: size
    });

    setTimeout(function () {
      var scrollTo = jquery('#makeBar')

      jquery('html,body').animate({ scrollTop: scrollTo.offset().top });
    }, 200);
  }

  makeDrink(event) {
    if (this.state.drink.length > 0 && this.state.size > 0) {
      DrinkClient.make(this.state.drink, this.state.size);
    }
  }

  newDrink(drink) {
    var path = drink.image ? 'url(drink_images/' + drink.image + ')' : null;

    return (
      <li className={this.state.drink === drink._id ? 'Drink activeDrink' : 'Drink'} key={drink._id}>
        <div className="drinkImage" style={{ backgroundImage: path }} onClick={() => this.pickDrink(drink._id, drink.name)} id={drink._id}>
          <span className="drinkName">{drink.name}</span>
        </div>
      </li>
    );
  }

  render() {
    const { drinks } = this.state;

    const listItems = drinks.map((drink, index) =>
      // Correct! Key should be specified inside the array.
      this.newDrink(drink)
    );

    var message = '"Yo bartender!"';

    if (this.canMake()) {
      var sizeQ = '';
      switch (this.state.size) {
        case 20:
          sizeQ = 'shot of ';
          break;
        case 100:
          sizeQ = 'small ';
          break;
        case 300:
          sizeQ = 'large ';
          break;
        case 200:
        default:
          sizeQ = 'regular ';
      }
      message = "\"Yo bartender! Ill have a " + sizeQ + this.state.drinkName + " please!\"";
    }

    return (
      <div>
        <div className="alert">
          <div className="barInner">
            <h2>Choose your drink...</h2>
            <div className="ui input focus search">
              <input className='prompt' type='text' placeholder='Search drinks...' value={this.state.searchValue} onChange={this.handleSearchChange} />
            </div>
          </div>
        </div>

        <div className="Drinks">
          <ul>
            {listItems}
          </ul>
          <div style={{ clear: "both" }} />
        </div>

        <div id="sizeBar" className="alert" style={{ display: this.state.drink.length > 0 ? 'block' : 'none' }}>
          <div className="bar">
            <div className="barInner">
              <h2>Choose the size...</h2>
            </div>
          </div>

          <div className="buttons">
            <button onClick={() => this.pickSize(20)} className={this.state.size === 20 ? 'btn btn-lg btn-primary' : 'btn btn-lg btn-default'} id="20">Shot</button>&nbsp;
          <button onClick={() => this.pickSize(100)} className={this.state.size === 100 ? 'btn btn-lg btn-primary' : 'btn btn-lg btn-default'} id="100">Small</button>&nbsp;
          <button onClick={() => this.pickSize(200)} className={this.state.size === 200 ? 'btn btn-lg btn-primary' : 'btn btn-lg btn-default'} id="200">Medium</button>&nbsp;
          <button onClick={() => this.pickSize(300)} className={this.state.size === 300 ? 'btn btn-lg btn-primary' : 'btn btn-lg btn-default'} id="300">Large</button>
            <br /><br />
          </div>
        </div>

        <div id="makeBar" style={{ display: this.state.drink.length > 0 && this.state.size > 0 ? 'block' : 'none' }}>
          <div className="buttons">
            <br />
            <h1><i>{message}</i></h1>
            <br /><br />
            <button onClick={() => this.makeDrink()} className="btn btn-lg btn-success">Make Drink</button>
            <br /><br />
          </div>
        </div>
      </div>
    );
  }
}

export default DrinkSelector;