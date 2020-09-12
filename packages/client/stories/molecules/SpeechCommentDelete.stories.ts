export default {
  title: 'SpeechCommentDelete',

  argType: { onClick: { action: 'clicked' } },

  argTypes: {
    onClick: { action: 'clicked' },
    isProgress: {
      control: 'boolean',
      default: false
    }
  }
}

export const DEFAULT = () => ({
  template: '<speech-comment-delete :isProgress="isProgress"  />',

  props: {
    isProgress: {
      default: false
    }
  }
})
