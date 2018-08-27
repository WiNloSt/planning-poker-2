import React from 'react'
import { withSiteData, Redirect } from 'react-static'

import { Consumer } from '../store'
import { Condition } from '../components/Condition'

export default withSiteData(() => (
  <div>
    <Consumer>
      {({ isUserLoaded, authUser }) => (
        <Condition.True condition={isUserLoaded && !authUser}>
          <Redirect to="signin" />
        </Condition.True>
      )}
    </Consumer>
    <h1 style={{ textAlign: 'center' }}>Please login</h1>
  </div>
))
