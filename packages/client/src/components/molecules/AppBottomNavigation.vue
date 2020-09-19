<template>
  <div class="flex bottom-0 left-0 fixed bg-white border-t w-full justify-center shadow-md h-56px">
    <base-button class="py-3 px-5" @click="$router.push('/')"><mdi-post /></base-button>
    <base-button class="py-3 px-5" @click="$router.push('/chat')"> <mdi-chat-processing /></base-button>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api'
  export default defineComponent({})
</script>
