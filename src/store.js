import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import todos from './todos';

/*const thunk = (store) => (next) => (action) =>
  typeof action === 'function' ?
    action(store.dispatch, store.getState) :
    next(action);

const logger = (store) => (nextDispatch) => {
  if (!console.group) {
    return nextDispatch;
  }

  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = nextDispatch(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  }
};

const promise = (store) => (nextDispatch) => (action) => {
  if (typeof action.then === 'function') { //detects if it is a promise
    return action.then(nextDispatch);
  }
  return nextDispatch(action);
};

const wrapDispatchWithMiddlewares = (store, middlewares) => {
  middlewares.slice().reverse().forEach(middleware =>
    store.dispatch = middleware(store)(store.dispatch)
  );
}*/

export const configureStore = () => {
  const middlewares = [thunk];


  // Promises are resolved before the action is locked
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger); //array of functions
  }

  return createStore(
    todos,
    applyMiddleware(...middlewares)
  );

}