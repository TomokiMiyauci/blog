<template>
  <nuxt-link
    tag="article"
    :to="{ name: 'slug', params: { slug: headline.slug } }"
    class="bg-blue p-4 m-4 border rounded cursor-pointer"
  >
    <h2>{{ headline.title }}</h2>
    <p>{{ headline.description }}</p>
  </nuxt-link>
</template>

<script lang="ts">
  import { Headline } from '@/types/article'
  import { defineComponent } from 'nuxt-composition-api'

  export default defineComponent({
    props: {
      headline: {
        type: Object as () => Headline,
        required: true
      }
    }
  })
</script>
