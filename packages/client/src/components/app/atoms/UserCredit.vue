<template>
  <span
    >{{ $t('made_by') }} <mdi-heart class="mx-1 text-red-400 dark:text-purple-400" /><a
      class="text-green-500"
      target="_brank"
      :href="href || USER_URL"
      >{{ $t('username') }}</a
    ></span
  >
</template>

<script lang="ts">
  import MdiHeart from '@/components/atoms/icons/MdiHeart.vue'
  import { USER_URL } from '@/utils/constants'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    props: {
      href: {
        type: String,
        default: ''
      }
    },

    components: {
      MdiHeart
    },

    setup() {
      return { USER_URL }
    }
  })
</script>

<i18n lang="yml">
en:
  made_by: Made by
  username: TomokiMiyauci
ja:
  made_by: Made by
  username: TomokiMiyauci
</i18n>
