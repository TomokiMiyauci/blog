<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">{{ $t('not_found') }}</h1>
    <h1 v-else>{{ $t('error_occured') }}</h1>
    <nuxt-link to="/">{{ $t('home') }}</nuxt-link>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api'
  export default defineComponent({
    props: ['error']
  })
</script>

<i18n lang="yml">
en:
  not_found: Page Not Found
  error_occured: An error has occurred
  home: Home
ja:
  not_found: ページが見つかりません
  error_occured: エラーが発生しました
  home: ホーム
</i18n>
