import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import createLogger from 'redux-logger';
import rootReducer from '../reducers';

// const loggerMiddleware = createLogger();

export default function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(
      thunkMiddleware
    )
  );

  return store;
}