<template>
  <span>
    <component :is="tag" v-for="tag in tagList" :key="tag" />
  </span>
</template>

<script lang="ts">
  import { defineComponent, computed } from '@nuxtjs/composition-api'

  export default defineComponent({
    components: {
      TagNuxtjs: () => import('@/components/atoms/tags/TagNuxtjs.vue'),
      TagBlog: () => import('@/components/atoms/tags/TagBlog.vue'),
      TagTutorial: () => import('@/components/atoms/tags/TagTutorial.vue'),
      TagCompositionApi: () => import('@/components/atoms/tags/TagCompositionApi.vue'),
      TagNuxtI18n: () => import('@/components/atoms/tags/TagNuxtI18n.vue')
    },

    props: {
      tags: {
        type: Array as () => string[],
        default: []
      }
    },

    setup(props) {
      const tagList = computed(() => props.tags.map((tag) => `Tag${tag}`))
      return { tagList }
    }
  })
</script>
