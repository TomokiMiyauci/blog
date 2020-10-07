<template>
  <base-card>
    <template #title>
      <div class="flex items-center">
        <span>{{ $t('title') }}</span>

        <base-tooltip top>
          <template #activator>
            <button-square class="ml-4" v-on="$listeners">
              <mdi-close-circle />
            </button-square>
          </template>

          <span>{{ $t('close') }}</span>
        </base-tooltip>
      </div>
    </template>

    <template #body>
      <div class="mt-1">
        <mdi-alert /><span class="ml-2">{{ $t('alert') }}</span>
      </div>
      <div class="flex flex-col items-center mt-1" style="min-height: 48px">
        <button-delete-comment :id="id" v-on="$listeners" />
      </div>
    </template>
  </base-card>
</template>

<script lang="ts">
  import BaseCard from '@/components/atoms/BaseCard.vue'
  import BaseTooltip from '@/components/atoms/BaseTooltip.vue'
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
      ButtonDeleteComment,
      BaseCard,
      BaseTooltip
    }
  })
</script>

<i18n lang="yml">
en:
  title: Comment Delete
  alert: Are you really?
  close: Close

ja:
  title: コメントの削除
  alert: 削除しますか？
  close: 閉じる
</i18n>
