export default {
  title: 'CommentDelete'
}

export const DEFAULT = () => ({
  template: '<comment-delete class="mt-32" :id="id" />',

  props: {
    id: {
      default: 'test'
    }
  }
})
