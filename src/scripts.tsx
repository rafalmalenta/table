import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './style/table.sass';
import  Layout  from './views/Layout';
import { Provider } from 'react-redux';
import store from './redux/store';

const app = document.getElementById('app');
ReactDOM.render(  
    <Provider store={store}>
       <Layout  /> 
    </Provider>
    , app
);
