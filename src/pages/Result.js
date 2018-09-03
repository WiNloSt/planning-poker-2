import React from 'react'
import { Table, Button, Card } from 'antd'
import * as R from 'ramda'
import styled from 'styled-components'

import { Consumer } from '../store'
import withAuthorization from '../session/withAuthorization'
import { db } from '../firebase'

const roundToPoint = points => number => Math.round(number * 10 ** points) / 10 ** points

const round = roundToPoint(1)

const columns = [
  { dataIndex: 'point', title: 'Point', className: 'f4' },
  { dataIndex: 'votes', title: 'Votes', className: 'f4' }
]

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > h1 {
    margin: 0;
  }
`

const Result = () => (
  <Consumer>
    {({ cards, votes }) => {
      const pointMap = votes.data.reduce(
        (map, vote) => R.over(R.lensProp(vote.point), R.add(1), map),
        cards.data.reduce((map, card) => ({ ...map, [card.point]: 0 }), {})
      )

      const dataSource = Object.keys(pointMap).map((key, index) => {
        const value = pointMap[key]

        return {
          key: index,
          point: key,
          votes: value
        }
      })

      const nonNullVotes = R.pipe(R.map(R.prop('point')))(votes.data)
      return (
        <Card
          title={
            <FlexContainer>
              <h1>Result</h1>
              <Button type="primary" size="large" onClick={db.removeAllVotes}>
                Clear votes
              </Button>
            </FlexContainer>
          }
          loading={cards.loading || votes.loading}>
          <Table
            size="small"
            rowClassName="f3"
            dataSource={dataSource}
            columns={columns}
            bordered
            pagination={false}
            footer={
              dataSource.length > 0
                ? () => (
                    <div className="f3">
                      Average:{' '}
                      <strong>
                        {R.pipe(
                          R.mean,
                          round,
                          R.defaultTo('-')
                        )(nonNullVotes)}
                      </strong>
                      <br />
                      Rounded:{' '}
                      <strong>
                        {R.pipe(
                          R.mean,
                          Math.round,
                          R.defaultTo('-')
                        )(nonNullVotes)}
                      </strong>
                      <br />
                      Median:{' '}
                      <strong>
                        {R.pipe(
                          R.median,
                          R.defaultTo('-')
                        )(nonNullVotes)}
                      </strong>
                    </div>
                  )
                : null
            }
          />
        </Card>
      )
    }}
  </Consumer>
)

export default withAuthorization(R.identity)(Result)
