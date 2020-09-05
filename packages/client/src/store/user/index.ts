import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

@Module({
  name: 'user',
  stateFactory: true,
  namespaced: true
})
export default class User extends VuexModule {
  private _id?: string

  @Mutation
  setId(id: string): void {
    this._id = id
  }

  @Mutation
  removeId(): void {
    this._id = ''
  }

  get login(): boolean {
    return !!this._id
  }

  get id(): firebase.User['uid'] | undefined {
    return this._id
  }
}
