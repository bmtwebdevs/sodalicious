import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import AppContainer from './containers/appContainer';
import AdminContainer from './containers/adminContainer';
import registerServiceWorker from './registerServiceWorker';
import history from './history';
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'

import "bootstrap/dist/css/bootstrap.css";
import './index.css';

ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={AppContainer}/>
          <Route exact path="/admin" component={AdminContainer}/>
        </div>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();