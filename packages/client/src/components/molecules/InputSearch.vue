<template>
  <div
    class="flex justify-center items-center py-2 px-3 relative shadow leading-5 bg-gray-300 hover:bg-gray-400 hover:shadow-md transition duration-300 rounded-full focus-within:bg-gray-800 focus-within:shadow-md focus-within:text-white dark:text-gray-800"
  >
    <lazy-mdi-magnify class="transition duration-300 delay-100" />
    <input
      ref="input"
      :value="value"
      type="text"
      aria-label="search"
      class="px-1 bg-transparent focus:text-white outline-none w-full"
      :placeholder="$t('SEARCH.PLACEHOLDER')"
      autocomplete="off"
      spellcheck="false"
      role="combobox"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
      @input="$emit('input', $event.target.value)"
    />
    <transition name="fade" mode="out-in">
      <button v-if="forceClose || value" class="focus:outline-none" @click="onClick" @keypress="onClick">
        <lazy-mdi-close class="hover:text-green-500 transition duration-500" />
      </button>

      <lazy-mdi-slash-forward v-else-if="!isShow" class="hidden md:block bg-gray-500 rounded" />
      <lazy-base-svg v-else> </lazy-base-svg>
    </transition>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onBeforeMount, onBeforeUnmount } from '@nuxtjs/composition-api'
  export default defineComponent({
    props: {
      value: {
        type: String,
        default: ''
      },

      isShow: {
        type: Boolean,
        default: false
      },

      forceClose: {
        type: Boolean,
        default: false
      }
    },

    setup(_, { emit }) {
      const input = ref<HTMLInputElement>()
      const focus = () => {
        input.value!.focus()
      }
      const handleFocus = (key: string) => {
        if (key === '/') {
          focus()
        }
      }
      onBeforeMount(() => {
        document.addEventListener('keyup', ({ key }) => handleFocus(key))
      })

      onBeforeUnmount(() => {
        document.removeEventListener('keyup', ({ key }) => handleFocus(key))
      })

      const onClick = () => {
        emit('close')
        emit('input')
        focus()
      }
      return { input, onClick, focus }
    }
  })
</script>
