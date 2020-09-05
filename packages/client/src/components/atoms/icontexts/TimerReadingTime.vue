<template>
  <base-icon-text :text="minuteText" v-bind="$attrs">
    <mdi-timer />
  </base-icon-text>
</template>

<script lang="ts">
  import { defineComponent, computed, getCurrentInstance } from '@nuxtjs/composition-api'

  export default defineComponent({
    props: {
      text: {
        type: String,
        default: ''
      }
    },

    setup(props, { root }) {
      const minuteText = computed(() => {
        const minute = props.text.split(' ')[0]
        const vm = getCurrentInstance()!
        switch (vm.$i18n.locale) {
          case 'ja': {
            return `${minute} ${vm.$t('MINUTE')}`
          }

          default: {
            const suffix = Number(minute) > 1 ? vm.$t('MULTIPLE') : vm.$t('SINGULAR')
            return `${minute} ${suffix}`
          }
        }
      })

      return { minuteText }
    }
  })
</script>

<i18n lang="yml">
en:
  SINGULAR: 'min'
  MULTIPLE: 'mins'

ja:
  MINUTE: '分'
</i18n>
