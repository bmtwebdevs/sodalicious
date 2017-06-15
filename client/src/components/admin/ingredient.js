
import React, {Component}  from 'react';

class Ingredient extends Component {

  render(){
    
    let button = null;
    if(this.props.showRemoveButton){
      button = <button onClick={(e) => this.props.onRemoveIngredient(e, this.props._id)} >Remove</button>;
    }else{
      button = <span>&nbsp;</span>
    }
    
    return(
      <div className="form-group">
        <label className="control-label col-sm-2">Name </label>
        <div className="col-sm-3">
          <input className="form-control" type="text" defaultValue={this.props.name} onChange={(e) => this.props.onIngredientFieldChange(e, this.props._id, 'name')} />
        </div>
        <label className="control-label col-sm-2">Amount </label>
        <div className="col-sm-2">
          <input className="form-control" type="text" defaultValue={this.props.amount} onChange={(e) => this.props.onIngredientFieldChange(e, this.props._id, 'amount')} />
        </div>
        <div className="col-sm-1">
          {button}
        </div>
      </div>
    )
  }
}

export default Ingredient;