
import React, {Component}  from 'react';
import PumpClient from '../../clients/Pump';
import DrinkClient from '../../clients/Drink';
import Pump from './pump';

class PumpsAdmin extends Component {

  seed = [
    { name : 'pump0', displayName : 'Pump 1', ingredientName : '' },
    { name : 'pump1', displayName : 'Pump 2', ingredientName : '' },
    { name : 'pump2', displayName : 'Pump 3', ingredientName : '' },
    { name : 'pump3', displayName : 'Pump 4', ingredientName : '' },
    { name : 'pump4', displayName : 'Pump 5', ingredientName : '' },
  ];

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
  if(pumps.length === 0){
    for(var i = 0; i < this.seed.length; i++){
      if(i < this.seed.length - 1){
        PumpClient.upsert(this.seed[i]);  
      }else{
        PumpClient.upsert(this.seed[i], this.updatePumps);    
      }        
    }
    return;
  }

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

savePump = (e, id, ingredientName) => {
  let pump = this.state.pumps.filter(pump => pump._id === id)[0];
  pump = Object.assign({}, pump);
  pump.ingredientName = ingredientName;
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

cleanPump = () => {
  PumpClient.clean(5000);
}

render = () => {
  return (
    <div className="edit-pump">
      <div className="container">
        <div className="row">
          <h1>Sort out your pumps! </h1>          
        </div>
      </div>
      <br />
      <div className="container">
        <div className="row">
          <form className="form form-horizontal">
            <div className="well">
              { this.state.pumps.map(pump => <Pump {...pump} 
                                               key={pump._id}
                                               ingredients={this.state.ingredients}
                                               onIngredientChange={this.onIngredientChange}
                                               onPumpUpdate={this.savePump} />)}
            </div>
          </form>
        </div>
      </div>
      <div className="container">
        <div classs="row" >
          <div className="col-sm-offset-2 col-sm-8">
            <button className="btn btn-lg btn-warning btn-block" onClick={() => this.cleanPump()}>Clean Pumps</button> 
          </div>       
        </div>
      </div>
      <br />
    </div>      
  )
}

}

export default PumpsAdmin;