<template>
  <promised :promise="articlesPromise">
    <template #pending>
      <div class="flex justify-center">
        <spin-loader />
      </div>
    </template>
    <template #rejected="error">
      <div class="flex">
        <mdi-alert /><span class="ml-1">{{ error }}</span>
      </div>
    </template>
    <template #default="articles">
      <div v-if="articles.length">
        <articles :articles="articles" />
      </div>

      <h2 v-else class="flex">
        <mdi-information /><span class="ml-1">{{ $t('no_hit') }} {{ keyword }}</span>
      </h2>
    </template>
  </promised>
</template>

<script lang="ts">
  import BaseSpeech from '@/components/atoms/BaseSpeech.vue'
  import MdiAlert from '@/components/atoms/icons/MdiAlert.vue'
  import MdiInformation from '@/components/atoms/icons/MdiInformation.vue'
  import SpinLoader from '@/components/atoms/loaders/SpinLoader.vue'
  import Articles from '@/components/searcher/molecules/Articles.vue'
  import { defineComponent, watch, ref } from '@nuxtjs/composition-api'
  import { Promised } from 'vue-promised'

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
      keyword: {
        type: String,
        default: ''
      }
    },

    components: {
      Promised,
      MdiAlert,
      MdiInformation,
      SpinLoader,
      BaseSpeech,
      Articles
    },

    setup(props, { root }) {
      const asyncSearch = (query: string) => {
        return root
          .$content('articles', root.$i18n.locale)
          .limit(3)
          .search(query)
          .only(['title', 'slug'])
          .fetch<{ slug: string; title: string }[]>()
      }

      const articlesPromise = ref<any>(null)

      watch(
        () => props.keyword,
        (now) => {
          if (!now) {
            return
          }

          articlesPromise.value = asyncSearch(now)
        }
      )

      return { highlight, articlesPromise }
    }
  })
</script>

<i18n lang="yml">
en:
  no_hit: No hit
ja:
  no_hit: 見つかりませんでした
</i18n>
