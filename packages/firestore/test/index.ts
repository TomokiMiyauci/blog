export const PROJECT_ID = 'test'
import * as firebase from '@firebase/rules-unit-testing'
import fs from 'fs'

export const timestamp = firebase.firestore.FieldValue.serverTimestamp()

export const authApp = (): firebase.firestore.Firestore => {
  return firebase
    .initializeTestApp({
      projectId: PROJECT_ID,
      auth: { uid: 'admin', name: 'admin' }
    })
    .firestore()
}

export const unauthApp = (): firebase.firestore.Firestore => {
  return firebase
    .initializeTestApp({
      projectId: PROJECT_ID
    })
    .firestore()
}

export const initFirestore = (): Promise<void> => {
  return firebase.loadFirestoreRules({
    projectId: PROJECT_ID,
    rules: fs.readFileSync('firestore.rules', 'utf8')
  })
}

export const clearFirestore = (): Promise<void> => {
  return firebase.clearFirestoreData({ projectId: PROJECT_ID })
}

export const terminateFirestore = (): Promise<any[]> => {
  return Promise.all(firebase.apps().map((app) => app.delete()))
}
