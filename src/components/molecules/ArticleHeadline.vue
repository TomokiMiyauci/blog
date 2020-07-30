<template>
  <nuxt-link tag="article" to="/h" class="bg-blue p-4 m-4 border rounded cursor-pointer">
    <h2>{{ headline.title }}</h2>
    <p>{{ headline.description }}</p>
  </nuxt-link>
</template>

<script lang="ts">
  // eslint-disable-next-line import/named
  import { defineComponent, PropType } from 'nuxt-composition-api'
  type Headline = {
    title: string
    description: string
  }
  export default defineComponent({
    props: {
      headline: {
        type: Object as PropType<Headline>,
        required: true
      }
    }
  })
</script>
