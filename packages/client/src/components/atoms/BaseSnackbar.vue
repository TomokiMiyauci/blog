<template>
  <div
    class="bg-white dark:bg-gray-700 border pl-5 items-center shadow hover:shadow-xl transition-shadow duration-700 rounded-full flex justify-between p-1"
  >
    <span class="flex">
      <component :is="iconComponent" :class="iconClass" />
      <span class="whitespace-pre-line ml-2">{{ message }}</span>
    </span>
    <button-close class="ml-10" v-on="$listeners" />
  </div>
</template>

<script lang="ts">
  import MdiCheckCircle from '@/components/atoms/icons/MdiCheckCircle.vue'
  import { defineComponent, toRefs, computed } from '@nuxtjs/composition-api'
  export default defineComponent({
    props: {
      message: {
        type: String,
        default: ''
      },

      icon: {
        type: String,
        default: 'check'
      }
    },

    components: {
      MdiCheckCircle
    },

    setup(props) {
      const { icon } = toRefs(props)
      const iconComponent = computed(() => {
        switch (icon.value) {
          case 'check': {
            return 'mdi-check-circle'
          }
        }
      })

      const iconClass = computed(() => {
        switch (icon.value) {
          case 'check': {
            return 'text-teal-500'
          }
        }
      })

      return { iconComponent, iconClass }
    }
  })
</script>
