import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.scss';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { AppProvider } from "./reducers";

ReactDOM.render((
  <AppProvider>
    <App/>
  </AppProvider>
), document.getElementById('root'));

serviceWorker.unregister();
