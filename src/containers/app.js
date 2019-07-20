import React, { Component } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import history from './../shared/history';

import { Home, Confirm, ResetPassword } from 'components';
import { RestaurantsCategoryPage, CityCollections, RestaurantDetails, CollectionDetails } from 'containers';
// Import Actions
import { tryAutoSignin } from 'actions/auth_user';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuth: false,
    };
  }

  componentDidMount() {
    this.props.tryAutoSignin();
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/confirm" component={Confirm} />
            <Route exact path="/reset-password" component={ResetPassword} />
            <Route path="/:city/restaurants/:restaurant" component={RestaurantDetails} />
            <Route path="/:city/collections/:collection" component={CollectionDetails} />
            <Route path="/:city/collections" component={CityCollections} />
            <Route path="/:city/:wildcard" component={RestaurantsCategoryPage} />
            <Redirect path="*" to="/" />
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
  { tryAutoSignin }
)(App);
