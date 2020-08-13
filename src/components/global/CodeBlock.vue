<template>
  <div class="code-block" :class="[active && 'active']">
    <slot />
  </div>
</template>

<script>
  export default {
    props: {
      label: {
        type: String,
        required: true
      },
      active: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped lang="scss">
  .code-block {
    @apply hidden;
    &.active {
      @apply block;
    }
  }
</style>
