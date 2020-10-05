<template>
  <div class="flex items-center">
    <textarea-chat v-model="message" />
    <button-send :disabled="!postable" @click="onPost" />
  </div>
</template>

<script lang="ts">
  import ButtonSend from '@/components/atoms/buttons/ButtonSend.vue'
  import TextareaChat from '@/components/chat/atoms/TextareaChat.vue'
  import { defineComponent, ref, computed } from '@nuxtjs/composition-api'

  export default defineComponent({
    components: {
      ButtonSend,
      TextareaChat
    },

    setup(_, { emit }) {
      const message = ref('')

      const postable = computed(() => !!message.value)

      const onPost = (): void => {
        if (!message.value) return
        emit('post', message.value)
      }

      const clearMessage = () => (message.value = '')

      return { message, postable, onPost, clearMessage }
    }
  })
</script>
