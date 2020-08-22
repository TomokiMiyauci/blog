import fs from 'fs'

import * as firebase from '@firebase/testing'

import { PROJECT_ID } from './'

describe('firestore', () => {
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
    it('[GET] unauthed', async () => {
      const firestore = authedApp({ uid: 'admin', name: 'admin' })
      const publicRooms = firestore.collection('articles')

      await firebase.assertSucceeds(publicRooms.get())
    })

    it('should not get', async () => {
      const firestore = authedApp()
      const publicRooms = firestore.collection('articles').doc('something')
      await firebase.assertSucceeds(publicRooms.get())
    })

    describe('{slug}/', () => {
      it('[GET]', async () => {
        const firestore = authedApp({ uid: 'admin', name: 'admin' })
        const publicRooms = firestore.collection('articles').doc('slug')

        await firebase.assertSucceeds(publicRooms.get())
      })

      it('[POST: OK]view, like', async () => {
        const firestore = authedApp({ uid: 'admin', name: 'admin' })
        const slugRef = firestore.collection('articles')

        await firebase.assertSucceeds(
          slugRef.add({
            view: 0
          })
        )
        await firebase.assertSucceeds(
          slugRef.add({
            like: 0
          })
        )
        await firebase.assertSucceeds(
          slugRef.doc('slug').set({
            view: 0,
            like: 0
          })
        )
      })

      describe('likedUsers/', () => {
        const firestore = authedApp({ uid: 'admin', name: 'admin' })
        const likedUsersRef = firestore.collection('articles').doc('slug').collection('likedUsers')
        it('[GET: OK]', async () => {
          await firebase.assertSucceeds(likedUsersRef.get())
        })

        describe('{likedUser}/', () => {
          const likedUserRef = likedUsersRef.doc('likedUser')
          it('[GET: OK]', async () => {
            await firebase.assertSucceeds(likedUserRef.get())
          })

          it('[POST: OK]userRef', async () => {
            await firebase.assertSucceeds(
              likedUserRef.set({
                userRef: likedUserRef
              })
            )
          })

          it('[DELETE: OK]', async () => {
            await firebase.assertSucceeds(likedUserRef.delete())
          })
        })
      })
    })
  })
})
