import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import reducer from '../reducers';

const store = createStore(
    reducer,
    applyMiddleware(
        // process.env.NODE_ENV !== 'production' && logger,
        thunk,
        promise
    )
);

export default store;