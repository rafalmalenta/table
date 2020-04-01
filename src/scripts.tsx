import * as React from 'react';
import * as ReactDOM from 'react-dom';
import  Layout  from './views/Layout';
import { Provider } from 'react-redux';


const app = document.getElementById('app');
ReactDOM.render(  
    <Layout  />, app
);
