<template>
  <div>
    <h2 class="mb-2"><mdi-tag-multiple class="mr-1 text-teal-500" />Tags</h2>

    <base-tag v-for="tag in aggregateTags" :key="tag.name" class="m-1" v-bind="tag" linkable />
  </div>
</template>

<script lang="ts">
  import BaseTag from '@/components/article/atoms/BaseTag.vue'
  import { toKebabCase, toPascalCase } from '@/utils/formatter'
  import { defineComponent, Ref, computed, toRefs } from '@nuxtjs/composition-api'

  const useTag = (tags: Ref<string[]>) => {
    const aggregateTags = computed(() => {
      const res = tags.value.reduce(
        (prev, curr) => {
          const snakeCase = toKebabCase(curr)
          prev[snakeCase] = prev[snakeCase] ? ++prev[snakeCase] : 1
          return prev
        },
        {} as {
          [key in string]: number
        }
      )
      return Object.entries(res).map(([key, value]) => {
        return { name: toPascalCase(key), value: key, number: value }
      })
    })

    return { aggregateTags }
  }

  export default defineComponent({
    props: {
      tags: {
        type: Array as () => string[],
        default: () => []
      }
    },

    components: {
      BaseTag
    },

    setup(props) {
      const { tags } = toRefs(props)

      return useTag(tags)
    }
  })
</script>
