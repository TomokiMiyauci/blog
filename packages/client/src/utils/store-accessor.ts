/* eslint-disable import/no-mutable-exports */

import Notice from '@/store/notice'
import User from '@/store/user'
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'

let user: User
let notice: Notice
function initializeStores(store: Store<any>): void {
  user = getModule(User, store)
  notice = getModule(Notice, store)
}

export { initializeStores, user, notice }
