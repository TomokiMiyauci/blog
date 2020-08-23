import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

import { IncomingWebhook } from '@slack/webhook'
const webhook = new IncomingWebhook(functions.config().slack.url)

export default functions
  .region('asia-northeast1')
  .firestore.document('articles/{slug}/comments/{comment}')
  .onCreate(async (snapshot) => {
    const text = snapshot.data().text as string
    const userRef = snapshot.data().userRef as admin.firestore.DocumentReference

    const articleRef = snapshot.ref.parent.parent

    if (!articleRef || !text || !userRef) return

    const batch = admin.firestore().batch()

    batch.update(articleRef, {
      comment: admin.firestore.FieldValue.increment(1)
    })

    await batch.commit()
    const message = {
      icon_emoji: ':simple_smile:',
      username: `${userRef.id} / ${articleRef.id}`,
      text
    }

    return webhook.send(message)
  })
