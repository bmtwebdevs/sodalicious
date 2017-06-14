import React, { Component } from 'react';

import Drink from '../drink';
import DrinkClient from '../../clients/Drink' ;

import './style.css';

class DrinkSelector extends Component {
  state = {
    drinks: [],
    searchValue: '',
    drink: '',
    size: 100,
    canMake: false
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

  pickDrink(event) {
    this.setState({
      drink: event.target.id
    });

    this.updateCanMake();
  }

  updateCanMake() {
    if (this.state.drink.length > 0 && this.state.size > 0) {
      this.setState({
        canMake: true
      });
    }else {
      this.setState({
        canMake: false
      });
    }
  };

  pickSize(event) {
    this.setState({
      size: event.target.id
    });

    this.updateCanMake();
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
        <div className="drinkImage" style={{backgroundImage: path}} onClick={this.pickDrink.bind(this)} id={drink._id}>
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

    return (
      <div>
        <div className="bar"><h2>Drink</h2></div>
        <div className="buttons">
        <div className="ui input focus">
          
      <input className='prompt'
                      type='text'
                      placeholder='Search drinks...'
                      value={this.state.searchValue}
                      onChange={this.handleSearchChange}
                    />
        </div>
               </div>     
      <div className="Drinks">
        <ul>
          {listItems}
        </ul>
        <div style={{clear: "both"}} />
      </div>

      <div className="bar"><h2>Drink Size</h2></div>
      <div className="buttons">
      <button onClick={this.pickSize.bind(this)} className={this.state.size === 20 ? 'btn btn-lg btn-primary' : 'btn btn-lg btn-default'} id="20">Shot</button>&nbsp;
      <button onClick={this.pickSize.bind(this)} className={this.state.size === 100 ? 'btn btn-lg btn-primary' : 'btn btn-lg btn-default'} id="100">Small</button>&nbsp;
      <button onClick={this.pickSize.bind(this)} className={this.state.size === 200 ? 'btn btn-lg btn-primary' : 'btn btn-lg btn-default'} id="200">Medium</button>&nbsp;
      <button onClick={this.pickSize.bind(this)} className={this.state.size === 300 ? 'btn btn-lg btn-primary' : 'btn btn-lg btn-default'} id="300">Large</button>
      <br /><br />
      <button onClick={this.makeDrink.bind(this)} className={this.state.canMake ? 'btn btn-lg btn-success' : 'btn btn-lg btn-default'}>Make Drink</button>
      <br /><br />
      </div>
      </div>
    );
  }
}

export default DrinkSelector;