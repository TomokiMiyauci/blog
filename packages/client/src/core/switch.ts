import { ref, computed } from '@nuxtjs/composition-api'

export default (init = false) => {
  const _state = ref(init)
  const state = computed(() => _state.value)
  const on = (): void => {
    _state.value = true
  }
  const off = (): void => {
    _state.value = false
  }
  const switchState = (): void => {
    _state.value = !_state.value
  }

  return { state, on, off, switchState }
}
