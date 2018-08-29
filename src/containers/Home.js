import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-static'
import styled from 'styled-components'

import { Consumer, withConsumer } from '../store'
import { Condition } from '../components/Condition'
import { db } from '../firebase'
import { Button as UnstyledButton } from 'antd'

const canUseDOM = typeof window !== 'undefined'

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

  &.is-touch {
    &:hover {
      color: rgba(0, 0, 0, 0.65);
      background-color: #fff;
      border-color: #d9d9d9;
    }
  }

  ${props =>
    props.currentVote &&
    `
    color: #40a9ff !important;
    background-color: #fff !important;
    border-color: #40a9ff !important;
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
    currentVote: null,
    className: ''
  }

  createOnClick = point => () => {
    if (canUseDOM) {
      setTimeout(() => document.activeElement.blur())
    }
    if (point !== this.state.currentVote) {
      db.createVote(point)
    } else {
      db.removeVote()
    }
  }

  componentDidMount() {
    if (canUseDOM && true && 'ontouchstart' in document.documentElement) {
      this.setState({ className: 'is-touch' })
    }
    this.unsubList = [db.onCards(cards => this.setState({ cards }))]
    if (this.props.context.authUser) {
      this.unsubList.push(db.onVote(vote => this.setState({ currentVote: vote.point })))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.context.authUser && nextProps.context.authUser) {
      this.unsubList.push(db.onVote(vote => this.setState({ currentVote: vote.point })))
    }
  }

  componentWillUnmount() {
    this.unsubList.forEach(unsub => unsub && unsub())
  }

  render() {
    return (
      <React.Fragment>
        <RedirectToSigninIfNotLoggedIn />
        <h1 style={{ textAlign: 'center' }}>Let's vote!!!</h1>
        <FlexContainer>
          {this.state.cards.map(card => (
            <div key={card.id}>
              <Button
                size="large"
                className={this.state.className}
                currentVote={this.state.currentVote === card.point}
                onClick={this.createOnClick(card.point)}>
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
