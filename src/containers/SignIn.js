import React from 'react'

import { GoogleSignInButton } from '../components/GoogleSignInButton'
import { Consumer } from '../store'
import { Condition } from '../components/Condition'
import { Redirect } from 'react-static'

export default () => (
  <Consumer>
    {({ authUser, isUserLoaded }) => (
      <div style={{ textAlign: 'center' }}>
        <Condition.True condition={authUser}>
          <Redirect to="/" />
        </Condition.True>
        <h1 className="mt0">SignIn</h1>
        <GoogleSignInButton loading={!isUserLoaded} />
      </div>
    )}
  </Consumer>
)
