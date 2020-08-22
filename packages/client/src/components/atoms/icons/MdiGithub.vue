<template>
  <lazy-base-svg v-bind="$attrs">
    <path :d="mdiGithub" />
  </lazy-base-svg>
</template>

<script lang="ts">
  import { mdiGithub } from '@mdi/js'
  import { defineComponent } from 'nuxt-composition-api'

  export default defineComponent({
    setup() {
      return { mdiGithub }
    }
  })
</script>
