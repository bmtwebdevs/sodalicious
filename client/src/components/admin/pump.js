
import React, {Component}  from 'react';

class Pump extends Component {
  
  state = {
    value : undefined
  }

  componentDidMount = () => {
    this.setState({
      value : this.props.ingredientName || ''
    });
  }

  
  handleIngredientChange = (e) => {
    let value = e.target.value;
    this.setState({
      value
    }); 
    e.preventDefault();
  }
  
  handlePumpUpdate = (e, id) => {
    this.props.onPumpUpdate(e, id, this.state.value);
    e.preventDefault();
  }
  
  render(){
        
    return(
      <div className="form-group form-group-lg">
        <label className="control-label col-sm-2">{this.props.displayName}</label>
        <div className="col-sm-8">
          <select className="form-control" defaultValue={this.props.ingredientName} onChange={(e) => this.handleIngredientChange(e)}>
            {(this.props.ingredients.map(ingredient => <option key={ingredient} value={ingredient}>{ingredient}</option>))}
          </select>
        </div>
        <div className="col-sm-2">
          <button className="btn btn-lg btn-primary" onClick={(e) => this.handlePumpUpdate(e, this.props._id)} >Update</button>
        </div>
      </div>
    )
  }
}

export default Pump;