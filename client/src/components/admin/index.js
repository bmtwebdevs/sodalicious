import React, {Component}  from 'react';
import {Link} from 'react-router-dom';
import './style.css';

class Admin extends Component {
  
  render = () => {
    return (
      <div className="admin">
        <div className="container">
          <div className="row">
            <div className="col-sm-offset-2 col-sm-4 icon-col">
              <Link className="icon-link" to="/admin/drinks" onMouseEnter={() => this.sortZs('drink')}>
                <h1>
                  <span style={{display:'block' }} className="label label-success glyphicon glyphicon-glass icon-lg"></span>
                </h1>
              </Link>
            </div>
            <div className="col-sm-4 icon-col">
              <Link className="icon-link" to="/admin/pumps" onMouseEnter={() => this.sortZs('pump')}>
                <h1>
                  <span style={{display:'block' }} className="label label-danger glyphicon glyphicon-tint icon-lg"></span>
                </h1>
              </Link>     
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default Admin;