import React from 'react'
import { Router, Link } from 'react-static'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'
import * as R from 'ramda'

import withAuthentication from './session/withAuthentication'

import { withProvider, Consumer } from './store'
import { NavAvatar } from './NavAvatar'
import { Layout as UnstyledLayout } from 'antd'
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

const Layout = styled(UnstyledLayout)`
  & > .ant-layout-header {
    padding: 0 1rem;
  }
`

const Content = styled(Layout.Content)`
  padding-left: 1rem;
  padding-right: 1rem;
`

const Nav = styled.nav`
  display: flex;
  list-style: none;

  & > li:not(:last-child) {
    list-style: none;
    padding-right: 1.5em;

    & > a {
      display: block;
    }
  }
`

const Page = styled.div`
  background: #fff;
  padding: 24px;
  min-height: 280px;

  @media only screen and (max-width: 479px) {
    margin-top: 1.5em;
  }

  @media only screen and (min-width: 480px) {
    margin-top: 50px;
  }
`

const Component = () => (
  <Router>
    <Layout>
      <Layout.Header>
        <Nav className="container f4">
          <li>
            <Link exact to="/">
              Home
            </Link>
          </li>
          <li>
            <Link exact to="/result">
              Result
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
        </Nav>
      </Layout.Header>
      <Content>
        <div className="container">
          <Page>
            <Routes />
          </Page>
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
