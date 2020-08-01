<template>
  <div>
    <div
      class="flex justify-center items-center py-2 px-3 relative border leading-5 bg-gray-300 hover:bg-green-300 transition duration-500 rounded-full"
    >
      <base-svg>
        <path :d="mdiMagnify" />
      </base-svg>

      <input
        ref="input"
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
      <transition name="fade" mode="out-in">
        <button v-if="searchQuery" class="focus:outline-none" @click="searchQuery = ''">
          <base-svg class="hover:text-green-500 transition duration-500">
            <path :d="mdiClose" />
          </base-svg>
        </button>
        <base-svg v-else-if="!isShow" class="bg-gray-500 rounded">
          <path :d="mdiSlashForward" />
        </base-svg>
        <base-svg v-else> </base-svg>
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
  import { mdiMagnify, mdiClose, mdiSlashForward } from '@mdi/js'
  import { defineComponent, watch, ref, onBeforeMount, onBeforeUnmount } from 'nuxt-composition-api'
  export default defineComponent({
    setup(_, { root }) {
      const searchQuery = ref('')
      const isShow = ref(false)
      const articles = ref<{ slug: string; title: string }[]>([])
      const input = ref<HTMLInputElement>()

      onBeforeMount(() => {
        document.addEventListener('keydown', (e) => {
          if (e.key === '/') {
            input.value!.focus()
          }
        })
      })

      onBeforeUnmount(() => {
        document.removeEventListener('keydown', (e) => {
          if (e.key === '/') {
            input.value!.focus()
          }
        })
      })
      watch(searchQuery, async (now) => {
        if (!now) {
          articles.value = []
          return
        }

        articles.value = await root.$content('articles').limit(3).search(now).fetch()
      })

      return { searchQuery, isShow, articles, mdiMagnify, mdiClose, input, mdiSlashForward }
    }
  })
</script>
