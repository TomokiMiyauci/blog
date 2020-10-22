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

/**
 * @param string
 * @return string camelCase
 */
const toCamelCase = (str: string): string => {
  str = str.charAt(0).toLowerCase() + str.slice(1)
  return str.replace(/[-_](.)/g, (match, group1) => {
    return group1.toUpperCase()
  })
}

/**
 * @param string
 * @return string snake_case
 */
export const toSnackCase = (str: string): string => {
  const camel = toCamelCase(str)
  return camel.replace(/[A-Z]/g, (s) => {
    return '_' + s.charAt(0).toLowerCase()
  })
}

/**
 * @param string
 * @return string kebab-case
 */
export const toKebabCase = (str: string): string => {
  const camel = toCamelCase(str)
  return camel.replace(/[A-Z]/g, (s) => {
    return '-' + s.charAt(0).toLowerCase()
  })
}

/**
 * @param string
 * @return string PascalCase
 */
export const toPascalCase = (str: string): string => {
  const camel = toCamelCase(str)
  return camel.charAt(0).toUpperCase() + camel.slice(1)
}
