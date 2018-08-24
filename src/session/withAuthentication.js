import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import { message } from 'antd'

import { firebase, auth } from '../firebase'
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
          const isProntoUser = /@prontomarketing.com$/.test(authUser.email)
          if (!isProntoUser) {
            message.error('Please login with Pronto Marketing account')
            auth.doSignOut()
            return
          }
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
