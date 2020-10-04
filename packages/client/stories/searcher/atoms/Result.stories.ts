import Result from '@/components/searcher/atoms/Result.vue'

export default {
  title: 'searcher/atoms/Result',
  components: Result,

  argTypes: {
    title: {
      control: 'text'
    },

    slug: {
      control: 'text'
    },

    keyword: {
      control: 'text'
    }
  }
}

export const DEFAULT = () => ({
  template: '<result v-bind="$props" />',

  props: {
    title: {
      default: ''
    },

    slug: {
      default: ''
    },

    keyword: {
      default: ''
    }
  }
})
