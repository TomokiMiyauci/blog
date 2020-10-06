<template>
  <div class="relative">
    <button-delete @click.stop="isOpen ? close() : open()" />
    <transition name="fade-up">
      <speech-comment-delete
        v-if="isOpen"
        :id="id"
        v-click-outside="() => close()"
        class="absolute right-0"
        style="bottom: 65px"
        @click="close()"
        @success="onSuccess"
      />
    </transition>
  </div>
</template>

<script lang="ts">
  import ButtonDelete from '@/components/atoms/buttons/ButtonDelete.vue'
  import SpeechCommentDelete from '@/components/comment/molecules/SpeechCommentDelete.vue'
  import outsideClick from '@/directives/outside-click'
  import { wait } from '@/utils/timer'
  import { defineComponent, ref } from '@nuxtjs/composition-api'

  const useDialog = () => {
    const isOpen = ref<boolean>(false)

    const open = (): void => {
      isOpen.value = true
    }

    const close = (): void => {
      isOpen.value = false
    }

    return { isOpen, open, close }
  }

  export default defineComponent({
    props: {
      id: {
        type: String,
        required: true
      }
    },

    components: {
      SpeechCommentDelete,
      ButtonDelete
    },

    directives: {
      'click-outside': outsideClick
    },

    setup(_, { emit }) {
      const { isOpen, open, close } = useDialog()

      const onClose = () => {
        close()
      }

      const onSuccess = async () => {
        await wait(1500)
        emit('delete')
        close()
      }

      const onDelete = () => {
        emit('delete')
        close()
      }

      return { isOpen, open, close, onDelete, onClose, onSuccess }
    }
  })
</script>
