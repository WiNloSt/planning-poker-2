import React from 'react'

import { GoogleSignInButton } from '../components/GoogleSignInButton'
import { Consumer } from '../store'
import { Condition } from '../components/Condition'

export default () => (
  <Consumer>
    {({ authUser, isUserLoaded }) => (
      <div>
        <Condition.True condition={authUser}>{() => authUser.email}</Condition.True>
        <h1>SignIn</h1>
        <GoogleSignInButton loading={!isUserLoaded} />
      </div>
    )}
  </Consumer>
)
