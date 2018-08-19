import React from 'react'

import { GoogleSignInButton } from '../components/GoogleSignInButton'
import { Consumer } from '../store'

export default () => (
  <Consumer>
    {({ authUser }) => (
      <div>
        {authUser && authUser.email}
        <h1>SignIn</h1>
        <GoogleSignInButton />
      </div>
    )}
  </Consumer>
)
