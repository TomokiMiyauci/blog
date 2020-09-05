<template>
  <base-icon-text :text="formatDate(date, $i18n.locale)">
    <mdi-calendar-edit />
  </base-icon-text>
</template>

<script lang="ts">
  import { formatDate } from '@/utils/formatter'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    props: {
      date: {
        type: Date,
        required: true
      }
    },

    setup() {
      return { formatDate }
    }
  })
</script>
