import fs from 'fs'

import * as firebase from '@firebase/testing'

const PROJECT_ID = 'test',
  timestamp = firebase.firestore.FieldValue.serverTimestamp()

describe('firestore', () => {
  beforeAll(async () => {
    await firebase.loadFirestoreRules({
      projectId: PROJECT_ID,
      rules: fs.readFileSync('../firebase/firestore.rules', 'utf8')
    })
  })

  afterEach(async () => {
    await firebase.clearFirestoreData({ projectId: PROJECT_ID })
  })

  afterAll(async () => {
    await Promise.all(firebase.apps().map(app => app.delete()))
  })

  /*
   * Auth : {uid:'alice'}
   * auth : {uid:'alice', admin:true} admin
   * auth : null
   */
  function authedApp(auth?: { [key in string]: string }): firebase.firestore.Firestore {
    return firebase
      .initializeTestApp({
        projectId: PROJECT_ID,
        auth
      })
      .firestore()
  }

  describe('articles/', () => {
    it('should read when authed', async () => {
      const firestore = authedApp({ uid: 'admin', name: 'admin' }),
        publicRooms = firestore.collection('articles')

      await firebase.assertSucceeds(publicRooms.get())
    })

    it('should write when authed', async () => {
      const firestore = authedApp({
          uid: 'authenticated',
          name: 'authenticated'
        }),
        publicRooms = firestore.collection('articles')

      await firebase.assertFails(
        publicRooms.add({
          createdAt: timestamp,
          updatedAt: timestamp,
          recent: {
            updatedAt: timestamp
          }
        })
      )
    })

    it('should not get', async () => {
      const firestore = authedApp(),
        publicRooms = firestore.collection('articles').doc('something')
      await firebase.assertSucceeds(publicRooms.get())
    })
  })
})
