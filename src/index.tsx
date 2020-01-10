import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom'
import { createStore, applyMiddleware, Middleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';
import 'src/assets/styles/index.scss';
import GlobalErrorBoundary from 'src/+app/components/error-boundaries/GlobalErrorBoundary';
import * as serviceWorker from './serviceWorker';
import rootSaga from 'src/+app/sagas';
import rootReducer from 'src/+app/reducers';

const sagaMiddleware = createSagaMiddleware();
let middleware: Middleware[] = [sagaMiddleware];
if (process.env.NODE_ENV === 'development') middleware = [...middleware, logger];
const store = createStore(rootReducer, applyMiddleware(...middleware));
sagaMiddleware.run(rootSaga);

const AppComponent = lazy(() => import('src/+app/components/App'));

const App = (
  <GlobalErrorBoundary>
    <Provider store={store}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/customPath" component={AppComponent} />
            <Redirect to={`/customPath`}/>
          </Switch>
        </Suspense>
      </Router>
    </Provider>
  </GlobalErrorBoundary>
);

ReactDOM.render(App, document.getElementById('root'));

serviceWorker.unregister();
