import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'

const provider = new firebase.auth.GoogleAuthProvider()

const signIn = () => {
  firebase.auth().signInWithRedirect(provider)
}

export const Component = () => <button onClick={signIn}>sign in with Google</button>

export const GoogleSignInButton = Component
