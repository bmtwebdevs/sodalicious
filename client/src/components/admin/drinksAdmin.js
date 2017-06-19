
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

class Admin extends Component {

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
  let filteredDrinks = drinks.filter(drink => drink.name === this.state.selectedDrink.name);
  let selectedDrink = Object.assign({}, defaultDrink);
  if(filteredDrinks.length > 0){
    selectedDrink = filteredDrinks[0];
  }

  this.setState({
    drinks,
    selectedDrink
  });
}

saveDrink = (e) => {
  let form = document.getElementById('form-drink');
  if(this.isFormValid(form)){
    var drink = Object.assign({}, this.state.selectedDrink);
    Client.upsert(drink, this.updateDrinks);   
    e.preventDefault(); 
  }  
}

isFormValid = (form) => {
  let isValid = form.checkValidity();

  for(var i = 0; i < form.length; i++){
    var input = form[i];
    if(form[i].checkValidity()){
      input.className = input.className.replace('invalid-input', '');
    }else{        
      form[i].className += ' invalid-input ';        
    }
  }

  return isValid;
}

removeDrink = (e) => {
  var drink = Object.assign({}, this.state.selectedDrink);
  Client.remove(drink, this.updateDrinks);
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
    <div className="addDrink">

    <div className="container">
    <div className="row">
    <h1>Make your poison!</h1>          
    </div>
    </div>
    <br />
    <div className="container">
    <div className="row">
    <form id="form-drink" className="form form-horizontal">
    <div className="well">
    <div className="form-group form-group-lg">
    <label className="control-label col-sm-2">Choose drink</label>

    <div className="col-sm-8">
    <select 
    className="form-control"
    value={this.state.selectedDrink._id}
    onChange={this.selectDrink.bind(this)}>
    <option value="" default>Craft your own</option>            
{(this.state.drinks.map(drink => <option key={drink._id} value={drink._id}>{drink.name}</option>))}
</select>
</div>
</div>
</div>
<div className="well">
{ <Drink 
{...this.state.selectedDrink} 
onSave={this.saveDrink} 
onRemove={this.removeDrink}
onDrinkFieldChange={this.changeDrinkField}
onIngredientFieldChange={this.changeIngredientField}
onAddIngredient={this.addIngredient} 
onRemoveIngredient={this.removeIngredient} /> }
</div>
</form>
</div>
</div>
</div>    
)
}
}

export default Admin;