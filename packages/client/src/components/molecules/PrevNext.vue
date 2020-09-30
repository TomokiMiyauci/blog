<template>
  <div class="flex flex-col">
    <h2 class="mb-4"><mdi-bookmark />{{ $t('related_articles') }}</h2>
    <base-nuxt-link
      v-if="prev"
      tag="div"
      :to="localePath({ name: 'slug', params: { slug: prev.slug } })"
      class="inline-flex hover:bg-gray-100 hover:-translate-x-4 duration-75 transform transition-transform p-2 shadow rounded"
    >
      <div class="flex items-center">
        <mdi-chevron-left />
      </div>
      <img width="64" alt="hoge" style="max-height: 64px" :src="prev.img" />
      <div class="ml-2">
        <div>{{ prev.title }}</div>
      </div>
    </base-nuxt-link>
    <base-nuxt-link v-else :to="localePath('/')" class="inline-flex items-center">
      <mdi-home class="h-5 mr-2" />{{ $t('back_to_home') }}
    </base-nuxt-link>

    <div class="p-2 shadow rounded">
      <base-nuxt-link
        v-if="next"
        :to="localePath({ name: 'slug', params: { slug: next.slug } })"
        class="hover:text-red-500 flex justify-end"
      >
        <h2>{{ next.title }}</h2>
        <img width="64" alt="hoge" style="max-height: 64px" :src="prev.img" />
        <div class="flex items-center">
          <mdi-chevron-right class="h-5 ml-2" />
        </div>
      </base-nuxt-link>
      <base-nuxt-link v-else :to="localePath('/')" class="inline-flex items-center">
        <mdi-home class="h-5 mr-2" />
        {{ $t('back_to_home') }}
      </base-nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
  import BaseNuxtLink from '@/components/atoms/BaseNuxtLink.vue'
  import MdiChevronLeft from '@/components/atoms/icons/MdiChevronLeft.vue'
  import MdiChevronRight from '@/components/atoms/icons/MdiChevronRight.vue'
  import MdiHome from '@/components/atoms/icons/MdiHome.vue'
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
    },

    components: {
      BaseNuxtLink,
      MdiChevronLeft,
      MdiChevronRight,
      MdiHome
    }
  })
</script>

<i18n lang="yml">
en:
  related_articles: Related articles
  back_to_home: Back to home
ja:
  related_articles: 関連記事
  back_to_home: 一覧へ戻る
</i18n>
