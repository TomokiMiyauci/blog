/* eslint-disable import/no-mutable-exports */

import User from '@/store/user'
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'

let user: User

function initializeStores(store: Store<any>): void {
  user = getModule(User, store)
}

export { initializeStores, user }
