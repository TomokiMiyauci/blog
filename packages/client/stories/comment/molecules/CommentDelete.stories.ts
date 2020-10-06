import CommentDelete from '@/components/comment/molecules/CommentDelete.vue'

export default {
  title: 'comment/molecules/CommentDelete',
  components: CommentDelete
}

export const DEFAULT = () => ({
  template: '<comment-delete class="mt-32" :id="id" />',

  props: {
    id: {
      default: 'test'
    }
  }
})
