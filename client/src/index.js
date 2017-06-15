import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import '../semantic/dist/semantic.min.css';

import Admin from './components/admin';
import Home from './components/home';


import NotFound from './NotFound'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

ReactDOM.render((
    <BrowserRouter>
      <App>
        <Switch>
        <Route exact={true} path="/" component={Home}/>
        <Route path="/admin" component={Admin}/>
        <Route path="*" component={NotFound}/>
        </Switch>
      </App>
    </BrowserRouter>),
  document.getElementById('root'), // eslint-disable-line no-undef
);