import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, Middleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { logger } from 'redux-logger';
import { persistStore } from "redux-persist";
import { PersistGate } from 'redux-persist/integration/react';
import 'src/assets/styles/index.scss';
import GlobalErrorBoundary from 'src/app/components/ErrorBoundaries/GlobalErrorBoundary';
import * as serviceWorker from './serviceWorker';
import rootSaga from 'src/app/sagas';
import rootReducer from 'src/app/reducers';
import { ApolloProvider } from '@apollo/client';
import { client } from "src/app/services/apollo/client";
import App from "src/app/components/App";

const sagaMiddleware = createSagaMiddleware();

let middleware: Middleware[] = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') middleware = [...middleware, logger];

const store = createStore(rootReducer, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

const AppDom = (
  <GlobalErrorBoundary>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <PersistGate persistor={persistor}>
          <App/>
        </PersistGate>
      </ApolloProvider>
    </Provider>
  </GlobalErrorBoundary>
);

ReactDOM.render(AppDom, document.getElementById('root'));

serviceWorker.unregister();
