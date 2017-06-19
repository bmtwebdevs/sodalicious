import React, { Component } from 'react';
import './style.css';
class AdminHero extends Component {
  render() {
    return (
      <div className="adminHero">
-        <div className="jumbotron">
-           <h1><img src="/favicon.ico" style={{height:'100px'}} alt="" /> #Sodalicious</h1>
            <p>An Alexa controlled smart drinks mixer for the technogeek-connoisseur powered by <b>British Mixology Technology</b></p>
        </div>
      </div>
    );
  }
}
export default AdminHero;