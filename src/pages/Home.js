import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as R from 'ramda'

import { withConsumer } from '../store'
import { db } from '../firebase'
import { Button as UnstyledButton, Card } from 'antd'
import withAuthorization from '../session/withAuthorization'

const canUseDOM = typeof window !== 'undefined'

const Header = styled.h1`
  margin: 0;
`

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

class Home extends React.Component {
  static propTypes = {
    context: PropTypes.object
  }

  state = {
    className: ''
  }

  createOnClick = point => () => {
    if (canUseDOM) {
      setTimeout(() => document.activeElement.blur())
    }
    if (point !== this.props.context.currentVote) {
      db.createVote(point)
    } else {
      db.removeVote()
    }
  }

  componentDidMount() {
    if (canUseDOM && true && 'ontouchstart' in document.documentElement) {
      this.setState({ className: 'is-touch' })
    }
  }

  render() {
    return (
      <Card title={<Header>Let's vote!!!</Header>} loading={this.props.context.cards.loading}>
        <FlexContainer>
          {this.props.context.cards.data.map(card => (
            <div key={card.id}>
              <Button
                size="large"
                className={this.state.className}
                currentVote={this.props.context.currentVote === card.point}
                onClick={this.createOnClick(card.point)}>
                {card.point}
              </Button>
            </div>
          ))}
        </FlexContainer>
      </Card>
    )
  }
}

export default R.compose(
  withAuthorization(R.identity),
  withConsumer
)(Home)
