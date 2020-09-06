<template>
  <div>
    <transition name="fade-down">
      <div v-if="isShow" class="absolute px-3 inset-0 bg-white md:hidden">
        <div class="relative w-full h-full flex justify-center items-center">
          <input-search
            ref="inputSearch"
            v-model="searchQuery"
            :force-close="true"
            class="w-full"
            @close="isShow = false"
          />

          <search-result
            v-show="searchQuery"
            class="absolute w-full top-11/12 right-auto left-0"
            :keyword="searchQuery"
            @click="
              () => {
                searchQuery = ''
                isShow = false
              }
            "
          />
        </div>
      </div>
      <button-circle v-else class="md:hidden" @click="onClick">
        <mdi-magnify />
      </button-circle>
    </transition>
    <div class="relative hidden md:inline-flex">
      <input-search
        v-model="searchQuery"
        class="items-center justify-center"
        @blur="isShow = false"
        @focus="isShow = true"
      />
      <search-result
        v-show="isShow && searchQuery"
        class="absolute top-full w-full right-0"
        :keyword="searchQuery"
        @click="searchQuery = ''"
      />
    </div>

    <!-- <transition name="fade-down">
      <ul
        v-if="isShow && articles.length"
        class="bg-white shadow-md absolute w-64 mt-1 divide-y rounded-md p-3 hover:shadow-lg transition duration-300"
      >
        <h2 class="font-bold">Articles</h2>
        <nuxt-link
          v-for="article in articles"
          ref="link"
          :key="article.slug"
          tabindex="0"
          class="hover:text-green-500 hover:bg-gray-300 transition duration-300 cursor-pointer text-right p-1 rounded font-normal"
          tag="li"
          :to="{ name: 'slug', params: { slug: article.slug } }"
          @click.native.prevent="searchQuery = ''"
          v-html="highlight(article.title, searchQuery)"
        >
        </nuxt-link>
      </ul>
    </transition> -->
  </div>
</template>

<script lang="ts">
  import type InputSearch from '@/components/molecules/InputSearch.vue'
  import { defineComponent, ref } from '@nuxtjs/composition-api'
  export default defineComponent({
    setup(_, { root }) {
      const searchQuery = ref('')
      const isShow = ref(false)
      const inputSearch = ref<InstanceType<typeof InputSearch>>()

      const onClick = async (): Promise<void> => {
        isShow.value = true
        await root.$nextTick()
        if (!inputSearch.value) return
        inputSearch.value.focus()
      }

      return { isShow, searchQuery, onClick, inputSearch }
    }
  })
</script>
