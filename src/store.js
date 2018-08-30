import React from 'react'
import PropTypes from 'prop-types'

import { db } from './firebase'

const { Provider: ReactProvider, Consumer: ReactConsumer } = React.createContext()

export class Provider extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  setContext = (...args) => this.setState(...args)

  state = {
    setContext: this.setContext,
    authUser: null,
    cards: [],
    currentVote: null
  }

  unsubscribeList = []

  unsubscribe() {
    this.unsubscribeList.forEach(unsubscribe => unsubscribe())
    this.unsubscribeList = []
  }

  componentDidUpdate(_, prevState) {
    const justLoggedIn = this.state.authUser && !prevState.authUser
    const justLoggedOut = !this.state.authUser && prevState.authUser

    if (justLoggedIn) {
      this.unsubscribeList.push(
        db.onCards(cards => this.setState({ cards })),
        db.onVote(vote => this.setState({ currentVote: vote.point }))
      )
    }

    if (justLoggedOut) {
      this.unsubscribe()
    }
  }

  render() {
    return <ReactProvider value={{ ...this.state }}>{this.props.children}</ReactProvider>
  }
}

export const withProvider = Component => props => (
  <Provider>
    <Component {...props} />
  </Provider>
)

export const Consumer = ReactConsumer

export const withConsumer = Component => props => (
  <Consumer>{context => <Component {...props} context={context} />}</Consumer>
)
