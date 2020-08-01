<template>
  <div>
    <div
      class="flex justify-center items-center py-2 px-3 relative border leading-5 bg-gray-300 focus:bg-white rounded-full"
    >
      <base-svg>
        <path :d="mdiMagnify" />
      </base-svg>

      <input
        v-model="searchQuery"
        type="text"
        class="px-1 bg-transparent outline-none"
        placeholder="Search"
        autocomplete="off"
        spellcheck="false"
        role="combobox"
        @blur="isShow = false"
        @focus="isShow = true"
      />
      <transition name="fade">
        <button v-show="searchQuery" class="focus:outline-none" @click="searchQuery = ''">
          <base-svg class="hover:text-green-500 transition duration-500">
            <path :d="mdiClose" />
          </base-svg>
        </button>
      </transition>
    </div>

    <transition name="fade-down">
      <ul v-if="isShow && articles.length" class="bg-white absolute border mt-1 divide-y rounded-md p-3">
        <h2 class="font-bold">Articles</h2>
        <li v-for="article in articles" :key="article.slug" class="hover:text-green-700 text-right p-1 font-nomal">
          <nuxt-link :to="`/${article.slug}`" @click.native.prevent="searchQuery = ''">
            {{ article.title }}
          </nuxt-link>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script lang="ts">
  import { mdiMagnify, mdiClose } from '@mdi/js'
  import { defineComponent, watch, ref } from 'nuxt-composition-api'
  export default defineComponent({
    setup(_, { root }) {
      const searchQuery = ref('')
      const isShow = ref(false)
      const articles = ref<{ slug: string; title: string }[]>([])
      watch(searchQuery, async (now) => {
        if (!now) {
          articles.value = []
          return
        }

        articles.value = await root.$content('articles').limit(3).search(now).fetch()
      })

      return { searchQuery, isShow, articles, mdiMagnify, mdiClose }
    }
  })
</script>
