import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import { Button } from 'antd'

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account'
})

const signIn = () => {
  firebase.auth().signInWithRedirect(provider)
}

export const GoogleSignInButton = props => (
  <Button {...props} type="primary" size="large" onClick={signIn}>
    {props.loading ? 'loading...' : 'sign in with Google'}
  </Button>
)
