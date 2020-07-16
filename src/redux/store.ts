import {combineReducers,createStore, applyMiddleware } from 'redux';
import CompaniesReducer from './CompaniesReducer';
import thunk from 'redux-thunk';
import PaginatorReducer from "./PaginatorReducer";
import logger from 'redux-logger';

const middleware = applyMiddleware(thunk);
//middleware = applyMiddleware(logger);
const reducers = combineReducers({CompaniesReducer,PaginatorReducer})
export default createStore(reducers,middleware);