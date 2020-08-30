import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

export default functions
  .region('asia-northeast1')
  .firestore.document('articles/{slug}/viewedUsers/{uid}')
  .onCreate((snapshot) => {
    const articleRef = snapshot.ref.parent.parent
    if (!articleRef) return

    return articleRef.update({
      view: admin.firestore.FieldValue.increment(1)
    })
  })
