import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { store } from '@redux/store';
import App from './App';


ReactDOM.createRoot(document.getElementById('app') as Element)
        .render( 
        <Provider store={store}>
                <App />
        </Provider>
        );