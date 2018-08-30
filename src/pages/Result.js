import React from 'react'
import { Table } from 'antd'
import * as R from 'ramda'

import { Consumer } from '../store'

const columns = [{ dataIndex: 'point', title: 'Point' }, { dataIndex: 'votes', title: 'Votes' }]

const Result = () => (
  <React.Fragment>
    <h1>Result</h1>
    <Consumer>
      {({ cards, votes }) => {
        const pointMap = votes.reduce(
          (map, vote) => R.over(R.lensProp(vote.point), R.add(1), map),
          cards.reduce((map, card) => ({ ...map, [card.point]: 0 }), {})
        )

        const dataSource = Object.keys(pointMap).map((key, index) => {
          const value = pointMap[key]

          return {
            key: index,
            point: key,
            votes: value
          }
        })

        return <Table dataSource={dataSource} columns={columns} />
      }}
    </Consumer>
  </React.Fragment>
)

export default Result
