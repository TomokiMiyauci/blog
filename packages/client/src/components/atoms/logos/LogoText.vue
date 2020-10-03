<template>
  <span class="ml-2 text-3xl leading-none tracking-tighter lg:text-4xl text-teal-900 dark:text-white"
    ><span style="color: #72deaf">{{ t }}</span
    >{{ ech }}<span style="color: #72deaf">{{ s }}</span
    >{{ rc }}</span
  >
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api'

  const t = 'T'
  const ech = 'ech'
  const s = 's'
  const rc = 'rc'

  export default defineComponent({
    setup() {
      return {
        t,
        ech,
        s,
        rc
      }
    }
  })
</script>
