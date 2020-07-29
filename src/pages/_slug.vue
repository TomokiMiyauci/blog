<template>
  <div>
    <nuxt-link
      class="inline-flex items-center dark:hover:text-nuxt-lightgreen light:hover:text-nuxt-lightgreen dark:text-dark-onSurfaceSecondary light:text-light-onSurfaceSecondary nuxt-link-active"
      to="/"
      >← Back to Home</nuxt-link
    >
    <article class="mt-12">
      <div class="mb-8">
        <BaseH1 :text="article.title" />
        <p class="mt-1 dark:text-dark-onSurfaceSecondary light:text-light-onSurfaceSecondary">
          {{ formatDate(article.updatedAt) }}
        </p>
      </div>
      <ul>
        <li v-for="link of article.toc" :key="link.id">
          <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
        </li>
      </ul>
      <div class="mt-12">
        <nuxt-content :document="article" />
      </div>
    </article>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'nuxt-composition-api'
  const formatDate = (date: Date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(date).toLocaleDateString('en', options)
  }
  export default defineComponent({
    async asyncData({ $content, params }) {
      const article = await $content('articles', params.slug).fetch()
      return { article }
    },

    setup() {
      return { formatDate }
    }
  })
</script>

<style lang="scss">
  .nuxt-content {
    h2 {
      position: relative;
      display: table;
      margin-top: 2rem;
      margin-bottom: 2rem;
      font-size: 1.5rem;

      &::after {
        display: block;
        width: 80%;
        margin-top: 0.5rem;
        margin-bottom: 0.25rem;
        content: '';
        border-color: #108775;
        border-width: 2px;
        border-radius: 0.25rem;
      }
    }
  }

  .icon.icon-link {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48cGF0aCBjbGFzcz0iaGVyb2ljb24tdWkiIGQ9Ik0xMS4wMyA4aDMuOTRsMS4wNi00LjI0YTEgMSAwIDEgMSAxLjk0LjQ4TDE3LjAzIDhIMjBhMSAxIDAgMCAxIDAgMmgtMy40N2wtMSA0SDE4YTEgMSAwIDEgMSAwIDJoLTIuOTdsLTEuMDYgNC4yNWExIDEgMCAxIDEtMS45NC0uNDlsLjk0LTMuNzZIOS4wM2wtMS4wNiA0LjI1YTEgMSAwIDEgMS0xLjk0LS40OUw2Ljk3IDE2SDRhMSAxIDAgMCAxIDAtMmgzLjQ3bDEtNEg2YTEgMSAwIDAgMSAwLTJoMi45N2wxLjA2LTQuMjRhMSAxIDAgMSAxIDEuOTQuNDhMMTEuMDMgOHptLS41IDJsLTEgNGgzLjk0bDEtNGgtMy45NHoiLz48L3N2Zz4K);
    background-size: 20px 20px;
  }

  .nuxt-content p {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    margin-bottom: 0.5rem;
    line-height: 1.625;
    transition-timing-function: linear;
    transition-duration: 0.3s;
    transition-property: background-color, border-color, color, fill, stroke;
  }
</style>
