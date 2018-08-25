import React from 'react'

import { GoogleSignInButton } from '../components/GoogleSignInButton'
import { Consumer } from '../store'
import { Condition } from '../components/Condition'

export default () => (
  <Consumer>
    {({ authUser }) => (
      <div>
        <Condition.True condition={authUser}>{() => authUser.email}</Condition.True>
        <h1>SignIn</h1>
        <GoogleSignInButton />
      </div>
    )}
  </Consumer>
)
