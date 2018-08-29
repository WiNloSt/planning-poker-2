import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-static'
import styled from 'styled-components'

import { Consumer, withConsumer } from '../store'
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

// eslint-disable-next-line no-unused-vars
const Button = styled(({ currentVote: discard, ...rest }) => <UnstyledButton {...rest} />)`
  font-size: 3rem;
  width: 2.5em;
  height: 1.5em;
  line-height: 1;

  ${props =>
    props.currentVote &&
    `
    color: #40a9ff;
    background-color: #fff;
    border-color: #40a9ff;
  `};

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
  static propTypes = {
    context: PropTypes.object
  }
  state = {
    cards: [],
    currentVote: null
  }

  componentDidMount() {
    this.unsubList = [db.onCards(cards => this.setState({ cards }))]
  }

  componentWillUnmount() {
    this.unsubList.forEach(unsub => unsub && unsub())
  }

  render() {
    if (this.props.context.authUser && !this.state.currentVote) {
      this.unsubList.push(db.onVote(vote => this.setState({ currentVote: vote.point })))
    }
    return (
      <React.Fragment>
        <RedirectToSigninIfNotLoggedIn />
        <h1 style={{ textAlign: 'center' }}>Let's vote!!!</h1>
        <FlexContainer>
          {this.state.cards.map(card => (
            <div key={card.id}>
              <Button
                size="large"
                currentVote={this.state.currentVote === card.point}
                onClick={() => db.createVote(card.point)}>
                {card.point}
              </Button>
            </div>
          ))}
        </FlexContainer>
      </React.Fragment>
    )
  }
}

export default withConsumer(Home)
