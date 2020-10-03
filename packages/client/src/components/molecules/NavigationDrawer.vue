<template>
  <div class="absolute px-3 flex items-center inset-0 bg-white dark:bg-gray-800 md:hidden">
    <lang-switcher />
    <button-color-mode />
  </div>
</template>

<script lang="ts">
  import ButtonColorMode from '@/components/atoms/buttons/ButtonColorMode.vue'
  import LangSwitcher from '@/components/molecules/LangSwitcher.vue'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    components: {
      ButtonColorMode,
      LangSwitcher
    }
  })
</script>
