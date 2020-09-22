<template>
  <topic-select class="bg-white dark:bg-gray-900" @select="onSelect" />
</template>

<script lang="ts">
  import { user } from '@/store'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    validate({ app, params, redirect }) {
      if (params.uid === user.id && !user.isAnonymous) {
        return true
      }

      redirect(
        app.localePath({
          name: 'chat'
        })
      )

      return false
    },

    setup(_, { root }) {
      const onSelect = () => {
        root.$router.push({
          path: 'other',
          append: true
        })
      }

      return { onSelect }
    }
  })
</script>
