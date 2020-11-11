<template>
  <button-circle style="width: 80px; height: 80px" @click="onClick">
    <google-icon width="80" height="80" />
  </button-circle>
</template>

<script lang="ts">
  import ButtonCircle from '@/components/atoms/buttons/ButtonCircle.vue'
  import GoogleIcon from '@/components/atoms/icons/GoogleIcon.vue'
  import { defineComponent, useContext } from '@nuxtjs/composition-api'

  export default defineComponent({
    components: {
      ButtonCircle,
      GoogleIcon
    },

    setup(_, { root, emit }) {
      useContext()
      const onClick = async (): Promise<void> => {
        const { user } = await root.$fire.auth.signInWithPopup(new root.$fireModule.auth.GoogleAuthProvider())

        if (user) {
          emit('signin', user)
        }
      }

      return { onClick }
    }
  })
</script>
