import React from 'react'
import { Router, Link, Head } from 'react-static'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'
import * as R from 'ramda'

import Navigation from './components/Navigation'
import withAuthentication from './session/withAuthentication'

import './app.css'
import { withProvider, Consumer } from './store'
import { Condition } from './components/Condition'
import { Avatar } from 'antd'

const Component = () => (
  <Router>
    <div>
      <Head>
        <title>Planning Poker</title>
      </Head>
      <nav style={{ display: 'flex', alignItems: 'center' }}>
        <Link exact to="/">
          Home
        </Link>
        <Link to="/about">About</Link>
        <Link to="/blog">Blog</Link>
        <Consumer>
          {({ authUser }) => (
            <Condition.True condition={authUser}>
              {() => (
                <Avatar
                  style={{ marginLeft: 'auto', marginRight: '1rem' }}
                  src={authUser.photoURL}
                />
              )}
            </Condition.True>
          )}
        </Consumer>
      </nav>
      <Navigation />
      <div className="content">
        <Routes />
      </div>
    </div>
  </Router>
)

const App = R.compose(
  withProvider,
  withAuthentication
)(Component)

export default hot(module)(App)
