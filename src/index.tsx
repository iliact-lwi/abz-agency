// react
import React from 'react';
import ReactDOM from 'react-dom';

// redux
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// styles
import './scss/main.scss';

// root reducer
import rootReducer from './redux/root/rootReducer';

//root component
import App from './App';

// main code
const store = createStore(rootReducer, compose(
    applyMiddleware(thunk)
));

const AppProvider = (
    <Provider store={store}>
        <App />
    </Provider>
);

// render root element
ReactDOM.render(AppProvider, document.getElementById('abz-agency-tt'));