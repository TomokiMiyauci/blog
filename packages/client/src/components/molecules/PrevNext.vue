<template>
  <div class="flex justify-between flex-col items-center mb-64">
    <div class="self-start p-2 shadow-xs rounded">
      <lazy-base-nuxt-link
        v-if="prev"
        :to="localePath({ name: 'slug', params: { slug: prev.slug } })"
        class="hover:text-red-500 inline-flex items-center"
      >
        <lazy-mdi-chevron-left class="h-5 mr-2" />
        {{ prev.title }}
      </lazy-base-nuxt-link>
      <lazy-base-nuxt-link v-else :to="localePath('/')" class="inline-flex items-center">
        <lazy-mdi-home class="h-5 mr-2" />
        一覧へ戻る
      </lazy-base-nuxt-link>
    </div>

    <div class="self-end p-2 shadow-xs rounded">
      <lazy-base-nuxt-link
        v-if="next"
        :to="localePath({ name: 'slug', params: { slug: next.slug } })"
        class="hover:text-red-500 inline-flex items-center"
      >
        {{ next.title }}
        <lazy-mdi-chevron-right class="h-5 ml-2" />
      </lazy-base-nuxt-link>
      <lazy-base-nuxt-link v-else :to="localePath('/')" class="inline-flex items-center">
        <lazy-mdi-home class="h-5 mr-2" />
        一覧へ戻る
      </lazy-base-nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
  import { PrevNext } from '@/types/article'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    props: {
      prev: {
        type: Object as () => PrevNext,
        defalult: undefined
      },
      next: {
        type: Object as () => PrevNext,
        default: undefined
      }
    }
  })
</script>
