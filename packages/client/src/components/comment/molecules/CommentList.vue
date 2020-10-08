<template>
  <div>
    <transition name="fade-right" mode="out-in">
      <div v-if="!comments.length" class="min-h-full text-center text-xl">
        <mdi-comment-processing /><span class="ml-2">{{ $t('not_yet') }}</span>
      </div>
      <transition-group v-else tag="div" name="fade-right">
        <comment-unit v-for="comment in comments" :key="comment.id" v-bind="comment" v-on="$listeners" />
      </transition-group>
    </transition>
  </div>
</template>

<script lang="ts">
  import MdiCommentProcessing from '@/components/atoms/icons/MdiCommentProcessing.vue'
  import CommentUnit from '@/components/comment/molecules/CommentUnit.vue'
  import { Comment } from '@/types/firestore'
  import { userDoc } from '@/utils/firestore-reference'
  import { formatDate, timestamp2Date } from '@/utils/formatter'
  import { defineComponent, useContext } from '@nuxtjs/composition-api'

  const useUser = () => {
    const ctx = useContext()
    const isEqual = (reference: ReturnType<typeof userDoc>) => {
      return userDoc(ctx).isEqual(reference)
    }

    return { isEqual }
  }

  export default defineComponent({
    props: {
      comments: {
        type: Array as () => Comment[],
        default: () => []
      }
    },

    components: {
      MdiCommentProcessing,
      CommentUnit
    },

    setup() {
      return { formatDate, timestamp2Date, ...useUser() }
    }
  })
</script>

<i18n lang="yml">
en:
  not_yet: No Comment
ja:
  not_yet: コメントはまだありません
</i18n>
