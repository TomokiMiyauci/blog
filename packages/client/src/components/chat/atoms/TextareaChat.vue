<template>
  <base-textarea :value="value" area-label="chat" :placeholder="$t('placeholder').toString()" v-on="$listeners" />
</template>

<script lang="ts">
  import BaseTextarea from '@/components/atoms/BaseTextarea.vue'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    props: {
      value: {
        type: String,
        default: ''
      }
    },

    components: {
      BaseTextarea
    }
  })
</script>

<i18n lang="yml">
en:
  placeholder: Enter Message

ja:
  placeholder: メッセージを入力
</i18n>
