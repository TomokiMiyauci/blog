<template>
  <span class="ml-2 text-3xl leading-none tracking-tighter lg:text-4xl text-teal-900 dark:text-white"
    ><span style="color: #72deaf">{{ i }}</span
    >{{ ntelli }}<span style="color: #72deaf">{{ s }}</span
    >{{ ense }}</span
  >
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api'

  const i = 'I'
  const ntelli = 'ntelli'
  const s = 'S'
  const ense = 'ense'

  export default defineComponent({
    setup() {
      return {
        i,
        ntelli,
        s,
        ense
      }
    }
  })
</script>
