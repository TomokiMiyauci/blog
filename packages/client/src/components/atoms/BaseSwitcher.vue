<template>
  <label
    for="checkbox"
    class="flex items-center p-1 rounded-full bg-gray-300 hover:bg-gray-400 w-16 cursor-pointer shadow-xs hover:shadow transition duration-300"
    :class="{ 'bg-green-500 hover:bg-green-600': value }"
  >
    <input
      id="checkbox"
      :checked="value"
      :value="value"
      role="switch"
      type="checkbox"
      class="hidden"
      v-on="$listeners"
    />

    <span
      class="flex justify-center items-center rounded-full bg-gray-100 w-8 h-8 transition duration-300 shadow hover:shadow-lg"
    >
      <slot v-if="value" name="on" />
      <slot v-else name="off" />
    </span>
  </label>
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    props: {
      value: {
        type: Boolean,
        default: false
      }
    }
  })
</script>

<style scoped lang="scss">
  input[type='checkbox']:checked {
    + span {
      @apply bg-green-800;

      transform: translateX(23px);
    }
  }
</style>
