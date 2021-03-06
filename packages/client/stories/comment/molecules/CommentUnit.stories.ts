import CommentUnit from '@/components/comment/molecules/CommentUnit.vue'
import firebase from 'firebase'

export default {
  title: 'comment/molecules/CommentUnit',
  components: CommentUnit,

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
      default: firebase.firestore.Timestamp.fromDate(new Date())
    },

    text: {
      default: 'test'
    },

    isOwn: {
      default: false
    }
  }
})
