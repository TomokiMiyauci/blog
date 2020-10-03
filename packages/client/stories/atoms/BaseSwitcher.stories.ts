import BaseSwitcher from '@/components/atoms/BaseSwitcher.vue'

export default {
  title: 'base/BaseSwitcher',
  components: BaseSwitcher,
  argTypes: {
    value: {
      control: 'boolean'
    }
  }
}

export const DEFAULT = () => ({
  template: '<base-switcher :value="value" />',

  props: {
    value: {
      default: false
    }
  }
})
