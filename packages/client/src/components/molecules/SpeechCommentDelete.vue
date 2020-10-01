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
  import ButtonDeleteComment from '@/components/molecules/ButtonDeleteComment.vue'
  import Speech from '@/components/molecules/Speech.vue'
  import { defineComponent, ref } from '@nuxtjs/composition-api'

  const useSwitch = () => {
    const state = ref<boolean>(false)

    const on = (): void => {
      state.value = true
    }

    const off = (): void => {
      state.value = false
    }

    return { state, on, off }
  }

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
      Speech
    },

    setup() {
      const { state, on, off } = useSwitch()

      return { state, on, off }
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
