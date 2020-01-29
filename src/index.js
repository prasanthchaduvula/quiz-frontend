import React from 'react';
import { render } from 'react-dom';

import User from './user/views/App';
import Admin from './admin/views/App';
import Hero from './admin/views/Hero';
import Landingpage from './Landingpage';
import { BrowserRouter, NavLink, Route } from 'react-router-dom';

function App() {
  return (
    <Route exact path="/">
      <Landingpage />
    </Route>
  );
}

render(
  <BrowserRouter>
    <App />
    <Admin />
    <User />
  </BrowserRouter>,
  document.getElementById('root')
);
