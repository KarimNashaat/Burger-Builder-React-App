import React, { Component } from 'react';
import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BugerBuilder/BurgerBuilder'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import { connect } from 'react-redux'
import * as actions from './store/actions/index'

class App extends Component {

  componentDidMount() {
    this.props.onTrySignIn()
  }

  render() {
    let routes = (
      < Switch >
        <Route path='/' exact component={BurgerBuilder} />
        <Route path='/auth' exact component={Auth} />
        <Redirect to='/' />
      </Switch >
    )

    if (this.props.isAuthanticated) {
      routes = (
        < Switch >
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/orders' exact component={Orders} />
          <Route path='/checkout' component={Checkout} />
          <Redirect from='/logout' to='/' />
          <Redirect to='/' />
        </Switch >
      )
    }
    return (
      <BrowserRouter>
        <div>
          <Layout>
            {routes}
          </Layout>
        </div>
      </BrowserRouter >
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthanticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTrySignIn: () => dispatch(actions.onTrySignIn())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);