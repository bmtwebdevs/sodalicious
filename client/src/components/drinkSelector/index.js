import React, { Component } from 'react';

import Drink from '../drink';
import Client from '../../clients/Client';

import './style.css';

class DrinkSelector extends Component {
  state = {
    drinks: [],
    searchValue: ''
  }

  componentDidMount() {
    Client.search('', (drinks) => {
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
    
    Client.search(value, (drinks) => {
        this.setState({
          drinks: drinks
        });
      });
  }

  render() {
    const { drinks } = this.state;

  const listItems = drinks.map((drink, index) =>
    // Correct! Key should be specified inside the array.
    <Drink key={drink._id} {...drink} />
  );

    return (
      <div>
      <input className='prompt'
                      type='text'
                      placeholder='Search drinks...'
                      value={this.state.searchValue}
                      onChange={this.handleSearchChange}
                    />
                    
      <div className="Drinks">
        <ul>
          {listItems}
        </ul>
        <div style={{clear: "both"}} />
      </div>
      </div>
    );
  }
}

export default DrinkSelector;