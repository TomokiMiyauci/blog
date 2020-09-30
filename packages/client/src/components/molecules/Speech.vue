<template>
  <div
    class="card-anotation text-gray-900 transition duration-300 rounded-lg bg-white pb-4 whitespace-no-wrap shadow hover:shadow-xl"
  >
    <div class="flex justify-between pl-4 items-center">
      <slot name="title" />

      <button-close v-show="enableClose" class="dark-hover:text-white ml-2" v-on="$listeners" />
    </div>
    <hr class="mt-1 mb-2" />
    <div class="flex px-4">
      <slot name="body" />
    </div>
  </div>
</template>

<script lang="ts">
  import ButtonClose from '@/components/atoms/buttons/ButtonClose.vue'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    props: {
      enableClose: {
        type: Boolean,
        default: true
      }
    },

    components: {
      ButtonClose
    }
  })
</script>

<style scoped lang="scss">
  .card-anotation {
    & ::before {
      right: 12px;
      bottom: -16px;
      content: '';
      border-top: 15px solid rgba(0, 0, 0, 0.01);
      border-right: 13px solid transparent;
      border-left: 13px solid transparent;
      @apply absolute;
    }

    & ::after {
      right: 12px;
      bottom: -15px;
      content: '';
      border-top: 15px solid white;
      border-right: 13px solid transparent;
      border-left: 13px solid transparent;
      @apply absolute;
    }
  }
</style>
