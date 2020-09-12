import { user } from '@/store'
import { Article, LikedArticle, Comment, User, LikedUser, ViewedUser, ReportedUser } from '@/types/firestore'
import type { useContext } from '@nuxtjs/composition-api'

export const articleRef = (
  $fireStore: firebase.firestore.Firestore
): firebase.firestore.CollectionReference<Article> => {
  return $fireStore.collection('articles') as firebase.firestore.CollectionReference<Article>
}

export const articleDoc = (
  ctx: ReturnType<typeof useContext>
): firebase.firestore.DocumentReference<Article> | undefined => {
  if (!ctx.params.value) return
  return articleRef(ctx.$fireStore).doc(ctx.params.value.slug)
}

export const articleLikedUserRef = (
  ctx: ReturnType<typeof useContext>
): firebase.firestore.CollectionReference<LikedUser> => {
  return articleDoc(ctx)!.collection('likedUsers') as firebase.firestore.CollectionReference<LikedUser>
}

export const articleLikedUserDoc = (
  ctx: ReturnType<typeof useContext>
): firebase.firestore.DocumentReference<LikedUser> => {
  if (!user.id) throw new Error('User')
  return articleLikedUserRef(ctx).doc(user.id)
}

export const viewedUserRef = (
  ctx: ReturnType<typeof useContext>
): firebase.firestore.CollectionReference<ViewedUser> => {
  return articleDoc(ctx)!.collection('viewedUsers') as firebase.firestore.CollectionReference<ViewedUser>
}

export const viewedUserDoc = (
  ctx: ReturnType<typeof useContext>
): firebase.firestore.DocumentReference<ViewedUser> | undefined => {
  if (!user.id) return
  return viewedUserRef(ctx).doc(user.id)
}

export const articleCommentRef = (
  ctx: ReturnType<typeof useContext>
): firebase.firestore.CollectionReference<Comment> | undefined => {
  const doc = articleDoc(ctx)
  if (!doc) return
  return doc.collection('comments') as firebase.firestore.CollectionReference<Comment>
}

export const articleCommentDoc = (
  ctx: ReturnType<typeof useContext>,
  docId: string
): firebase.firestore.DocumentReference<Comment> => {
  return articleCommentRef(ctx)!.doc(docId)
}

export const reportedUserRef = (
  ctx: ReturnType<typeof useContext>,
  docId: string
): firebase.firestore.CollectionReference<ReportedUser> => {
  return articleCommentDoc(ctx, docId).collection('reportedUsers') as firebase.firestore.CollectionReference<
    ReportedUser
  >
}

export const reportedUserDoc = (
  ctx: ReturnType<typeof useContext>,
  docId: string
): firebase.firestore.DocumentReference<ReportedUser> => {
  return reportedUserRef(ctx, docId).doc(user.id)
}

export const userRef = ($fireStore: firebase.firestore.Firestore): firebase.firestore.CollectionReference<User> => {
  return $fireStore.collection('users') as firebase.firestore.CollectionReference<User>
}

export const userDoc = (ctx: ReturnType<typeof useContext>): firebase.firestore.DocumentReference<User> => {
  return userRef(ctx.$fireStore).doc(user.id)
}

export const userLikedArticleRef = (
  ctx: ReturnType<typeof useContext>
): firebase.firestore.CollectionReference<LikedArticle> => {
  return userDoc(ctx).collection('likedArticles') as firebase.firestore.CollectionReference<LikedArticle>
}

export const userLikedArticleDoc = (
  ctx: ReturnType<typeof useContext>
): firebase.firestore.DocumentReference<LikedArticle> => {
  return userLikedArticleRef(ctx).doc(ctx.params.value.slug)
}
