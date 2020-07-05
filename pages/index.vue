<template>
  <div class="container flex flex-start">
    <nuxt-content :document="page" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ $content }) {
    const page = await $content('h').fetch()

    return { page }
  },
})
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 10px auto;
  text-align: start;
  background-color: white;
  min-height: 90vh;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 1px 1px 1px;
}

body {
  background: linear-gradient(45deg, #009688, #1a237e);
  background-size: 600% 600%;
  animation: AnimationName 9s ease infinite;
}

@keyframes AnimationName {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  border-bottom: 3px solid #009688;
  box-shadow: 0 3px 0 grey;
  font-weight: bold;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 3px;
}

p {
  line-height: 30px;
  margin-bottom: 20px;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
