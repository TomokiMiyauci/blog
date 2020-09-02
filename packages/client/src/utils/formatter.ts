export const formatDate = (date: Date | string, locale: string = 'en'): string => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }

  return typeof date === 'string'
    ? new Date(date).toLocaleDateString(locale, options)
    : date.toLocaleDateString(locale, options)
}

export const timestamp2Date = (timestamp: firebase.firestore.FieldValue): Date => {
  const t = timestamp as firebase.firestore.Timestamp
  return t.toDate()
}
