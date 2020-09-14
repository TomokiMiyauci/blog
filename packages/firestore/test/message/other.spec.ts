import * as firebase from '@firebase/testing'

import { initFirestore, clearFirestore, terminateFirestore, unauthApp, authApp, timestamp } from '../index'

describe('other', () => {
  beforeAll(initFirestore)

  afterEach(clearFirestore)

  afterAll(terminateFirestore)

  describe('[UNAUTH]', () => {
    const firestore = unauthApp()
    const messageRef = firestore.collection('messages')
    const messageDoc = messageRef.doc('admin')
    const otherRef = messageDoc.collection('other')
    const otherDoc = otherRef.doc('otherId')

    it('[POST: NG]', () => {
      return firebase.assertFails(
        otherDoc.set({
          name: 'name',
          text: 'text',
          isUser: true,
          createdAt: timestamp
        })
      )
    })
  })

  describe('AUTH', () => {
    const firestore = authApp()
    const messageRef = firestore.collection('messages')
    const messageDoc = messageRef.doc('userId')
    const otherRef = messageDoc.collection('other')
    const otherDoc = otherRef.doc('otherId')

    it('[POST: OK]name:string, text:string, isUser:bool, createdAt: timestamp::own', () => {
      const messageDoc = messageRef.doc('admin')
      const otherRef = messageDoc.collection('other')
      const otherDoc = otherRef.doc('otherId')

      return firebase.assertSucceeds(
        otherDoc.set({
          name: 'name',
          text: 'text',
          isUser: true,
          createdAt: timestamp
        })
      )
    })

    it('[POST: NG]::not own', () => {
      return firebase.assertFails(
        otherDoc.set({
          name: 'name',
          text: 'text',
          isUser: true,
          createdAt: timestamp
        })
      )
    })

    it('[POST: NG]any', async () => {
      await firebase.assertFails(
        otherDoc.set({
          name: 'name'
        })
      )

      await firebase.assertFails(
        otherDoc.set({
          text: 'text'
        })
      )

      await firebase.assertFails(
        otherDoc.set({
          isUser: true
        })
      )

      await firebase.assertFails(
        otherDoc.set({
          createdAt: timestamp
        })
      )
    })
  })
})
