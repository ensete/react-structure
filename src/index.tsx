import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom'
import { createStore, applyMiddleware, Middleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';
import 'src/assets/styles/index.scss';
import App from 'src/+app/components/App';
import * as serviceWorker from './serviceWorker';
import rootSaga from 'src/+app/sagas';
import rootReducer from 'src/+app/reducers';

const sagaMiddleware = createSagaMiddleware();
let middleware: Middleware[] = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middleware = [...middleware, logger];
}

const store = createStore(rootReducer, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);

ReactDOM.render((
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/customPath" component={App} />
        <Redirect to={`/customPath`}/>
      </Switch>
    </Router>
  </Provider>
), document.getElementById('root'));

serviceWorker.unregister();
