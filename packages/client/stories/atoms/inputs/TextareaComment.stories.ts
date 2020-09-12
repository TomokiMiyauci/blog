export default {
  title: 'atoms/TextareaComment',
  argType: {
    onInput: { action: 'clicked' }
  },

  argTypes: {
    value: {
      control: 'text'
    }
  }
}

export const DEFAULT = () => ({
  template: '<textarea-comment :value="value" />',

  props: {
    value: {
      default: ''
    }
  }
})
