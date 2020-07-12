import {createStore, applyMiddleware } from 'redux';
import CompaniesReducer from './CompaniesReducer';
import thunk from 'redux-thunk';

const middleware = applyMiddleware(thunk)
export default createStore(CompaniesReducer,middleware);