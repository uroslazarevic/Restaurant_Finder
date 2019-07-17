import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import reduxMulti from 'redux-multi';

import './App.css';
import { App } from 'containers';

const createStoreWithMiddleware = applyMiddleware(promise, thunk, reduxMulti)(createStore);

export const store = createStoreWithMiddleware(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
