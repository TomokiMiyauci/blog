<template>
  <div
    class="relative shadow rounded-md hover:shadow-xl bg-white dark:bg-gray-900 transition-shadow duration-300 w-72 h-108 md:w-96 md:h-144"
  >
    <div
      style="height: 10%"
      :class="{ 'border-b': enableClose || (!enableClose && step === 'other') }"
      class="cursor-move flex items-center justify-between py-2 px-2"
    >
      <div>
        <transition name="fade">
          <span v-if="isLogin && step === 'other'" class="flex items-center">
            <button-chevron-left @click="$emit('back')" />
            <span>Other</span>
          </span>
        </transition>
      </div>

      <button-close v-show="enableClose" @click="$emit('close')" />
    </div>
    <div ref="div" style="height: 80%" class="relative flex flex-col-reverse overflow-x-scroll">
      <div v-if="isLogin">
        <transition tag="div" name="fade-right">
          <message-other v-if="step === 'other'" class="inset-0 absolute" />
        </transition>

        <!-- <transition-group v-if="step === 'other'" tag="div" name="fade-right">
          <message-set
            v-for="(message, index) in messages"
            :key="index"
            class="my-1 py-2 px-3 hover:bg-gray-100 dark-hover:bg-gray-700 transition-colors duration-300"
            v-bind="message"
            :is-user="false"
          />
        </transition-group> -->

        <transition name="slide-in">
          <topic-select
            v-if="step === 'entrance'"
            class="inset-0 absolute bg-white dark:bg-gray-900"
            v-on="$listeners"
          />
        </transition>
      </div>

      <transition v-else name="slide-in">
        <sign-in class="inset-0 absolute bg-white dark:bg-gray-900" />
      </transition>
    </div>

    <transition name="fade-up">
      <div v-if="isLogin && step === 'other'" style="height: 10%" class="flex border-t items-center">
        <textarea-chat v-model="message" />
        <button-send :disabled="!postable" @click="onPost" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import { otherRef } from '@/utils/firestore-reference'
  import { computed, defineComponent, ref, useContext } from '@nuxtjs/composition-api'

  type Message = {
    name: string
    text: string
  }

  export default defineComponent({
    props: {
      step: {
        type: String,
        default: ''
      },

      isLogin: {
        type: Boolean,
        default: false
      },

      enableClose: {
        type: Boolean,
        default: false
      }
    },

    setup() {
      const message = ref('')
      const ctx = useContext()

      const onPost = async () => {
        messages.value = [...messages.value, { text: message.value, name: 'Techsrc' }]

        const ref = otherRef(ctx)
        if (!ref) return

        div.value!.scrollTop = div.value!.scrollHeight

        await ref.add({
          name: 'name',
          text: message.value,
          isUser: true,
          createdAt: ctx.$fireStoreObj.FieldValue.serverTimestamp()
        })

        message.value = ''
      }

      const messages = ref<Message[]>([])

      const postable = computed(() => !!message.value)
      const div = ref<HTMLDivElement>()

      return { message, postable, messages, onPost, div }
    }
  })
</script>
