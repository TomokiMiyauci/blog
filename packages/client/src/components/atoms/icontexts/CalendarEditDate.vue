<template>
  <lazy-base-icon-text :text="formatDate(date, $i18n.locale)">
    <lazy-mdi-calendar-edit />
  </lazy-base-icon-text>
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
