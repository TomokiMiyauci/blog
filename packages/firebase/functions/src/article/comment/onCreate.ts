import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

import { IncomingWebhook } from '@slack/webhook'
const webhook = new IncomingWebhook(functions.config().slack.url)

export default functions
  .region('asia-northeast1')
  .firestore.document('articles/{slug}/comments/{comment}')
  .onCreate(async (snapshot, { auth }) => {
    const text = snapshot.data().text as string
    const articleRef = snapshot.ref.parent.parent

    console.log(111111111111111111)

    if (!articleRef) return

    const batch = admin.firestore().batch()

    batch.update(articleRef, {
      comment: admin.firestore.FieldValue.increment(1)
    })

    await batch.commit()
    const message = {
      icon_emoji: ':simple_smile:',
      username: auth.uid,
      text: `${articleRef.id}
${text}`
    }

    return webhook.send(message)
  })
