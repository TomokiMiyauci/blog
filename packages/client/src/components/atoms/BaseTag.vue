<template>
  <nuxt-link
    class="px-4 py-1 rounded-full shadow m-2 cursor-pointer justify-center items-center inline-flex hover:shadow-md hover:bg-gray-200 transition duration-300 delay-100"
    :to="localePath({ name: 'tags-tag', params: { tag: name } })"
  >
    <slot />
    <span class="ml-1">{{ name }}</span></nuxt-link
  >
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api'
  export default defineComponent({
    props: {
      name: {
        type: String,
        default: ''
      }
    }
  })
</script>
