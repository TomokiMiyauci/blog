<template>
  <div class="flex">
    <message-other class="w-full" />

    <div class="fixed w-full bottom-0 left-0 bg-white">
      <div class="max-w-screen-md mx-auto h-56px">
        <sender ref="sender" @post="onPost" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { otherRef } from '@/utils/firestore-reference'
  import { defineComponent, useContext } from '@nuxtjs/composition-api'

  export default defineComponent({
    layout: 'chat',

    transition: 'fade',

    setup() {
      const ctx = useContext()

      const onPost = async (message: string): Promise<void> => {
        const ref = otherRef(ctx)
        if (!ref) return

        // div.value!.scrollTop = div.value!.scrollHeight

        await ref.add({
          name: 'name',
          text: message,
          isUser: true,
          createdAt: ctx.$fireStoreObj.FieldValue.serverTimestamp()
        })
      }

      return { onPost }
    }
  })
</script>
