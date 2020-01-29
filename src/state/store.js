import { createStore, applyMiddleware } from 'redux';
import admin from './reducers/admin.reducer';

let createthunk = store => next => action => {
  if (typeof action === 'function') {
    return action(store.dispatch);
  }

  return next(action);
};

const store = createStore(admin, applyMiddleware(createthunk));
export default store;
