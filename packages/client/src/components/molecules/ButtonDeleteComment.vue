<template>
  <div>
    <promised v-if="asyncDeleteComment" :promise="asyncDeleteComment">
      <template #pending>
        <spin-loader width="48" height="48" />
      </template>

      <template #default>
        <mdi-check-circle width="48" height="48" />
      </template>

      <template #rejected>
        <mdi-alert width="48" height="48" />
      </template>
    </promised>
    <button-delete v-else class="dark-hover:text-white" @click="onClick" />
  </div>
</template>

<script lang="ts">
  import { articleCommentRef } from '@/utils/firestore-reference'
  import { defineComponent, useContext, ref, getCurrentInstance } from '@nuxtjs/composition-api'
  import { Promised } from 'vue-promised'

  const useCommentDelete = () => {
    const ctx = useContext()
    const vm = getCurrentInstance()

    const deleteComment = (): Promise<void> => {
      if (!vm || !articleCommentRef(ctx)) {
        return Promise.reject(Error('Error'))
      }
      return articleCommentRef(ctx)!.doc(vm.$props.id).delete()
    }

    const onClick = () => {
      asyncDeleteComment.value = deleteComment().then(() => {
        if (vm) {
          vm.$emit('success')
        }
      })
    }

    const asyncDeleteComment = ref()

    return { deleteComment, asyncDeleteComment, onClick }
  }

  export default defineComponent({
    components: {
      Promised
    },

    props: {
      id: {
        type: String,
        required: true
      }
    },

    setup() {
      return useCommentDelete()
    }
  })
</script>
