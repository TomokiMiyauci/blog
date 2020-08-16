<template>
  <svg
    class="stroke-current transition"
    :class="{ 'text-green-500': active }"
    width="24px"
    height="24px"
    viewBox="0 0 100 100"
  >
    <line
      x1="10"
      class="duration-500"
      y1="20"
      x2="90"
      y2="20"
      stroke-width="10"
      stroke-linecap="round"
      :class="{ border1: active }"
    />
    <line
      class="duration-300"
      :class="{ 'opacity-0': active }"
      x1="10"
      y1="50"
      x2="90"
      y2="50"
      stroke-width="10"
      stroke-linecap="round"
    />
    <line
      class="duration-500"
      x1="10"
      :class="{ border2: active }"
      y1="80"
      x2="90"
      y2="80"
      stroke-width="10"
      stroke-linecap="round"
    />
  </svg>
</template>

<script lang="ts">
  import { defineComponent } from 'nuxt-composition-api'
  export default defineComponent({
    props: {
      active: {
        type: Boolean,
        default: false
      }
    }
  })
</script>

<style scoped>
  .border1 {
    transform: translate(30px, 0) rotate(45deg);
  }

  .border2 {
    transform: translate(-40px, 30px) rotate(-45deg);
  }
</style>
