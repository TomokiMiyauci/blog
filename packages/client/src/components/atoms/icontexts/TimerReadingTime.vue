<template>
  <base-icon-text :text="`${min} ${$tc('minute', min)}`" v-bind="$attrs">
    <mdi-timer />
  </base-icon-text>
</template>

<script lang="ts">
  import BaseIconText from '@/components/atoms/BaseIconText.vue'
  import MdiTimer from '@/components/atoms/icons/MdiTimer.vue'
  import { defineComponent, computed } from '@nuxtjs/composition-api'

  export default defineComponent({
    props: {
      text: {
        type: String,
        default: ''
      }
    },

    components: {
      BaseIconText,
      MdiTimer
    },

    setup(props) {
      const min = computed(() => {
        return Number(props.text.split(' ')[0])
      })

      return { min }
    }
  })
</script>

<i18n lang="yml">
en:
  minute: min | mins

ja:
  minute: 分
</i18n>
