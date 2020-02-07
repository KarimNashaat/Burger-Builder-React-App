import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware , compose } from 'redux'
import { Provider } from 'react-redux'
import burgerBuilderReducer from './store/reducers/burgerBuilder'
import authReducer from './store/reducers/auth'
import orderReducer from './store/reducers/order'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    ing: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
})

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(<Provider store={store}><App /> </Provider>, document.getElementById('root'));
registerServiceWorker();
