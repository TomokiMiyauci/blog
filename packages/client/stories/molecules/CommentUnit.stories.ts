import { firestore } from 'firebase'

export default {
  title: 'CommentUnit',

  argTypes: {
    isOwn: {
      control: 'boolean'
    }
  }
}

export const DEFAULT = () => ({
  template: '<comment-unit class="mt-64" v-bind="$props" />',

  props: {
    createdAt: {
      default: firestore.Timestamp.fromDate(new Date())
    },

    text: {
      default: 'test'
    },

    isOwn: {
      default: false
    }
  }
})
