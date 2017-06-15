
import React, {Component}  from 'react';

class AddIngredient extends Component {

  render(){    
    return(
        <button onClick={() => this.props.onAddIngredient()} >Add Ingredient</button>
    )
  }
}

export default AddIngredient;