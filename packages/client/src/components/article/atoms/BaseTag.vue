<template>
  <component
    :is="component"
    v-bind="attrs"
    class="inline-block rounded-full shadow pl-4 pr-2 mr-2 hover:bg-gray-100 hover:shadow-md dark:bg-gray-700 dark-hover:bg-gray-600 transition duration-200"
    :class="[{ 'pr-4': !number, 'cursor-auto': !linkable }, isSmall ? 'py-1' : 'py-2']"
  >
    <span :class="{ 'text-sm': isSmall }">{{ name }}</span>
    <span
      v-show="number"
      class="inline-flex justify-center items-center ml-2 rounded-full shadow w-6 h-6 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark-hover:bg-gray-700 transition duration-200"
      :class="{ 'w-4 h-4': isSmall }"
      >{{ number }}</span
    >
  </component>
</template>

<script lang="ts">
  import { defineComponent, computed, Ref, toRefs, useContext } from '@nuxtjs/composition-api'

  const useComponent = (props: { linkable: Ref<boolean>; value: Ref<string> }) => {
    const { app } = useContext()
    const { linkable, value } = props

    const component = computed(() => {
      return linkable.value ? 'nuxt-link' : 'span'
    })

    const attrs = computed(() => {
      return { to: app.localePath({ name: 'tags-tag', params: { tag: value.value } }) }
    })

    return { component, attrs }
  }

  export default defineComponent({
    props: {
      name: {
        type: String,
        default: ''
      },

      value: {
        type: String,
        default: ''
      },

      number: Number,

      isSmall: {
        type: Boolean,
        default: false
      },

      linkable: {
        type: Boolean,
        default: false
      }
    },

    setup(props) {
      return useComponent(toRefs(props))
    }
  })
</script>
