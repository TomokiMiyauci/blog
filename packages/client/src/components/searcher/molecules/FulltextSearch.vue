<template>
  <div>
    <transition name="fade-down">
      <div v-if="isShow" class="absolute px-3 inset-0 bg-white dark:bg-gray-800 md:hidden">
        <div class="flex justify-center items-center h-full w-full">
          <base-menu ref="menu2" class="w-full">
            <template #activator>
              <input-search
                ref="inputSearch"
                v-model="searchQuery"
                :force-close="true"
                @blur="hide"
                @focus="show"
                @close="isShow = false"
              />
            </template>

            <template #menu>
              <search-result
                v-show="searchQuery"
                :keyword="searchQuery"
                @click="
                  () => {
                    searchQuery = ''
                    isShow = false
                  }
                "
              />
            </template>
          </base-menu>
        </div>
      </div>
      <button-circle v-else class="md:hidden" @click="onClick">
        <mdi-magnify />
      </button-circle>
    </transition>
    <div class="relative hidden md:inline-flex">
      <base-menu ref="menu" :open-on-hover="false">
        <template #activator>
          <input-search v-model="searchQuery" class="items-center justify-center" @blur="hide" @focus="show" />
        </template>

        <template #menu>
          <search-result class="p-2" :keyword="searchQuery" @click="searchQuery = ''" />
        </template>
      </base-menu>
    </div>
  </div>
</template>

<script lang="ts">
  import BaseMenu from '@/components/atoms/BaseMenu.vue'
  import ButtonCircle from '@/components/atoms/buttons/ButtonCircle.vue'
  import MdiMagnify from '@/components/atoms/icons/MdiMagnify.vue'
  import InputSearch from '@/components/searcher/molecules/InputSearch.vue'
  import SearchResult from '@/components/searcher/molecules/SearchResult.vue'
  import { defineComponent, ref, watch } from '@nuxtjs/composition-api'

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
      const menu = ref<InstanceType<typeof BaseMenu>>()
      const menu2 = ref<InstanceType<typeof BaseMenu>>()

      const show = (): void => {
        if (searchQuery.value) {
          if (menu.value) {
            menu.value.show()
          }

          if (menu2.value) {
            menu2.value.show()
          }
        }
      }

      const hide = (): void => {
        if (menu.value) {
          menu.value.hide()
        }
      }

      watch(searchQuery, (now) => {
        if (now) {
          show()
        } else {
          hide()
        }
      })

      const onClick = async (): Promise<void> => {
        isShow.value = true
        await root.$nextTick()
        if (!inputSearch.value) return
        inputSearch.value.focus()
      }

      return { isShow, searchQuery, onClick, inputSearch, menu, show, hide, menu2 }
    }
  })
</script>
