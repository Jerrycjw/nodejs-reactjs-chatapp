// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './components/app';
// import './css/app.css'
//
//
// //import registerServiceWorker from './registerServiceWorker';
//
// ReactDOM.render(<App />, document.getElementById('root'));
// //registerServiceWorker();
//
import Wrapper from "./components/Main";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import React from 'react'
import thunkMiddleware from 'redux-thunk'
import {send} from "./actions/Websocket";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "./reducers/rootReducer";


const initialState = {
    messages: {},
    token: '1'
}

function startUp () {
    const middleware = [ thunkMiddleware.withExtraArgument({ send }) ]
    // use the logger in development mode - this is set in webpack.config.dev.js

    return createStore(rootReducer, initialState, applyMiddleware(...middleware));
}
document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Provider store={startUp()}>
            <Wrapper />
        </Provider>,
        document.getElementById('root')
    );
});
