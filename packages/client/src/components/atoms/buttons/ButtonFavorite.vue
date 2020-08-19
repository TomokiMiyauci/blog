<template>
  <lazy-button-circle v-bind="$attrs" @click="onClick"><lazy-mdi-heart /></lazy-button-circle>
</template>

<script lang="ts">
  import { user } from '@/store'
  import { defineComponent } from 'nuxt-composition-api'

  export default defineComponent({
    setup(_, { root, emit }) {
      const onClick = async () => {
        const slug = root.$route.params.slug
        if (!user.id) return
        await root.$fireStore
          .collection('articles')
          .doc(slug)
          .collection('likedUsers')
          .doc(user.id)
          .set(
            {
              userRef: root.$fireStore.collection('users').doc(user.id)
            },
            {
              merge: true
            }
          )
        emit('click')
      }
      return { onClick }
    }
  })
</script>
