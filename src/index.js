import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Routes,Route } from 'react-router-dom'
import './index.css';
// import User from './callapi';
// import Userdetail from './numberCall';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';
// import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
     <App/>
    </Provider>
    
);

   