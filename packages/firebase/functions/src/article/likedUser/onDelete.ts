import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

export default functions
  .region('asia-northeast1')
  .firestore.document('articles/{slug}/likedUsers/{uid}')
  .onDelete((snapshot) => {
    const userRef = snapshot.data().userRef as admin.firestore.DocumentReference
    const articleRef = snapshot.ref.parent.parent
    if (!articleRef) return

    const batch = admin.firestore().batch()
    batch.delete(userRef.collection('likedArticles').doc(articleRef.id))

    batch.update(articleRef, {
      like: admin.firestore.FieldValue.increment(-1)
    })

    return batch.commit()
  })
