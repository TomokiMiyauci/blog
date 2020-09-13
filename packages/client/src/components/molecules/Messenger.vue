<template>
  <div
    class="relative shadow rounded-md hover:shadow-xl bg-white dark:bg-gray-900 transition-shadow duration-300"
    style="width: 400px; height: 600px"
  >
    <div style="height: 10%" class="border-b flex items-center justify-between py-2 px-2">
      <div><button-chevron-left /></div>
      <button-close @click="$emit('close')" />
    </div>
    <div style="height: 80%" class="flex justify-start overflow-x-scroll p-4">
      <transition-group tag="div" name="fade-right">
        <message-set v-for="(message, index) in messages" :key="index" class="m-2 my-8" v-bind="message" />
      </transition-group>
    </div>

    <div style="height: 10%" class="flex border-t items-center">
      <textarea-chat v-model="message" />
      <button-send :disabled="!postable" @click="onPost" />
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from '@nuxtjs/composition-api'

  type Message = {
    name: string
    text: string
  }
  export default defineComponent({
    setup() {
      const message = ref('')

      const onPost = (): void => {
        messages.value = [{ text: message.value, name: 'Techsrc' }, ...messages.value]
        message.value = ''
      }

      const messages = ref<Message[]>([])

      const postable = computed(() => !!message.value)

      return { message, postable, messages, onPost }
    }
  })
</script>
