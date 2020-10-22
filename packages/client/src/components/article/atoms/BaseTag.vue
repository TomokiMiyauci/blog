<template>
  <component
    :is="component"
    v-bind="attrs"
    class="inline-block rounded-full shadow pl-4 py-2 pr-2 hover:bg-gray-100 hover:shadow-md dark:bg-gray-700 dark-hover:bg-gray-600 transition duration-200"
  >
    <span>{{ name }}</span>
    <span
      class="inline-flex justify-center items-center ml-2 rounded-full shadow w-6 h-6 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark-hover:bg-gray-700 transition duration-200"
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

      number: {
        type: Number,
        default: 0
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
