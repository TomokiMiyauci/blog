<template>
  <div class="relative">
    <button-chat
      v-show="!$route.hash"
      class="fixed bottom-6 right-6 invisible md:visible w-12 h-12 md:w-20 md:h-20 bg-gradient-to-t from-green-300 dark:from-gray-700 dark:to-blue-700 to-teal-400"
      @click="onClick"
    />

    <transition name="sp">
      <messenger
        v-show="$route.hash"
        :is-login="!user.isAnonymous"
        :enable-close="true"
        :step="swichState($route.hash)"
        class="transform"
        @back="onBack"
        @select="onSelect"
        @close="onClose"
      />
    </transition>
  </div>
</template>

<script lang="ts">
  import ButtonChat from '@/components/atoms/buttons/ButtonChat.vue'
  import useSwitch from '@/core/switch'
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
    components: {
      ButtonChat
    },

    setup(_, { root }) {
      const { state, off } = useSwitch()

      const onClick = () => {
        root.$router.push({
          hash: 'message:entrance'
        })
      }

      const onBack = () => {
        root.$router.replace({ hash: 'message:entrance' })
      }

      const onSelect = (option: 'other'): void => {
        root.$router.replace({ hash: `message:${option}` })
      }

      const onClose = () => {
        root.$router.replace({
          hash: undefined
        })
      }

      return { state, onClick, off, onClose, onBack, onSelect, swichState, user }
    }
  })
</script>

<style scoped lang="scss">
  .sp {
    &-enter {
      @apply scale-0 origin-bottom-right;
    }

    &-enter-active {
      @apply transition-all duration-300;
    }

    &-leave {
      @apply origin-center;
    }

    &-leave-active {
      @apply transition-all duration-300 origin-center;
    }

    &-leave-to {
      @apply scale-0;
    }
  }
</style>
