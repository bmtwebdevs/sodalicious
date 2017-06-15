
import React, {Component}  from 'react';
import PumpClient from '../../clients/Pump';
import DrinkClient from '../../clients/Drink';
import Pump from './pump';

class PumpsAdmin extends Component {
  
  state = {
    pumps: [],
    ingredients: [],
  };

  componentWillMount = () => {
    this.updatePumps();
  }
  
  updatePumps = (response) => {    
    PumpClient.search('', this.pumpsFetched);
  }
  
  pumpsFetched = (pumps) => {    
    DrinkClient.search('', (drinks) => this.dataFetched(pumps, drinks));
  }

  dataFetched = (pumps, drinks) => {
    let ingredientArrays = drinks.map(drink => drink.ingredients);
    let ingredientsMerged = [].concat.apply([], ingredientArrays);
    let ingredients = Array.from(new Set(ingredientsMerged.map(ingredient => ingredient.name)));
    ingredients = ingredients.sort((x, y) => {
      return x < y ? -1 : x > y ? 1 : 0;
    
    });
    ingredients.unshift('');
    
    this.setState((prevState, props) => {
      return{
        pumps,
        ingredients
      }
    });
  }

  savePump = (e, id) => {
    let pump = this.state.pumps.filter(pump => pump._id === id);
    pump = Object.assign({}, pump);
    PumpClient.upsert(pump, this.updatePumps);
    e.preventDefault();
  }
  
  onIngredientChange = (e, id) => {
    var value = e.target.value;    
    this.setState((prevState, props) => {      
      let pumps = Array.from(prevState.pumps);
      let pump = pumps.filter(pump => pump._id === id)[0];
      pump.amount = value;
      return { pumps : pumps };
    });  
    e.preventDefault();
  }

  render = () => {
    return (
      <div className="edit-pump">
        <form className="form form-horizontal">
          <h1>Sort out your pumps! </h1>          
          { this.state.pumps.map(pump => <Pump {...pump} 
                                           key={pump._id}
                                           ingredients={this.state.ingredients}
                                           onIngredientChange={this.onIngredientChange}
                                           onPumpUpdate={this.savePump} />)}
        </form>
      </div>      
    )
  }

}

export default PumpsAdmin;