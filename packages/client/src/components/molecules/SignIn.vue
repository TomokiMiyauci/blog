<template>
  <div class="flex flex-col px-8">
    <div class="text-center mt-6">
      <h2 class="font-extrabold text-5xl mb-6">Login</h2>
      <div>{{ $t('description') }}</div>
    </div>

    <div class="flex flex-1 flex-col py-10 justify-between">
      <div class="flex justify-center items-center">
        <button-google @signin="onSignin" />
      </div>

      <!-- <p class="text-center text-2xl">or</p>

      <div class="inline-flex items-center rounded-full shadow hover:shadow-md transition-shadow duration-300">
        <mdi-email class="ml-3" />
        <input v-model="email" class="p-2 pl-3 outline-none w-full" :placeholder="$t('PLACEHOLDER')" />
        <base-button class="mr-2" @click="onSend">
          <mdi-send />
        </base-button>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
  import ButtonGoogle from '@/components/atoms/buttons/ButtonGoogle.vue'
  import { user } from '@/store'
  import { defineComponent, ref } from '@nuxtjs/composition-api'

  export default defineComponent({
    components: {
      ButtonGoogle
    },

    setup(_, { emit }) {
      const email = ref('')
      const onSignin = (e: firebase.User) => {
        user.setId(e.uid)
        user.setIsAnonymous(e.isAnonymous)
        emit('signin')
      }

      // const onSend = async () => {
      //   const result = await root.$fireAuth.signInWithEmailLink(email.value, 'https://tech-xas.web.app')
      //   console.log(result)
      // }

      return { onSignin, email }
    }
  })
</script>

<i18n lang="yml">
en:
  description: You can contact the creator of this blog

ja:
  description: このブログの製作者に問い合わせが行えます
</i18n>
