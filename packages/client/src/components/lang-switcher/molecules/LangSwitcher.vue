<template>
  <base-menu>
    <template #icon>
      <mdi-translate />
    </template>

    <template #menu>
      <h2 class="p-2 uppercase">{{ $t('title') }}</h2>
      <ul class="px-1">
        <japanese class="mb-1" tag="li" />
        <english tag="li" />
      </ul>
    </template>
  </base-menu>
</template>

<script lang="ts">
  import BaseMenu from '@/components/atoms/BaseMenu.vue'
  import MdiTranslate from '@/components/atoms/icons/MdiTranslate.vue'
  import English from '@/components/lang-switcher/atoms/English.vue'
  import Japanese from '@/components/lang-switcher/atoms/Japanese.vue'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    components: {
      MdiTranslate,
      BaseMenu,
      Japanese,
      English
    }
  })
</script>

<i18n lang="yml">
en:
  title: translations

ja:
  title: 翻訳
</i18n>
