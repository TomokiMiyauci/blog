export default {
  title: 'app/AppFooter',

  argTypes: {
    date: {
      control: 'number'
    },

    name: {
      control: 'text'
    }
  }
}

export const DEFAULT = () => ({
  template: '<app-footer v-bind="$props" />',

  props: {
    date: {
      default: 2020
    },

    name: {
      default: 'IntelliSense'
    }
  }
})
