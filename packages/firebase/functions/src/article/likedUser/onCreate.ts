import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

export default functions
  .region('asia-northeast1')
  .firestore.document('articles/{slug}/likedUsers/{uid}')
  .onCreate((snapshot) => {
    const userRef = snapshot.data().userRef as admin.firestore.DocumentReference
    const articleRef = snapshot.ref.parent.parent
    if (!articleRef) return

    const batch = admin.firestore().batch()
    batch.set(userRef.collection('likedArticles').doc(articleRef.id), {
      articleRef
    })

    batch.update(articleRef, {
      like: admin.firestore.FieldValue.increment(1)
    })

    return batch.commit()
  })
