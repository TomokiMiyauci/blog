import { initializeStores } from '@/utils/store-accessor'
import { Store } from 'vuex'

const initializer = (store: Store<any>) => initializeStores(store)

export const plugins = [initializer]
export const state = () => ({})
export type RootState = ReturnType<typeof state>
export * from '@/utils/store-accessor'
