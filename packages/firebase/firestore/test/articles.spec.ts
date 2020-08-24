import fs from 'fs'

import * as firebase from '@firebase/testing'

import { PROJECT_ID } from './'

const authApp = () => {
  return firebase
    .initializeTestApp({
      projectId: PROJECT_ID,
      auth: { uid: 'admin', name: 'admin' }
    })
    .firestore()
}

const unauthApp = () => {
  return firebase
    .initializeTestApp({
      projectId: PROJECT_ID
    })
    .firestore()
}

const timestamp = firebase.firestore.FieldValue.serverTimestamp()

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
    const firestore = unauthApp()
    const publicRooms = firestore.collection('articles')

    it('[LIST] unauthed', async () => {
      await firebase.assertSucceeds(publicRooms.get())
    })

    it('should not get', async () => {
      const firestore = authedApp()
      const publicRooms = firestore.collection('articles').doc('something')
      await firebase.assertSucceeds(publicRooms.get())
    })

    // it('[UPDATE: OK]', () => {
    //   firebase.assertFails(publicRooms.doc('something').update({}))
    // })

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
        slugRef.add({
          comment: 0
        })
      )
      await firebase.assertSucceeds(
        slugRef.doc('slug').set({
          view: 0,
          like: 0
        })
      )
    })

    describe('comments', () => {
      describe('UNAUTH', () => {
        const firestore = unauthApp()
        const commentRef = firestore.collection('articles').doc('slug').collection('comments')
        const commentDoc = firestore.collection('articles').doc('slug').collection('comments').doc('comment')

        it('[LIST: OK]', () => {
          firebase.assertSucceeds(commentRef.get())
        })

        it('[GET: OK]', () => {
          firebase.assertSucceeds(commentDoc.get())
        })

        it('[POST: NG]', () => {
          firebase.assertFails(
            commentDoc.set({
              text: 'comment',
              userRef: commentDoc,
              createdAt: timestamp
            })
          )
        })

        it('[DELETE: NG]', () => {
          firebase.assertFails(commentDoc.delete())
        })
      })

      describe('AUTH', () => {
        const firestore = authApp()
        const commentRef = firestore.collection('articles').doc('slug').collection('comments')
        const commentDoc = firestore.collection('articles').doc('slug').collection('comments').doc('comment')

        describe('[POST]', () => {
          it('[NG]', () => {
            firebase.assertFails(commentRef.add({}))
          })

          it('[NG]text:any', () => {
            firebase.assertFails(
              commentRef.add({
                text: 0,
                userRef: commentDoc,
                createdAt: timestamp
              })
            )
          })

          it('[NG]>3', () => {
            firebase.assertFails(
              commentRef.add({
                text: 'comment',
                userRef: commentDoc,
                createdAt: timestamp,
                hoge: 1
              })
            )
          })

          it('[OK]text:string, createdAt:timestamp', () => {
            firebase.assertSucceeds(
              commentRef.add({
                text: 'comment',
                userRef: commentDoc,
                createdAt: timestamp
              })
            )
          })
        })

        it('[UPDATE: NG]', () => {
          firebase.assertFails(
            commentDoc.update({
              text: 'comment',
              userRef: commentDoc,
              createdAt: timestamp
            })
          )
        })

        it('[DELETE: OK]', () => {
          firebase.assertSucceeds(commentDoc.delete())
        })
      })
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
