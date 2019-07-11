import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import history from './../shared/history';

import { Home } from 'components';
import { RestaurantsCategoryPage, CityCollections, RestaurantDetails, CollectionDetails } from 'containers';
// Import Actions
import { tryAutoLogin } from '../actions/auth_user';
import { loadAllCollections } from '../actions/user_collections';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuth: false,
    };
  }

  componentWillMount() {
    this.props.tryAutoLogin();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isAuth) {
      if (newProps.isAuth !== this.props.isAuth) {
        this.setState({ isAuth: newProps.isAuth }, () => this.props.loadAllCollections());
      }
    }
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/:city/restaurants/:restaurant" component={RestaurantDetails} />
            <Route path="/:city/collections/:collection" component={CollectionDetails} />
            <Route path="/:city/collections" component={CityCollections} />
            <Route path="/:city/:wildcard" component={RestaurantsCategoryPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps({ authentification }) {
  return {
    isAuth: authentification.isAuth,
  };
}

export default connect(
  mapStateToProps,
  { tryAutoLogin, loadAllCollections }
)(App);
