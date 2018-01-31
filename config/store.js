import { applyMiddleware, compose, createStore } from 'redux';
import reducer from '../src/data/reducer';
import logger from 'redux-logger'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export default createStore(reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default createStore(
  reducer,
  composeEnhancers(applyMiddleware(logger))
)
