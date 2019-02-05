import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter} from 'react-router-dom'
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import burgerBuilderReducer from './store/reducers/burgerBuilder'
import orderReducer from './store/reducers/orders'
import authReducer from './store/reducers/auth'

const rootReducer = combineReducers({
    burger: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app=(
    <BrowserRouter>
        <Provider store={store} >
            <App />
        </Provider>
    </BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
