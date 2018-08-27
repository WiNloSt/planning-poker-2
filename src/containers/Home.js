import React from 'react'
import { Redirect } from 'react-static'

import { Consumer } from '../store'
import { Condition } from '../components/Condition'

export default () => (
  <React.Fragment>
    <Consumer>
      {({ isUserLoaded, authUser }) => (
        <Condition.True condition={isUserLoaded && !authUser}>
          <Redirect to="signin" />
        </Condition.True>
      )}
    </Consumer>
    <h1 style={{ textAlign: 'center' }}>Home</h1>
  </React.Fragment>
)
