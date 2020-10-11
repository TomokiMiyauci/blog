<template>
  <base-menu top right>
    <template #activator="{ switchState }">
      <button-delete @click.stop="switchState" />
    </template>

    <template #menu="{ hide }">
      <speech-comment-delete :id="id" @click="hide" @success="onSuccess" />
    </template>
  </base-menu>
</template>

<script lang="ts">
  import BaseMenu from '@/components/atoms/BaseMenu.vue'
  import ButtonDelete from '@/components/atoms/buttons/ButtonDelete.vue'
  import SpeechCommentDelete from '@/components/comment/molecules/SpeechCommentDelete.vue'
  import { notice } from '@/store'
  import { wait } from '@/utils/timer'
  import { defineComponent, getCurrentInstance } from '@nuxtjs/composition-api'

  export default defineComponent({
    props: {
      id: {
        type: String,
        required: true
      }
    },

    components: {
      SpeechCommentDelete,
      ButtonDelete,
      BaseMenu
    },

    setup(_, { emit }) {
      const vm = getCurrentInstance()
      const onSuccess = async () => {
        notice.setNotice({ message: vm!.$t('success').toString(), timeout: 3000 })
        await wait(1500)
        emit('delete')
      }

      return { onSuccess }
    }
  })
</script>

<i18n lang="yml">
en:
  success: Comment has Deleted
ja:
  success: コメントを削除しました
</i18n>
