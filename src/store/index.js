import { createStore, applyMiddleware } from 'redux';
import * as Middleware from '../middleware';
import Reducers from '../reducers';

const store = createStore(
  Reducers,
  applyMiddleware(...Middleware)
);

export default store;