<template>
  <lazy-base-icon-text :text="minuteText" v-bind="$attrs">
    <lazy-mdi-timer />
  </lazy-base-icon-text>
</template>

<script lang="ts">
  import { defineComponent, computed } from '@nuxtjs/composition-api'

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
        switch (root.$i18n.locale) {
          case 'ja': {
            return `${minute} ${root.$t('UNIT.MINUTE')}`
          }

          default: {
            const suffix = Number(minute) > 1 ? root.$t('UNIT.MINUTE.MULTIPLE') : root.$t('UNIT.MINUTE.SINGULAR')
            return `${minute} ${suffix}`
          }
        }
      })

      return { minuteText }
    }
  })
</script>
