import * as admin from 'firebase-admin'
admin.initializeApp()

const files = {
  onCreateUser: './user'
}

const loadFunctions = (filesObj: { [key: string]: string }): void => {
  Object.keys(filesObj).forEach((files) => {
    if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME.startsWith(files)) {
      module.exports[files] = require(filesObj[files]).default
    }
  })
}

loadFunctions(files)
