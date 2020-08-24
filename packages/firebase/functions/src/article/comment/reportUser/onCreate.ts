import * as functions from 'firebase-functions'

import { IncomingWebhook } from '@slack/webhook'
const webhook = new IncomingWebhook(functions.config().slack.report)

export default functions
  .region('asia-northeast1')
  .firestore.document('articles/{slug}/comments/{comment}/reportedUsers/{reportedUser}')
  .onCreate(async (_, ctx) => {
    const userId = ctx.params.reportedUser as string
    const commentId = ctx.params.comment as string
    const slutId = ctx.params.slug as string

    const message = {
      icon_emoji: ':smiling_imp:',
      username: `${userId} / ${slutId}`,
      text: `${commentId} +1`
    }

    return webhook.send(message)
  })
