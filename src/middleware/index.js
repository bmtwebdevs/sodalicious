import { routerMiddleware } from 'react-router-redux';
import history from '../history';

export const router = routerMiddleware(history);