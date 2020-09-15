<template>
  <div class="flex flex-col px-8">
    <div class="text-center mt-6">
      <h2 class="font-extrabold text-5xl mb-6">Login</h2>
      <div>{{ $t('DESCRIPTION') }}</div>
    </div>

    <div class="flex flex-1 flex-col py-10 justify-between">
      <div class="flex justify-center items-center">
        <button-google />
      </div>

      <p class="text-center text-2xl">or</p>

      <div class="inline-flex items-center rounded-full shadow hover:shadow-md transition-shadow duration-300">
        <mdi-email class="ml-3" />
        <input class="p-2 pl-3 outline-none w-full" :placeholder="$t('PLACEHOLDER')" />
        <base-button class="mr-2">
          <mdi-send />
        </base-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({})
</script>

<i18n lang="yml">
en:
  DESCRIPTION: You can contact the creator of this blog
  PLACEHOLDER: Enter email

ja:
  DESCRIPTION: このブログの製作者に問い合わせが行えます
  PLACEHOLDER: メールアドレスを入力
</i18n>
