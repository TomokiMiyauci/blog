import { user } from '@/store'
import { Article, LikedArticle, User, LikedUser } from '@/types/firestore'
import type { useContext } from 'nuxt-composition-api'

export const articleRef = (
  $fireStore: firebase.firestore.Firestore
): firebase.firestore.CollectionReference<Article> => {
  return $fireStore.collection('articles') as firebase.firestore.CollectionReference<Article>
}

export const articleDoc = (ctx: ReturnType<typeof useContext>): firebase.firestore.DocumentReference<Article> => {
  return articleRef(ctx.$fireStore).doc(ctx.params.value.slug)
}

export const articleLikedUserRef = (
  ctx: ReturnType<typeof useContext>
): firebase.firestore.CollectionReference<LikedUser> => {
  return articleDoc(ctx).collection('likedUsers') as firebase.firestore.CollectionReference<LikedUser>
}

export const articleLikedUserDoc = (
  ctx: ReturnType<typeof useContext>
): firebase.firestore.DocumentReference<LikedUser> => {
  return articleLikedUserRef(ctx).doc(user.id)
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
