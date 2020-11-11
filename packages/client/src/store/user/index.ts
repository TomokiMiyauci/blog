import type firebase from 'firebase'
import { Module, Mutation, VuexModule, Action } from 'vuex-module-decorators'

@Module({
  name: 'user',
  stateFactory: true,
  namespaced: true
})
export default class User extends VuexModule {
  private _id?: firebase.UserInfo['uid']
  private _isAnonymous: firebase.User['isAnonymous'] = true

  @Mutation
  setId(id: firebase.UserInfo['uid']): void {
    this._id = id
  }

  @Mutation
  setIsAnonymous(isAnonymous: firebase.User['isAnonymous']): void {
    this._isAnonymous = isAnonymous
  }

  @Action
  setUser({ uid, isAnonymous }: firebase.User): void {
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

  get isAnonymous(): firebase.User['isAnonymous'] {
    return this._isAnonymous
  }
}
