<template>
  <div class="flex bottom-0 left-0 fixed bg-white border-t w-full justify-center shadow-md h-56px text-xs">
    <base-button
      v-for="{ title, path, icon } in navigations"
      :key="path"
      class="px-8 flex justify-center items-center flex-col"
      :class="{ 'text-green-500': $route.path === path || (path !== '/' && $route.path.startsWith(path)) }"
      @click="$router.push(path)"
    >
      <component
        :is="icon"
        class="transform transition-all duration-300"
        :class="{ 'scale-125': $route.path === path || (path !== '/' && $route.path.startsWith(path)) }"
      />
      <span>{{ title }}</span></base-button
    >
  </div>
</template>

<script lang="ts">
  import MdiChatProcessing from '@/components/atoms/icons/MdiChatProcessing.vue'
  import MdiPost from '@/components/atoms/icons/MdiPost.vue'
  import { defineComponent } from '@nuxtjs/composition-api'

  type Navigation = {
    path: string
    title: string
    icon: string
  }

  export default defineComponent({
    components: {
      MdiPost,
      MdiChatProcessing
    },

    setup() {
      const navigations: Navigation[] = [
        {
          path: '/',
          title: 'Article',
          icon: 'mdi-post'
        },
        {
          path: '/chat',
          title: 'Chat',
          icon: 'mdi-chat-processing'
        }
      ]

      return { navigations }
    }
  })
</script>
