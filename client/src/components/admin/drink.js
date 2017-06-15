
import React, {Component}  from 'react';
import Ingredient from './ingredient';

const defaultIngredient = {
    _id: '',
    name : '',
    amount : ''
  };

class Drink extends Component {

  render = () => {
    
    let showRemoveButton = this.props.ingredients.length > 1;
    
    return (
      <div className="drink-form-group">
        <div className="form-group">
          <label className="control-label col-sm-2">Name </label>
          <div className="col-sm-8">
            <input className="form-control" type="text" defaultValue={this.props.name} />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2">Description </label>
          <div className="col-sm-8">
            <textarea className="form-control" defaultValue={this.props.description} onBlur={(e) => this.props.onDrinkFieldChange(e, 'description')} />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2">Image </label>
          <div className="col-sm-8">
            <input className="form-control" type="text" defaultValue={this.props.image} onBlur={(e) => this.props.onDrinkFieldChange(e, 'image')} />
          </div>
        </div>
        <button onClick={(e) => this.props.onAddIngredient(e)} >Add Ingredient</button>
        <h3>Ingredients</h3>
        {(this.props.ingredients.map(ingredient => 
                                     <Ingredient 
                                       key={ingredient._id} 
                                       {...ingredient} 
                                       showRemoveButton={showRemoveButton} 
                                       onRemoveIngredient={this.props.onRemoveIngredient}
                                       onIngredientFieldChange={this.props.onIngredientFieldChange}/>
                                    ))}
        <button onClick={(e) => this.props.onSave(e)} >Save</button>
      </div>    
    )
  }
}

export default Drink;