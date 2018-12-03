import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';

import reducers from './reducers';
import promise from 'redux-promise';
import { Home } from 'components';
import { RestaurantsCategoryPage, CityCollections, RestaurantDetails, CollectionDetails } from 'containers';

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
          <Route path="/:city/Restaurants/:restaurant" component={RestaurantDetails} />
          <Route path="/:city/collections/:collection" component={CollectionDetails} />
          <Route path="/:city/collections" component={CityCollections} />
          <Route path="/:city/:wildcard" component={RestaurantsCategoryPage} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>, 
  document.querySelector('#root')
);
