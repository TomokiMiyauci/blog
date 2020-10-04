import Articles from '@/components/searcher/molecules/Articles.vue'

export default {
  title: 'searcher/molecules/Articles',
  components: Articles,

  argTypes: {
    articles: {
      control: 'array',
      default: ['fff']
    }
  }
}

export const DEFAULT = () => ({
  template: '<articles v-bind="$props" />',

  props: {
    articles: {
      default: [
        { title: 'hoge', text: 'huga', slug: 'fsf', keyword: 'fsfsfjo' },
        { title: 'hfoge', text: 'hfuga', slug: 'fff', keyword: 'fsfsfjo' }
      ]
    }
  }
})
