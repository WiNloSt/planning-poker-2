import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'

import { firebase } from '../firebase'
import { withConsumer } from '../store'

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        authUser: null
      }
    }

    getChildContext() {
      return {
        authUser: this.state.authUser
      }
    }

    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if (authUser) {
          this.setState(() => ({ authUser }))
          this.props.context.setContext({
            authUser
          })
        } else {
          this.setState(() => ({ authUser: null }))
          this.props.context.setContext({
            authUser: null
          })
        }
      })
    }

    render() {
      return <Component {...this.props} />
    }
  }

  WithAuthentication.childContextTypes = {
    authUser: PropTypes.object
  }

  return WithAuthentication
}

export default R.compose(
  withConsumer,
  withAuthentication
)
