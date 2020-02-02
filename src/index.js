import React from 'react';
import { render } from 'react-dom';
import User from './user/views/App';
import Admin from './admin/views/App';
import LandingPage from './LandingPage';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './state/store';

function App() {
  return (
    <>
      <Route exact path="/">
        <LandingPage />
      </Route>
    </>
  );
}

render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Admin />
      <User />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
