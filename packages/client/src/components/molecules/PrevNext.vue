<template>
  <div class="flex justify-between items-center">
    <base-nuxt-link
      v-if="prev"
      :to="localePath({ name: 'slug', params: { slug: prev.slug } })"
      class="hover:text-red-500 inline-flex items-center"
    >
      <mdi-chevron-left class="h-5 mr-2" />
      {{ prev.title }}
    </base-nuxt-link>
    <base-nuxt-link v-else :to="localePath('/')" class="inline-flex items-center">
      <mdi-home class="h-5 mr-2" />
      一覧へ戻る
    </base-nuxt-link>
    <base-nuxt-link
      v-if="next"
      :to="localePath({ name: 'slug', params: { slug: next.slug } })"
      class="hover:text-red-500 inline-flex items-center"
    >
      {{ next.title }}
      <mdi-chevron-right class="h-5 ml-2" />
    </base-nuxt-link>
    <base-nuxt-link v-else :to="localePath('/')" class="inline-flex items-center">
      <mdi-home class="h-5 mr-2" />
      一覧へ戻る
    </base-nuxt-link>
  </div>
</template>

<script lang="ts">
  import { PrevNext } from '@/types/article'
  import { defineComponent } from 'nuxt-composition-api'

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
