import { db, auth } from './config'

export const onCards = cb =>
  db
    .collection('cards')
    .orderBy('point')
    .onSnapshot(snapshot => {
      const cards = []
      snapshot.forEach(doc => {
        cards.push({ id: doc.id, ...doc.data() })
      })

      cb(cards)
    })

export const onVote = cb =>
  db.doc(`votes/${auth.currentUser.email}`).onSnapshot(doc => {
    cb(doc.data())
  })

export const removeVote = () =>
  db.doc(`votes/${auth.currentUser.email}`).set({
    point: null
  })

export const createVote = point =>
  db.doc(`votes/${auth.currentUser.email}`).set({
    point
  })
