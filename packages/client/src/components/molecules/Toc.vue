<template>
  <div v-if="toc.length" class="w-full py-4 lg:py-8 lg:px-8">
    <div class="lg:sticky lg:top-0 lg:pt-24 lg:-mt-24">
      <h3 class="mb-3 lg:mb-2 text-gray-500 uppercase tracking-wider font-bold text-sm lg:text-xs">目次</h3>
      <nav>
        <scrollactive highlight-first-item active-class="text-green-500" :offset="0" tag="ul">
          <li
            v-for="{ id, depth, text } of toc"
            :key="id"
            class="text-gray-700 dark:text-gray-300"
            :class="{
              'border-t border-dashed dark:border-gray-800 first:border-t-0': depth === 2
            }"
          >
            <a
              :href="`#${id}`"
              class="block text-sm scrollactive-item transition-transform ease-in-out duration-300 transform hover:translate-x-1"
              :class="{
                'py-2': depth === 2,
                'ml-2 pb-2': depth === 3
              }"
              >{{ text }}</a
            >
          </li>
        </scrollactive>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
  import { Toc } from '@/types/article'
  import { defineComponent } from 'nuxt-composition-api'
  export default defineComponent({
    props: {
      toc: {
        type: Array as () => Toc[],
        default: () => []
      }
    }
  })
</script>
