<template>
  <nuxt-link
    class="hover:text-green-500 hover:bg-gray-300 transition duration-300 cursor-pointer text-right p-1 rounded font-normal"
    v-bind="$attrs"
    :to="localePath({ name: 'post-slug', params: { slug: slug } })"
    @click.native.prevent="$emit('click')"
    v-html="highlight(title, keyword)"
  >
  </nuxt-link>
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api'
  const highlight = (text: string, search: string): string => {
    if (search) {
      const searchRegExp = new RegExp(search, 'ig')
      return text.replace(
        searchRegExp,
        (match) => `<mark class="bg-green-200 rounded text-green-900 font-bold">${match}</mark>`
      )
    }
    return text
  }

  export default defineComponent({
    props: {
      title: {
        type: String,
        default: ''
      },

      slug: {
        type: String,
        default: ''
      },

      keyword: {
        type: String,
        default: ''
      }
    },

    setup() {
      return { highlight }
    }
  })
</script>
