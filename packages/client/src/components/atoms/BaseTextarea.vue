<template>
  <textarea
    class="w-full p-3 text-lg resize-none outline-none bg-transparent"
    required
    :rows="rows"
    :placeholder="placeholder"
    autocomplete="off"
    spellcheck="false"
    :aria-label="areaLabel"
    :value="value"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script lang="ts">
  import { defineComponent, computed } from '@nuxtjs/composition-api'
  export default defineComponent({
    props: {
      value: {
        type: String,
        default: ''
      },

      areaLabel: {
        type: String,
        required: true
      },

      placeholder: {
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
