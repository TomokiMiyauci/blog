<template>
  <base-textarea :value="value" area-label="chat" :placeholder="$t('PLACEHOLDER')" v-on="$listeners" />
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    props: {
      value: {
        type: String,
        default: ''
      }
    }
  })
</script>

<i18n lang="yml">
en:
  PLACEHOLDER: Enter Message

ja:
  PLACEHOLDER: メッセージを入力
</i18n>
