<template>
  <base-avatar :src="src" alt="app-avatar" />
</template>

<script lang="ts">
  import BaseAvatar from '@/components/atoms/BaseAvatar.vue'
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    components: {
      BaseAvatar
    },

    setup() {
      return {
        src:
          'https://res.cloudinary.com/dz3vsv9pg/image/upload/c_scale,dn_150,f_auto,o_100,q_auto,r_0,w_96/a_0/v1599984348/00c7e6ec-8968-4113-943a-1a102c445643_200x200_cmchmw.png'
      }
    }
  })
</script>
