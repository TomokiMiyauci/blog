import { wait } from '@/utils/timer'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

import { SET_MESSAGE, SET_TIMEOUT, SET_AUTO_CLOSE, SET_IS_OPEN } from './mutation-types'

type NoticeOptions = {
  message: string
  timeout: number
  autoClose: boolean
}

@Module({
  name: 'notice',
  stateFactory: true,
  namespaced: true
})
export default class Notice extends VuexModule {
  private _message: NoticeOptions['message'] = ''
  private _timeout: NoticeOptions['timeout'] = 5000
  private _autoClose: NoticeOptions['autoClose'] = true
  private _isOpen: boolean = false

  @Mutation
  private [SET_MESSAGE](message: NoticeOptions['message']): void {
    this._message = message
  }

  @Mutation
  private [SET_TIMEOUT](timeout: NoticeOptions['timeout']): void {
    this._timeout = timeout
  }

  @Mutation
  private [SET_AUTO_CLOSE](autoClose: NoticeOptions['autoClose']): void {
    this._autoClose = autoClose
  }

  @Mutation
  private [SET_IS_OPEN](isOpen: boolean): void {
    this._isOpen = isOpen
  }

  @Action({ rawError: true })
  async setNotice({ message, timeout, autoClose }: Partial<NoticeOptions>): Promise<void> {
    this[SET_MESSAGE](message || '')
    this[SET_TIMEOUT](timeout || 5000)
    this[SET_AUTO_CLOSE](autoClose || true)
    this[SET_IS_OPEN](true)

    if (this.autoClose) {
      await wait(this.timeout)
      this.resetNotice()
    }
  }

  @Action({ rawError: true })
  async resetNotice() {
    this[SET_IS_OPEN](false)
    await wait(1000)
    this[SET_MESSAGE]('')
    this[SET_TIMEOUT](0)
    this[SET_AUTO_CLOSE](true)
  }

  get message(): NoticeOptions['message'] {
    return this._message
  }

  get timeout(): NoticeOptions['timeout'] {
    return this._timeout
  }

  get autoClose(): NoticeOptions['autoClose'] {
    return this._autoClose
  }

  get isShow(): boolean {
    return this._isOpen
  }
}
