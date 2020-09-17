export default {
  title: 'atoms/TextareaChat',

  argTypes: {
    value: {
      control: 'text'
    }
  }
}

export const DEFAULT = () => ({
  template: '<textarea-chat :value="value" />',

  props: {
    value: {
      default: ''
    }
  }
})
