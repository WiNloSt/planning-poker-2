import React from 'react'
import PropTypes from 'prop-types'

const { Provider: ReactProvider, Consumer: ReactConsumer } = React.createContext()

export class Provider extends React.Component {
  static propTypes = {
    children: PropTypes.node
  }

  setContext = (...args) => this.setState(...args)

  state = {
    setContext: this.setContext
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
