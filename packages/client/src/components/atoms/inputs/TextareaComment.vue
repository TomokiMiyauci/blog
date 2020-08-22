<template>
  <textarea
    class="w-full p-3 rounded-md bg-gray-200 focus:text-white resize-none focus:bg-gray-800 outline-none transition duration-300 shadow hover:shadow-xl"
    required
    rows="1"
    placeholder="Comment"
    autocomplete="off"
    spellcheck="false"
    aria-label="hello"
    :value="value"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'nuxt-composition-api'
  export default defineComponent({
    props: {
      value: {
        type: [String, Number],
        default: ''
      }
    }
  })
</script>
