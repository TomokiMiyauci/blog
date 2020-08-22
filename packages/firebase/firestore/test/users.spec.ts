import fs from 'fs'

import * as firebase from '@firebase/testing'
import { PROJECT_ID } from './'
const timestamp = firebase.firestore.FieldValue.serverTimestamp()

describe('users/', () => {
  beforeAll(async () => {
    await firebase.loadFirestoreRules({
      projectId: PROJECT_ID,
      rules: fs.readFileSync('firestore.rules', 'utf8')
    })
  })

  afterEach(async () => {
    await firebase.clearFirestoreData({ projectId: PROJECT_ID })
  })

  afterAll(async () => {
    await Promise.all(firebase.apps().map((app) => app.delete()))
  })

  function authedApp(auth?: { [key in string]: string }): firebase.firestore.Firestore {
    return firebase
      .initializeTestApp({
        projectId: PROJECT_ID,
        auth
      })
      .firestore()
  }

  it('[CREATE]', async () => {
    const firestore = authedApp({ uid: 'admin', name: 'admin' })
    const publicRooms = firestore.collection('users')

    await firebase.assertSucceeds(
      publicRooms.add({
        createdAt: timestamp,
        updatedAt: timestamp
      })
    )
  })
})
