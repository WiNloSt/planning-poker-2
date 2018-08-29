import React from 'react'
import { Router, Link } from 'react-static'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'
import * as R from 'ramda'

import withAuthentication from './session/withAuthentication'

import { withProvider, Consumer } from './store'
import { NavAvatar } from './NavAvatar'
import { Layout } from 'antd'
import { Condition } from './components/Condition'
import styled, { injectGlobal } from 'styled-components'

injectGlobal`
  #root {
      min-height: 100%;
      display: flex;
  }

  .container {
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
  }
`

const Content = styled(Layout.Content)`
  padding-left: 1rem;
  padding-right: 1rem;
`

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
      <Content>
        <div className="container">
          <div style={{ background: '#fff', padding: 24, minHeight: 280, marginTop: 50 }}>
            <Routes />
          </div>
        </div>
      </Content>
      <Layout.Footer style={{ textAlign: 'center' }} />
    </Layout>
  </Router>
)

const App = R.compose(
  withProvider,
  withAuthentication
)(Component)

export default hot(module)(App)
