import React from 'react'
import { Router, Link } from 'react-static'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'
import * as R from 'ramda'

import Navigation from './components/Navigation'
import withAuthentication from './session/withAuthentication'

import './app.css'
import { withProvider, Consumer } from './store'
import { Condition } from './components/Condition'
import { Avatar, Popover, Button } from 'antd'
import { auth } from './firebase'

const Component = () => (
  <Router>
    <div>
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
                <Popover
                  title={authUser.email}
                  content={
                    <div className="cf">
                      <Button className="fr" onClick={auth.doSignOut}>
                        Sign out
                      </Button>
                    </div>
                  }
                  placement="bottomRight"
                  arrowPointAtCenter
                  trigger="click">
                  <Avatar className="ml-auto mr3 pointer" src={authUser.photoURL} />
                </Popover>
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
