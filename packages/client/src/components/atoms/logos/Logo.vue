<template>
  <div class="font-mono inline-flex items-end">
    <logo-icon class="rounded" />
    <logo-text />
  </div>
</template>

<script lang="ts">
  import LogoIcon from '@/components/atoms/logos/LogoIcon.vue'
  import LogoText from '@/components/atoms/logos/LogoText.vue'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    components: {
      LogoIcon,
      LogoText
    }
  })
</script>
