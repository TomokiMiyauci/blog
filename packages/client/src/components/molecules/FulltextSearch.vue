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
  </div>
</template>

<script lang="ts">
  import ButtonCircle from '@/components/atoms/buttons/ButtonCircle.vue'
  import MdiMagnify from '@/components/atoms/icons/MdiMagnify.vue'
  import InputSearch from '@/components/molecules/InputSearch.vue'
  import SearchResult from '@/components/molecules/SearchResult.vue'
  import { defineComponent, ref } from '@nuxtjs/composition-api'

  export default defineComponent({
    components: {
      InputSearch,
      MdiMagnify,
      SearchResult,
      ButtonCircle
    },

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
