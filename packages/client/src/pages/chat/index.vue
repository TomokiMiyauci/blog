<template>
  <sign-in @signin="onSignin" />
</template>

<script lang="ts">
  import { user } from '@/store'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup(_, { root }) {
      const onSignin = (): void => {
        if (user.id && !user.isAnonymous) {
          root.$router.replace(
            root.localePath({
              name: 'chat-uid',
              params: {
                uid: user.id
              }
            })
          )
        }
      }

      onSignin()

      return {
        onSignin
      }
    }
  })
</script>
