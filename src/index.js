import './index.css';
import * as serviceWorker from './serviceWorker';
import AppStateContainer from './components/app_state_container';
import React from 'react';
import ReactDOM from 'react-dom';
import Theme from "./Theme";
import { BrowserRouter, Route } from 'react-router-dom';

ReactDOM.render(
  <Theme>
    <BrowserRouter>
      <Route exact path={'/'} component={AppStateContainer} />
    </BrowserRouter>
  </Theme>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();
