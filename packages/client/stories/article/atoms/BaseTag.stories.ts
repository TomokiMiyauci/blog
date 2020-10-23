import BaseTag from '@/components/article/atoms/BaseTag.vue'

export default {
  title: 'article/atoms/BaseTag',

  component: BaseTag
}

export const DEFAULT = () => ({
  template: '<base-tag v-bind="$props" />',

  props: {
    name: {
      default: 'Tag'
    },

    value: {
      default: 'tag'
    },

    linkable: {
      default: false
    },

    number: {
      default: 1
    }
  }
})
