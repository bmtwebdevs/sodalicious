import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import '../semantic/dist/semantic.min.css';

import './components/drink/style.css';

import Admin from './components/admin';
import DrinksAdmin from './components/admin/drinksAdmin';
import PumpsAdmin from './components/admin/pumpsAdmin';
import Home from './components/home';


import NotFound from './NotFound'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

ReactDOM.render((
    <BrowserRouter>
      <App>
        <Switch>
        <Route exact={true} path="/" component={Home}/>
        <Route exact path="/admin" component={Admin}/>
        <Route path="/admin/drinks" component={DrinksAdmin}/>
        <Route path="/admin/pumps" component={PumpsAdmin}/>
        <Route path="*" component={NotFound}/>
        </Switch>
      </App>
    </BrowserRouter>),
  document.getElementById('root'), // eslint-disable-line no-undef
);