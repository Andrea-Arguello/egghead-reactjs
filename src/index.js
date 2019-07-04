import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import './index.css';
import { configureStore } from './store.js';
import Root from './root.js';
/* 
const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](
          state[key],
          action);
        return nextState;
      },
      {}
    );
  };
};
*/


const store = configureStore();

ReactDOM.render(
  <Root store={store}/>,
  document.getElementById('root')
);