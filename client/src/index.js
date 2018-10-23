import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';


//STEP: 1 (REACT BOOTS UP)
import App from './containers/App';
import reducers from './reducers';
// import registerServiceWorker from './registerServiceWorker';

// a dummy reducer 
// const dummyReducer = () => {};

// setup socket
import createSagaMiddleware from 'redux-saga';
//import setupSocket from './sockets/setupSocket';
const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(reduxThunk,sagaMiddleware));    //just give a dummy reducer at this stage
//const socket = setupSocket(store.dispatch, undefined);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
//registerServiceWorker();
