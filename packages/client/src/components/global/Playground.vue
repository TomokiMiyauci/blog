<template>
  <div class="bg-gray-800 dark:bg-gray-900 rounded overflow-hidden text-white">
    <span class="p-2 bg-red-500 rounded-br">{{ $t('title') }}</span>
    <div class="flex p-10 px-10 justify-center">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api'
  export default defineComponent({})
</script>

<i18n lang="yml">
en:
  title: Playground

ja:
  title: 遊び場
</i18n>
