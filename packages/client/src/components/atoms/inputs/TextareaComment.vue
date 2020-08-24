<template>
  <textarea
    class="w-full p-3 text-lg rounded-md bg-gray-200 focus:text-white resize-none focus:bg-gray-800 dark-focus:bg-gray-400 dark:text-teal-900 outline-none transition duration-300 shadow hover:shadow-xl dark-hover:shadow-lg"
    required
    :rows="rows"
    :placeholder="$t('INPUT.TEXTAREA.PLACEHOLDER')"
    autocomplete="off"
    spellcheck="false"
    aria-label="hello"
    :value="value"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script lang="ts">
  import { defineComponent, computed } from 'nuxt-composition-api'
  export default defineComponent({
    props: {
      value: {
        type: String,
        default: ''
      }
    },

    setup(props) {
      const rows = computed(() => {
        return props.value.split('\n').length
      })
      return { rows }
    }
  })
</script>
