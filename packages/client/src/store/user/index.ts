import type { User as UserInfo } from 'firebase'
import { Module, Mutation, VuexModule, Action } from 'vuex-module-decorators'

@Module({
  name: 'user',
  stateFactory: true,
  namespaced: true
})
export default class User extends VuexModule {
  private _id?: UserInfo['uid']
  private _isAnonymous: UserInfo['isAnonymous'] = true

  @Mutation
  setId(id: UserInfo['uid']): void {
    this._id = id
  }

  @Mutation
  setIsAnonymous(isAnonymous: UserInfo['isAnonymous']): void {
    this._isAnonymous = isAnonymous
  }

  @Action
  setUser({ uid, isAnonymous }: UserInfo): void {
    this.setId(uid)
    this.setIsAnonymous(isAnonymous)
  }

  @Mutation
  removeId(): void {
    this._id = ''
  }

  @Mutation
  switch(): void {
    this._isAnonymous = !this._isAnonymous
  }

  get login(): boolean {
    return !!this._id
  }

  get id(): firebase.User['uid'] | undefined {
    return this._id
  }

  get isAnonymous(): UserInfo['isAnonymous'] {
    return this._isAnonymous
  }
}
