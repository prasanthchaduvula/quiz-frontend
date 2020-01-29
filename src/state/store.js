import { createStore, applyMiddleware } from 'redux';
import admin from './reducers/admin.reducer';
import reducer from './reducers/index';
let createthunk = store => next => action => {
  if (typeof action === 'function') {
    return action(store.dispatch);
  }

  return next(action);
};

const store = createStore(reducer, applyMiddleware(createthunk));
export default store;
