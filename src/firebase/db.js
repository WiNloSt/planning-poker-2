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

export const onVotes = cb =>
  db
    .collection('votes')
    .where('point', '>=', 0)
    .onSnapshot(snapshot => {
      const votes = []
      snapshot.forEach(doc => {
        votes.push({ id: doc.id, ...doc.data() })
      })

      cb(votes)
    })

export const onVote = cb =>
  db.doc(`votes/${auth.currentUser.email}`).onSnapshot(doc => {
    cb(doc.data())
  })

export const removeVote = () =>
  db.doc(`votes/${auth.currentUser.email}`).set(
    {
      point: null,
      user: {
        photoURL: auth.currentUser.photoURL
      }
    },
    { merge: true }
  )

export const removeAllVotes = async () => {
  const batch = db.batch()
  await db
    .collection('votes')
    .where('point', '>=', 0)
    .get()
    .then(snapShot => {
      snapShot.forEach(doc => {
        batch.set(doc.ref, { point: null }, { merge: true })
      })
    })

  batch.commit()
}

export const createVote = point =>
  db.doc(`votes/${auth.currentUser.email}`).set(
    {
      point,
      user: {
        photoURL: auth.currentUser.photoURL
      }
    },
    { merge: true }
  )
