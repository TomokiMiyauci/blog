<template>
  <div>
    <div
      class="flex justify-center items-center py-2 px-3 relative shadow leading-5 bg-gray-300 hover:bg-gray-400 hover:shadow-md transition duration-300 rounded-full focus-within:bg-gray-800 focus-within:shadow-md focus-within:text-white"
    >
      <mdi-magnify class="transition duration-300 delay-100" :class="{ 'text-green-500': isShow }" />

      <input
        ref="input"
        :value="value"
        type="text"
        class="px-1 bg-transparent focus:text-white outline-none"
        placeholder="Search"
        autocomplete="off"
        spellcheck="false"
        role="combobox"
        @input="$emit('input', $event.target.value)"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
        @keyup="$emit('keydown')"
      />
      <transition name="fade" mode="out-in">
        <button v-if="value" class="focus:outline-none" @click="onClick">
          <mdi-close class="hover:text-green-500 transition duration-500" />
        </button>

        <mdi-slash-forward v-else-if="!isShow" class="bg-gray-500 rounded" />
        <base-svg v-else> </base-svg>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onBeforeMount, onBeforeUnmount } from 'nuxt-composition-api'
  export default defineComponent({
    props: {
      value: {
        type: String,
        default: ''
      },

      isShow: {
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
        emit('input')
        focus()
      }
      return { input, onClick }
    }
  })
</script>
