import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'

import { stockReducer } from './stocks';
import { watchlistReducer } from './watchlists';
import { transactionReducer } from './transactions';
import { assetReducer } from './assets';

const rootReducer = combineReducers({
  session,
  stocks: stockReducer,
  watchlists: watchlistReducer,
  transactions: transactionReducer,
  assets: assetReducer,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
