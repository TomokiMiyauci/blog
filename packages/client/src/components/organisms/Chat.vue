<template>
  <div>
    <button-chat v-show="!state" @click="onClick" />

    <transition name="sp">
      <messenger v-show="state" class="transform" @close="off" />
    </transition>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from '@nuxtjs/composition-api'

  const useState = () => {
    const state = ref(false)

    const on = (): void => {
      state.value = true
    }

    const off = (): void => {
      state.value = false
    }

    return {
      state,
      on,
      off
    }
  }
  export default defineComponent({
    setup() {
      const { state, on, off } = useState()

      const onClick = () => (state.value ? off() : on())

      return { state, onClick, off }
    }
  })
</script>

<style scoped lang="scss">
  .sp {
    &-enter {
      @apply -translate-y-6 scale-0;
    }

    &-enter-active {
      @apply transition-all duration-300;
    }
  }
</style>
