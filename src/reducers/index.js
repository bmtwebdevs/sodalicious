import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux'

import drinks from './drinks';

const state = combineReducers({  
  drinks,
  router : routerReducer
});

export default state;