import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';

import reducers from './reducers';
import promise from 'redux-promise';
import { Home, RestaurantsCategoryPage, CityCollections, RestaurantOverview } from 'containers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store ={createStoreWithMiddleware(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:city/restaurants/:restaurant" component={RestaurantOverview} />
          <Route path="/:city/collections" component={CityCollections} />
          <Route path="/:city/:wildcard" component={RestaurantsCategoryPage} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>, 
  document.querySelector('#root')
);
