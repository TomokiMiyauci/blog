<template>
  <div class="flex w-full flex-col items-center">
    <base-progress v-model="value" class="m-6" :max="max" />
    <span>{{ $t('max') }} {{ max }}</span>
    <span>{{ $t('value') }} {{ value }}</span>

    <span class="mt-2">
      <button-minus @click="onMinus" />
      <button-plus class="ml-4" @click.stop="onPlus" />
    </span>
  </div>
</template>

<script lang="ts">
  import ButtonMinus from '@/components/atoms/buttons/ButtonMinus.vue'
  import ButtonPlus from '@/components/atoms/buttons/ButtonPlus.vue'
  import BaseProgress from '@/components/reading-progress/atoms/BaseProgress.vue'
  import { defineComponent, reactive, toRefs } from '@nuxtjs/composition-api'
  export default defineComponent({
    components: {
      BaseProgress,
      ButtonPlus,
      ButtonMinus
    },

    setup() {
      const state = reactive({
        max: 10,
        value: 5
      })

      const onPlus = () => {
        state.value = state.value + 1
      }

      const onMinus = () => {
        state.value = state.value - 1
      }

      return { ...toRefs(state), onPlus, onMinus }
    }
  })
</script>

<i18n lang="yml">
en:
  value: 'Value:'
  max: 'Max:'
ja:
  value: 'Value:'
  max: 'Max:'
</i18n>
