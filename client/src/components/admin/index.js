
import React, {Component}  from 'react';
import Client from '../../Client';
import Drink from './drink';

const defaultDrink = { 
  _id : undefined,
  name : '', 
  description : '', 
  image : '', 
  ingredients : [{
    _id: undefined,
    name : '',
    amount : ''
  }] 
}

class Admin extends Component {

  state = {
    drinks: [],
    selectedDrink: defaultDrink
  };

  componentWillMount = () => {
    Client.search('', this.drinksFetched);
  }

  drinksFetched = (drinks) => {
    this.setState({
      drinks,
      selectedDrink : Object.assign({}, defaultDrink)
    });
  }

  selectDrink = (e) => {
    let select = e.target;
    let option = select.selectedOptions[0];
    let drink = Object.assign({}, defaultDrink);
    let potentialDrinks = this.state.drinks.filter(drink => drink._id === option.value);  
    if(potentialDrinks.length > 0){
      drink = potentialDrinks[0];
    }
    this.setState({
      selectedDrink: drink
    });    
  }
  
  changeDrinkField = (e, field) => {
    var value = e.target.value;    
    this.setState((prevState, props) => {
      let drink = Object.assign({}, prevState.selectedDrink);
      drink[field] = value;
      return { selectedDrink : drink };
    });    
  }
  
  changeIngredientField = (e, ingredientId, field) => {
    var value = e.target.value;    
    this.setState((prevState, props) => {
      let drink = Object.assign({}, prevState.selectedDrink);
      let ingredient = null;
      let potentialIngredient = drink.ingredients.filter(ingredient => ingredient._id === ingredientId);
      if(potentialIngredient.length > 0){
        ingredient = potentialIngredient[0];
        ingredient[field] = value;
      }
      return { selectedDrink : drink };
    });  
  }

  saveDrink = (e) => {
    this.setState((prevState, props) => {
      console.info(prevState.selectedDrink);
    });
    e.preventDefault();
  }

  addIngredient = (e) => {
    this.setState((prevState, props) => {
      let drink = Object.assign({}, prevState.selectedDrink);
      drink.ingredients = drink.ingredients.concat([{ _id: Math.random().toString(36).substr(2, 5), name: '', amount: '' }]);
      return { selectedDrink: drink };
    });
    e.preventDefault();
  }

  removeIngredient = (e, id) => {
    this.setState((prevState, props) => {
      let drink = Object.assign({}, prevState.selectedDrink);
      drink.ingredients = drink.ingredients.filter(ingredient => ingredient._id !== id);
      return { selectedDrink: drink };
    });
    e.preventDefault();
  }

  render = () => {
    return (
      <div className="addDrink">
        <form className="form form-horizontal">
          <h1>Mod your drink!</h1>
          <div className="form-group">
            <label className="control-label col-sm-2">Choose</label>
            <div className="col-sm-8">
              <select 
                className="form-control"
                onChange={this.selectDrink.bind(this)}>
                <option value="" default>New Drink</option>            
                {(this.state.drinks.map(drink => <option key={drink._id} value={drink._id}>{drink.name}</option>))}
              </select>
            </div>
          </div>
          { <Drink 
              {...this.state.selectedDrink} 
              onSave={this.saveDrink} 
              onDrinkFieldChange={this.changeDrinkField}
              onIngredientFieldChange={this.changeIngredientField}
              onAddIngredient={this.addIngredient} 
              onRemoveIngredient={this.removeIngredient} /> }
        </form>
      </div>    
    )
  }
}

export default Admin;