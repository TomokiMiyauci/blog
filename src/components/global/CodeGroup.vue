<template>
  <div class="code-group">
    <div class="rounded-t-md border-b-2 px-2 bg-gray-800 text-sm text-white relative">
      <button
        v-for="({ label }, index) in tabs"
        :key="label"
        class="px-4 py-3 text-gray-400 font-bold font-mono hover:bg-green-800 transition border-transparent duration-300 border-b-2 focus:border-green-600 focus:bg-gray-700"
        :class="[{ 'bg-gray-700': activeTab === index }]"
        @click="switchTab(index)"
      >
        {{ label }}
      </button>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'nuxt-composition-api'
  export default defineComponent({
    setup(_, { slots }) {
      const tabs = ref<{ label: any; elm: HTMLElement }[]>([])
      const activeTab = ref(0)

      const switchTab = (index: number): void => {
        activeTab.value = index
        tabs.value.map(({ elm }) => {
          elm.classList.remove('active')
        })
        tabs.value[index].elm.classList.add('active')
      }

      onMounted(() => {
        tabs.value = slots
          .default()
          .filter((slot) => Boolean(slot.componentOptions))
          .map(({ componentOptions, elm }) => {
            const option = componentOptions?.propsData as { label: string }
            return { label: option.label, elm: elm as HTMLElement }
          })
      })
      return { tabs, activeTab, switchTab }
    }
  })
</script>

<style scoped lang="scss">
  button {
    @apply outline-none;
  }

  /* stylelint-disable selector-pseudo-element-no-unknown */
  .code-group ::v-deep {
    & pre[class*='language-'] {
      @apply rounded-t-none mt-0;
    }
  }
  /* stylelint-enable selector-pseudo-element-no-unknown */
</style>
