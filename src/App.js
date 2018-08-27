import React from 'react'
import { Router, Link } from 'react-static'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'
import * as R from 'ramda'

import withAuthentication from './session/withAuthentication'

import './app.css'
import { withProvider, Consumer } from './store'
import { NavAvatar } from './NavAvatar'
import { Layout } from 'antd'
import { Condition } from './components/Condition'

const Component = () => (
  <Router>
    <Layout>
      <Layout.Header>
        <nav style={{ display: 'flex' }} className="container">
          <li>
            <Link exact to="/">
              Home
            </Link>
          </li>
          <li className="ml-auto">
            <Consumer>
              {({ authUser }) => (
                <Condition.True condition={authUser}>
                  <NavAvatar />
                </Condition.True>
              )}
            </Consumer>
          </li>
        </nav>
      </Layout.Header>
      <Layout.Content style={{ padding: '0 50px' }}>
        <div className="container">
          <div style={{ background: '#fff', padding: 24, minHeight: 280, marginTop: 50 }}>
            <Routes />
          </div>
        </div>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }} />
    </Layout>
  </Router>
)

const App = R.compose(
  withProvider,
  withAuthentication
)(Component)

export default hot(module)(App)
