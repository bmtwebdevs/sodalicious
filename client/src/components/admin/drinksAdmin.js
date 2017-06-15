
import React, {Component}  from 'react';
import Client from '../../clients/Drink';
import Drink from './drink';
  
const getKey = () => {
  return Math.random().toString(36).substr(2, 10);
}

const defaultDrink = { 
  _id : undefined,
  name : '', 
  description : '', 
  image : '', 
  ingredients : [{
    _id: getKey(),
    name : '',
    amount : ''
  }] 
}

class DrinksAdmin extends Component {

  state = {
    drinks: [],
    selectedDrink: Object.assign({}, defaultDrink)
  };

  componentWillMount = () => {
    this.updateDrinks();
  }
  
  updateDrinks = (response) => {    
    Client.search('', this.drinksFetched);
  }

  drinksFetched = (drinks) => {
    this.setState({
      drinks,
      selectedDrink : Object.assign({}, defaultDrink)
    });
  }

  saveDrink = (e) => {
    var drink = Object.assign({}, this.state.selectedDrink);
    Client.upsert(drink, this.updateDrinks);
    e.preventDefault();
  }

  selectDrink = (e) => {
    let select = e.target;
    let option = select.selectedOptions[0];
    let potentialDrinks = this.state.drinks.filter(drink => drink._id === option.value);  
    let drink = potentialDrinks.length > 0 ? potentialDrinks[0] : defaultDrink;
    
    this.setState({
      selectedDrink: Object.assign({}, drink)
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

  addIngredient = (e) => {
    this.setState((prevState, props) => {
      let drink = Object.assign({}, prevState.selectedDrink);
      drink.ingredients = drink.ingredients.concat([{ _id: getKey(), name: '', amount: '' }]);
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
      <div className="admin-drink">
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

export default DrinksAdmin;