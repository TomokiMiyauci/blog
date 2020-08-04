<template>
  <IconifyIcon v-bind="$attrs" :icon="icon" :height="height" />
</template>

<script lang="ts">
  import IconifyIcon from '@iconify/vue'
  import { defineComponent } from 'nuxt-composition-api'

  export default defineComponent({
    components: {
      IconifyIcon
    },

    props: {
      icon: {
        type: Object,
        required: true
      },

      height: {
        type: String,
        default: '18'
      }
    }
  })
</script>
