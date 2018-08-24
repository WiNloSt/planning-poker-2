import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import { Button } from 'antd'

const provider = new firebase.auth.GoogleAuthProvider()

const signIn = () => {
  firebase.auth().signInWithRedirect(provider)
}

export const GoogleSignInButton = () => (
  <Button type="primary" size="large" onClick={signIn}>
    sign in with Google
  </Button>
)
