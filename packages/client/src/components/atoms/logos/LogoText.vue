<template>
  <span class="ml-2 text-3xl leading-none md:text-4xl xl:text-5xl text-teal-900 dark:text-white"
    ><span>
      <span style="color: #72deaf">{{ i }}</span
      ><span>{{ ntelli }}</span> </span
    ><span>
      <span style="color: #72deaf">{{ s }}</span
      ><span>{{ ense }}</span>
    </span>
  </span>
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
