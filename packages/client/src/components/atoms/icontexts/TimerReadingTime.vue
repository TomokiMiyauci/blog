<template>
  <lazy-base-icon-text :text="minuteText" v-bind="$attrs">
    <lazy-mdi-timer />
  </lazy-base-icon-text>
</template>

<script lang="ts">
  import { defineComponent, computed } from '@nuxtjs/composition-api'

  // const useTimePrefix = () => {
  //   const ct = useContext()
  //   ct.app.i18n.locale
  // }
  export default defineComponent({
    props: {
      text: {
        type: String,
        default: ''
      }
    },

    setup(props) {
      const minuteText = computed(() => {
        // switch (root.$i18n.locale) {
        //   case 'en': {
        //     return
        //   }
        // }

        return `${props.text}min`
        // if (root.$i18n.locale === 'en') {
        //   return `${props.text}min`
        // } else if (root.$i18n.locale === 'ja') {
        //   return `${props.text}分`
        // }
      })

      return { minuteText }
    }
  })
</script>
