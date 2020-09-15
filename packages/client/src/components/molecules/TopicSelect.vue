<template>
  <div class="flex flex-col px-8">
    <div class="text-center mt-6">
      <h2 class="font-extrabold text-5xl mb-6">Topics</h2>
    </div>

    <div class="flex flex-1 flex-col p-10 justify-center items-center">
      <base-button class="py-2 pl-3 pr-4 rounded-full shadow hover:shadow-md" @click="$emit('select', 'other')">
        <mdi-help-circle />
        <span class="ml-1">{{ $t('OTHER') }}</span></base-button
      >
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({})
</script>

<i18n lang="yml">
en:
  OTHER: Other

ja:
  OTHER: その他
</i18n>
