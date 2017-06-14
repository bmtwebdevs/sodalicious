import React, { Component } from 'react';
import './style.css';
var Link = require('react-router-dom').Link

class Admin extends Component {
  render() {
    return (
      <div className="admin">
        Administration
        <Link to="/" activeStyle={{ color: 'red' }}>Home</Link>
      </div>
    );
  }
}

export default Admin;
