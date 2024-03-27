import React from 'react';
import ReactDOM from 'react-dom';
import RoutesConfig from "./screen/RouteConfig"
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from "./redux/reducer";
import '../styles/index.scss';

const store = createStore(reducer);

ReactDOM.render((
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <RoutesConfig />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
), document.getElementById('root'));