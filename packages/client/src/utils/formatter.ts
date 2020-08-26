import type firebase from 'firebase'

export const formatDate = (date: Date, locale: string = 'en'): string => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString(locale, options)
}

export const timestamp2Date = (timestamp: firebase.firestore.Timestamp | firebase.firestore.FieldValue): Date => {
  const t = (timestamp as any) as firebase.firestore.Timestamp

  return t.toDate()
}
