export type Article = {
  like: number
  view: number
}

export type LikedUser = {
  userRef: firebase.firestore.DocumentReference
}

export type User = {
  createdAt: Date
}

export type LikedArticle = {
  articleRef: firebase.firestore.DocumentReference
}
