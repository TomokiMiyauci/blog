<template>
  <div
    class="relative p-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-md shadow hover:shadow-md transition duration-300 ease-in-out"
  >
    <div
      class="absolute left-0 top-0 w-4 h-4 origin-center transform rotate-45 translate-x-5 -translate-y-2 bg-white dark:bg-gray-700 border-t border-l border-gray-200 dark:border-gray-700 rounded-sm pointer-events-none transition duration-300 ease-in-out"
    ></div>
    <div class="relative">
      <slot />
    </div>
  </div>
</template>
