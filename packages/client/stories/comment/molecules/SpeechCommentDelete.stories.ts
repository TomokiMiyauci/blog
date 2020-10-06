import SpeechCommentDelete from '@/components/comment/molecules/SpeechCommentDelete.vue'

export default {
  title: 'comment/molecules/SpeechCommentDelete',
  components: SpeechCommentDelete,

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
