import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyCWW61pkS8yqTTaNqrv7sONWdpzCDS2I8Q',
  authDomain: 'planning-poker-2.firebaseapp.com',
  databaseURL: 'https://planning-poker-2.firebaseio.com',
  projectId: 'planning-poker-2',
  storageBucket: 'planning-poker-2.appspot.com',
  messagingSenderId: '175173845161'
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const db = firebase.firestore()
const auth = firebase.auth()

export { db, auth }
