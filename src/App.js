import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import {Route, Switch, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {checkAuthState} from './store/actions'

class App extends Component {

  componentDidMount(){
    this.props.onTryAuth();
  }

  render() {
    return (
      <Layout>
        <Switch>
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/auth' component={Auth} />
          <Route path='/logout' component={Logout} />
          <Route path='/' component={BurgerBuilder} />
        </Switch>
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onTryAuth: () => dispatch(checkAuthState())
})

export default withRouter(connect(null, mapDispatchToProps)(App));
