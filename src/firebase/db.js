import { db } from './config'

export const onCards = cb =>
  db.collection('cards').orderBy('point').onSnapshot(snapshot => {
    const cards = []
    snapshot.forEach(doc => {
      cards.push(doc.data())
    })

    cb(cards)
  })
