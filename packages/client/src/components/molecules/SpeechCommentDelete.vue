<template>
  <speech v-on="$listeners">
    <template #title>
      <h2>{{ $t('HEADER') }}</h2>
    </template>

    <template #body>
      <div>
        <p class="mt-1">
          <mdi-alert /><span class="ml-2">{{ $t('ALERT') }}</span>
        </p>
        <div class="flex flex-col items-center mt-1" style="min-height: 48px">
          <button-delete-comment :id="id" v-on="$listeners" />
        </div>
      </div>
    </template>
  </speech>
</template>

<script lang="ts">
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
        requried: true
      }
    },

    setup(props) {
      const { state, on, off } = useSwitch()

      return { state, on, off }
    }
  })
</script>

<i18n lang="yml">
en:
  HEADER: Comments
  ALERT: Are you really?

ja:
  HEADER: コメントを削除
  ALERT: 削除しますか？
</i18n>
