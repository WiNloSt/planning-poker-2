import React from 'react'
import { Redirect } from 'react-static'

import { Consumer } from '../store'
import { Condition } from '../components/Condition'
import { db } from '../firebase'
import { Button } from 'antd'

const RedirectToSigninIfNotLoggedIn = () => (
  <Consumer>
    {({ isUserLoaded, authUser }) => (
      <Condition.True condition={isUserLoaded && !authUser}>
        <Redirect to="signin" />
      </Condition.True>
    )}
  </Consumer>
)

class Home extends React.Component {
  state = {
    cards: []
  }

  componentDidMount() {
    this.unsub = db.onCards(cards => this.setState({ cards }))
  }

  componentWillUnmount() {
    this.unsub()
  }

  render() {
    return (
      <React.Fragment>
        <RedirectToSigninIfNotLoggedIn />
        <h1 style={{ textAlign: 'center' }}>Let's vote!!!</h1>
        {this.state.cards.map(card => (
          <Button size="large" key={card.id}>
            {card.point}
          </Button>
        ))}
      </React.Fragment>
    )
  }
}

export default Home
