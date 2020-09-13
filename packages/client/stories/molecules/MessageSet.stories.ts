export default {
  title: 'MessageSet',

  argTypes: {
    text: {
      control: 'text'
    }
  }
}

export const DEFAULT = () => ({
  template: '<message-set v-bind="$props" />',

  props: {
    text: {
      default: 'test message'
    }
  }
})
