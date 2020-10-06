<template>
  <speech :enable-close="true" v-on="$listeners">
    <template #title>
      <h2>{{ $t('title') }}</h2>
    </template>

    <template #body>
      <div>
        <p class="mt-1">
          <mdi-alert /><span class="ml-2">{{ $t('alert') }}</span>
        </p>
        <div class="flex flex-col items-center mt-1" style="min-height: 48px">
          <button-delete-comment :id="id" v-on="$listeners" />
        </div>
      </div>
    </template>
  </speech>
</template>

<script lang="ts">
  import MdiAlert from '@/components/atoms/icons/MdiAlert.vue'
  import ButtonDeleteComment from '@/components/comment/molecules/ButtonDeleteComment.vue'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    props: {
      id: {
        type: String,
        required: true
      }
    },

    components: {
      MdiAlert,
      ButtonDeleteComment
    }
  })
</script>

<i18n lang="yml">
en:
  title: Comment Delete
  alert: Are you really?

ja:
  title: コメントを削除
  alert: 削除しますか？
</i18n>
