<template>
  <promised tag="div" :promise="promise">
    <template #pending>
      <div class="flex justify-center items-center">
        <div class="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-gray-900 dark:border-white" />
      </div>
    </template>

    <template #default="messages">
      <div class="flex flex-col justify-end">
        <message-set
          v-for="(message, index) in messages"
          :key="index"
          class="my-1 py-2 px-3 hover:bg-gray-100 dark-hover:bg-gray-700 transition-colors duration-300"
          v-bind="message"
          :is-user="false"
        />
      </div>
    </template>

    <template #rejected="e">
      <div class="flex flex-col justify-center items-center">
        <mdi-alert width="80" height="80" />
        {{ e.message }}
      </div>
    </template>
  </promised>
</template>

<script lang="ts">
  import MdiAlert from '@/components/atoms/icons/MdiAlert.vue'
  import MessageSet from '@/components/molecules/MessageSet.vue'
  import { otherRef } from '@/utils/firestore-reference'
  // import { wait } from '@/utils/timer'
  import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
  import { Promised } from 'vue-promised'
  export default defineComponent({
    components: {
      Promised,
      MdiAlert,
      MessageSet
    },

    setup() {
      const ctx = useContext()

      const get = () => {
        const ref = otherRef(ctx)
        // await wait(3000)
        if (!ref) {
          throw new Error('Fatal error')
        }

        // throw new Error('e')

        return ref
          .get()
          .then((e) => {
            return e.docs.map((doc) => doc.data())
          })
          .catch((e) => {
            throw e
          })
      }

      const promise = ref<Promise<any>>(get())

      return { promise }
    }
  })
</script>
