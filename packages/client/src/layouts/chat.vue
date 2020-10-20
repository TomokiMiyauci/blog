<template>
  <div class="min-h-screen flex flex-auto relative flex-col max-w-full" style="min-height: calc(var(--vh, 1vh) * 100)">
    <header class="p-2 fixed items-center flex top-0 h-56px left-0 w-full bg-white">
      <ButtonChevronLeft @click="onClick" />
      Other
    </header>

    <main class="h-full flex flex-grow max-w-full py-56px">
      <nuxt class="flex-grow max-w-screen-md mx-auto" />
    </main>
  </div>
</template>

<script lang="ts">
  import { user } from '@/store'
  import { defineComponent, onBeforeMount } from '@nuxtjs/composition-api'
  export default defineComponent({
    head() {
      return this.$nuxtI18nSeo()
    },

    transition: {
      name: 'fade',
      type: 'transition'
    },

    setup(_, { root }) {
      onBeforeMount(() => {
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
      })

      const onClick = (): void => {
        if (!user.id) return
        root.$router.replace(
          root.localePath({
            name: 'chat-uid',
            params: {
              uid: user.id
            }
          })
        )
      }

      return { user, onClick }
    }
  })
</script>
