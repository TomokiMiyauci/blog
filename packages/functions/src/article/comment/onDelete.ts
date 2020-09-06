import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

export default functions
  .region('asia-northeast1')
  .firestore.document('articles/{slug}/comments/{comment}')
  .onDelete((snapshot) => {
    const articleRef = snapshot.ref.parent.parent

    if (!articleRef) return

    const batch = admin.firestore().batch()

    batch.update(articleRef, {
      comment: admin.firestore.FieldValue.increment(-1)
    })

    return batch.commit()
  })
