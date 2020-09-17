import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

@Module({
  name: 'user',
  stateFactory: true,
  namespaced: true
})
export default class User extends VuexModule {
  private _id?: string
  private _isAnonymous: boolean = true

  @Mutation
  setId(id: string): void {
    this._id = id
  }

  @Mutation
  removeId(): void {
    this._id = ''
  }

  @Mutation
  switch(): void {
    this._isAnonymous = !this._isAnonymous
  }

  @Mutation
  setIsAnonymous(isAnonymous: boolean): void {
    this._isAnonymous = isAnonymous
  }

  get login(): boolean {
    return !!this._id
  }

  get id(): firebase.User['uid'] | undefined {
    return this._id
  }

  get isAnonymous(): boolean {
    return this._isAnonymous
  }
}
