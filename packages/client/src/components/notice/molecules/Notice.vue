<template>
  <transition name="fade-left">
    <base-snackbar v-show="notice.isShow" :message="notice.message" @click="notice.resetNotice" />
  </transition>
</template>

<script lang="ts">
  import BaseSnackbar from '@/components/atoms/BaseSnackbar.vue'
  import { notice } from '@/store'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    components: {
      BaseSnackbar
    },

    setup() {
      return { notice }
    }
  })
</script>
