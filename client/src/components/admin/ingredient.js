
import React, {Component}  from 'react';

class Ingredient extends Component {

  render(){

    let button = null;
    if(this.props.showRemoveButton){
      button = <button className="btn btn-lg btn-warning" onClick={(e) => this.props.onRemoveIngredient(e, this.props._id)} ><span className="glyphicon glyphicon-trash" aria-hidden="true"></span></button>;
    }else{
      button = <span>&nbsp;</span>
    }

    return(
      <div className="form-group form-group-lg">
        <label className="control-label col-sm-2">Name </label>
        <div className="col-sm-3">
          <input className="form-control" placeholder="E.g. Vodka" type="text" defaultValue={this.props.name} onChange={(e) => this.props.onIngredientFieldChange(e, this.props._id, 'name')} required maxLength="50" />      
        </div>
        <label className="control-label col-sm-2">Amount </label>
        <div className="col-sm-3">
          <input className="form-control" placeholder="E.g. 1.5" type="number" min="0.5" max="5" step="0.5" defaultValue={this.props.amount} onChange={(e) => this.props.onIngredientFieldChange(e, this.props._id, 'amount')} required  maxLength="3" />        
        </div>
        <div className="col-sm-1">
          {button}
        </div>
      </div>
    )
  }
}

export default Ingredient;