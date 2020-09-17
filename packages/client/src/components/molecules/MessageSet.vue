<template>
  <div class="flex items-end" :class="isUser ? 'justify-end' : 'justify-start'">
    <avatar-app v-show="!isUser" />
    <div class="ml-2">
      <div
        class="whitespace-pre-line break-all py-2 px-4 hover:shadow rounded-md bg-gray-200 dark:bg-gray-800 transition-shadow duration-300"
        :class="[{ 'rounded-br-none': isUser }, { 'rounded-bl-none': !isUser }]"
        v-text="text"
      />
      <div class="px-1 pt-1 text-xs flex" :class="isUser ? 'flex-row-reverse' : 'flex-row'">
        <span>{{ name }}</span
        ><span>・</span>
        <!-- <span>{{ date.toLocaleString() }}</span> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    props: {
      name: {
        type: String,
        default: ''
      },

      text: {
        type: String,
        default: ''
      },

      date: {
        type: Date,
        default: () => new Date()
      },

      isUser: {
        type: Boolean,
        default: true
      }
    }
  })
</script>
