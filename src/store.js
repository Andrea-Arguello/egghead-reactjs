import { createStore } from 'redux';
import throttle from 'lodash/throttle';
import todoApp from './components.js';

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  return (action) => {
    console.group(action.type);
    console.log('prev state',store.getState());
    console.log('action',action);
    const returnValue = rawDispatch(action);
    console.log('next state',store.getState());
    console.groupEnd(action.type);
    return returnValue;
  }
}

function loadState() {
    try {
      const serializedState = localStorage.getItem('state');
      if(serializedState === null){
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };
  
function saveState(state) {
    try{
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state',serializedState);
    } catch (err) {
      // Ignore
    }
  }

export const configureStore = () => {
    const persistedState = loadState();
    const store = createStore(todoApp, persistedState);

    if (process.env.NODE_ENV !== 'production'){
      store.dispatch = addLoggingToDispatch(store);
    }
    

    store.subscribe(throttle(() => {
    saveState({
        todos: store.getState().todos
    });
    },1000))
    return store;
}