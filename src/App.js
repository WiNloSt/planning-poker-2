import React from 'react'
import { Router, Link, Head } from 'react-static'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'
import * as R from 'ramda'

import Navigation from './components/Navigation'
import withAuthentication from './session/withAuthentication'

import './app.css'
import { withProvider } from './store'

const Component = () => (
  <Router>
    <div>
      <Head>
        <title>Planning Poker</title>
      </Head>
      <nav>
        <Link exact to="/">
          Home
        </Link>
        <Link to="/about">About</Link>
        <Link to="/blog">Blog</Link>
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
