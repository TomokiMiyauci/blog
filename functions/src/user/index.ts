import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

const firestore = admin.firestore()

export default functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate(user => {
    const timestamp = admin.firestore.FieldValue.serverTimestamp()

    return firestore
      .collection('users')
      .doc(user.uid)
      .set({
        createdAt: timestamp,
        updatedAt: timestamp
      })
  })
