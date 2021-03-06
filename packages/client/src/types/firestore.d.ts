import type { userDoc } from '@/utils/firestore-reference'
import type firebase from 'firebase'

export type Article = {
  like: number
  view: number
}

export type LikedUser = {
  userRef: firebase.firestore.DocumentReference
}

export type ViewedUser = {
  userRef: firebase.firestore.DocumentReference
}

export type User = {
  createdAt: Date
}

export type LikedArticle = {
  articleRef: firebase.firestore.DocumentReference
}

export type Comment = {
  id?: string
  userRef: ReturnType<typeof userDoc>
  createdAt: firebase.firestore.Timestamp | firebase.firestore.FieldValue
  text: string
}

export type ReportedUser = {
  userRef: ReturnType<typeof userDoc>
  createdAt: firebase.firestore.Timestamp | firebase.firestore.FieldValue
}

export type Other = {
  name: string
  text: string
  isUser: boolean
  createdAt: firebase.firestore.Timestamp | firebase.firestore.FieldValue
}
