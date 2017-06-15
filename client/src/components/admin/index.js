import React, {Component}  from 'react';
import {Link} from 'react-router-dom';

class Admin extends Component {

  render = () => {
    return (
      <div>
        <div className="admin ui two column doubling stackable grid container">
          <div className="column" style={{"text-align":"right"}}>
            <Link to="/admin/drinks">
              <h1>
                <span className="label label-primary">Drinks</span>
              </h1>
            </Link>
          </div>  
          <div className="column">
            <Link to="/admin/pumps">
              <h1>
                <span className="label label-success">Pumps</span>
              </h1>
            </Link>     
          </div>   
        </div>
      </div>
    )
  }
}

export default Admin;