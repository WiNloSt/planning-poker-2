import React from 'react'
import { Redirect } from 'react-static'
import styled from 'styled-components'

import { Consumer } from '../store'
import { Condition } from '../components/Condition'
import { db } from '../firebase'
import { Button as UnstyledButton } from 'antd'

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > div {
    text-align: center;
    @media only screen and (max-width: 479px) {
      flex-basis: 100%;
      margin-bottom: 1rem;
    }
    @media only screen and (min-width: 480px) {
      flex-basis: 25%;
      margin-bottom: 2rem;
    }
  }
`

const Button = styled(UnstyledButton)`
  font-size: 3rem;
  width: 2.5em;
  height: 1.5em;
  line-height: 1;

  @media only screen and (max-width: 479px) {
    width: 100%;
  }
`

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
        <FlexContainer>
          {this.state.cards.map(card => (
            <div key={card.id}>
              <Button size="large">{card.point}</Button>
            </div>
          ))}
        </FlexContainer>
      </React.Fragment>
    )
  }
}

export default Home
