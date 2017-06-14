import React, { Component } from 'react';
import * as isotope from 'isotope-layout';

import './style.css';
var Link = require('react-router-dom').Link


class isotopeContainer extends Component {
  render() {
    return (
      <div className="admin">
        Administration
        <Link to="/" activeStyle={{ color: 'red' }}>Home</Link>
      </div>
    );
  }
}

export default isotopeContainer;
