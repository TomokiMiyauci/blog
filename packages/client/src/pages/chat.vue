<template>
  <messenger
    class="w-full relative justify-center"
    :is-login="!user.isAnonymous"
    :step="swichState($route.hash)"
    style="height: calc(100vh - 119px)"
    @select="onSelect"
    @back="onBack"
  />
</template>

<script lang="ts">
  import { user } from '@/store'
  import { defineComponent } from '@nuxtjs/composition-api'

  type MessageState = 'entrance' | 'other'

  type Hash = '#message:entrance' | '#message:other'

  const swichState = (hash: string): MessageState => {
    switch (hash) {
      case '#message:entrance': {
        return 'entrance'
      }

      case '#message:other': {
        return 'other'
      }

      default: {
        return 'entrance'
      }
    }
  }

  export default defineComponent({
    setup(_, { root }) {
      const onSelect = (option: 'other'): void => {
        root.$router.replace({ hash: `message:${option}` })
      }
      const onBack = (): void => {
        root.$router.replace({ hash: 'message:entrance' })
      }

      return { isLogin: true, step: 'other', user, swichState, onSelect, onBack }
    }
  })
</script>
