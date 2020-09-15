<template>
  <button-circle style="width: 80px; height: 80px" @click="onClick">
    <google-icon width="80" height="80" />
  </button-circle>
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup(_, { root }) {
      const onClick = () => {
        root.$fireAuth.signInWithPopup(new root.$fireAuthObj.GoogleAuthProvider())
      }

      return { onClick }
    }
  })
</script>
