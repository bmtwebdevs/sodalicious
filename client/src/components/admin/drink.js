
import React, {Component}  from 'react';
import Ingredient from './ingredient';

class Drink extends Component {

  render = () => {

    let showRemoveButton = this.props.ingredients.length > 1;

    let removeDrinkButton = this.props._id !== undefined ? <button className="btn btn-lg btn-danger btn-block" onClick={(e) => this.props.onRemove(e)} >Remove Drink <span className="glyphicon glyphicon-trash" aria-hidden="true"></span></button> : <span></span>;

    return (
      <div className="drink-form-group">
        <div className="form-group form-group-lg">
          <label className="control-label col-sm-2">Name </label>
          <div className="col-sm-8">
            <input className="form-control" placeholder="E.g. The Verruca Kicker" type="text" value={this.props.name} onChange={(e) => this.props.onDrinkFieldChange(e, 'name')} required maxLength="50" />
          </div>
        </div>
        <div className="form-group form-group-lg">
          <label className="control-label col-sm-2">Description </label>
          <div className="col-sm-8">
            <textarea className="form-control" placeholder="E.g. This stuff will melt your stomach!" value={this.props.description} onChange={(e) => this.props.onDrinkFieldChange(e, 'description')} maxLength="150" />
          </div>
        </div>
        <div className="form-group form-group-lg">
          <label className="control-label col-sm-2">Image </label>
          <div className="col-sm-8">
            <input className="form-control" placeholder="Make it a nice one. Must end in png, jpg or gif." type="text" value={this.props.image} pattern=".*\.(png|jpg|gif)" onChange={(e) => this.props.onDrinkFieldChange(e, 'image')} maxLength="30" />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-offset-2">
            <h3>Ingredients</h3>
          </div>
        </div>
        <br />
        {(this.props.ingredients.map(ingredient => 
                                     <Ingredient 
                                       key={ingredient._id} 
                                       {...ingredient} 
                                       showRemoveButton={showRemoveButton} 
                                       onRemoveIngredient={this.props.onRemoveIngredient}
                                       onIngredientFieldChange={this.props.onIngredientFieldChange}/>
                                    ))}
        <div className="row">
          <div className="col-sm-offset-2 col-sm-8">
            <button className="btn btn-lg btn-primary btn-block" onClick={(e) => this.props.onAddIngredient(e)} >Add Ingredient <span className="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
          </div>        
        </div>
        <br />
        <div className="row">
          <div className="col-sm-offset-2 col-sm-4">
            <button className="btn btn-lg btn-block btn-success" onClick={(e) => this.props.onSave(e)} >Save Drink <span className="glyphicon glyphicon-glass" aria-hidden="true"></span></button>
          </div>   
          <div className="col-sm-4">
            {removeDrinkButton}
          </div>           
        </div>
      </div>    
    )
  }
}

export default Drink;