---
title: Displaying Reading Progress with Vue
description: Implementing reading progress bar with Vue, which shows the length of the content at a glance
tags: 
  - Vue
  - Tutorial
img: https://res.cloudinary.com/dz3vsv9pg/image/upload/c_scale,f_auto,q_100,w_825/v1602915710/readling-progress/note_%E3%83%8E%E3%83%BC%E3%83%88_%E8%A8%98%E4%BA%8B%E8%A6%8B%E5%87%BA%E3%81%97%E7%94%BB%E5%83%8F_%E3%82%A2%E3%82%A4%E3%82%AD%E3%83%A3%E3%83%83%E3%83%81_2_fkfwdc.png
private: false
thumbnail: https://res.cloudinary.com/dz3vsv9pg/image/upload/c_scale,f_auto,q_100,w_825/v1602915710/readling-progress/note_%E3%83%8E%E3%83%BC%E3%83%88_%E8%A8%98%E4%BA%8B%E8%A6%8B%E5%87%BA%E3%81%97%E7%94%BB%E5%83%8F_%E3%82%A2%E3%82%A4%E3%82%AD%E3%83%A3%E3%83%83%E3%83%81_2_fkfwdc.png
cover: https://res.cloudinary.com/dz3vsv9pg/image/upload/c_scale,f_auto,q_100,w_825/v1602915710/readling-progress/note_%E3%83%8E%E3%83%BC%E3%83%88_%E8%A8%98%E4%BA%8B%E8%A6%8B%E5%87%BA%E3%81%97%E7%94%BB%E5%83%8F_%E3%82%A2%E3%82%A4%E3%82%AD%E3%83%A3%E3%83%83%E3%83%81_2_fkfwdc.png
alt: cover
---

## Introduction

Reading Progress is the progress bar at the top of the page, where the length of the bar changes as you scroll,
showing you the rest of the length of the page.
That's what you see at the top of this blog.

These components are usually already available libraries, but you can create your own because of the flexibility of styling and the performance advantages.

## Component Design

First, let's look at the design of components.
I will separate the responsibilities of the component into a presentation component, which manages its appearance,
and a container component, which manages its state.
I'll let the container component manage the state.

- Presentation: BaseProgress
- Container: ReadingProgress

![component grapth](https://res.cloudinary.com/dz3vsv9pg/image/upload/f_auto,q_100/v1602931054/readling-progress/component_ajqajf.png 'component graph')

## Implementing the progress bar

Implements a progress bar as a presentation component.

```vue[BaseProgress.vue]
<template>
  <progress class="h-1 appearance-none w-full" :max="max" :value="value" />
</template>

<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    props: {
      max: {
        type: [String, Number],
        default: 0
      },

      value: {
        type: [String, Number],
        default: 0
      }
    }
  })
</script>

<style lang="scss">
  progress[value] {
    &::-webkit-progress-bar {
      background-color: transparent;
    }

    &::-webkit-progress-value {
      @apply bg-gradient-to-r to-green-400 from-teal-700;
    }

    &::-moz-progress-bar {
      @apply bg-gradient-to-r to-green-400 from-teal-700;
    }
  }
</style>
```

The key to style is that the style of the progress bar varies widely between browsers,
so you need to set up Webkit and so on.
In this case, I'm going to set the gradient color in a stylish way.

<playground>
  <progress-playground />
</playground>

## Implementing a container component

Let's manage the states in the container component and pass them. The state manages the `max` and `value`.
The `max` is calculated as follows,

```js
const max = document.body.clientHeight - window.innerHeight
```

You can also get the `value` from `document.scrollingElement.scrollTop`.

You can get them every time the scrolling event fires and render them reactively.

Let's set the events to the `document` and `window` objects.
In order to access the `document` and `window` objects in a component, the lifecycle in Vue has to be after `BeforeMount`.

Vue3 has officially adopted Composition API.
This time around, I'll take this opportunity to use Composition API, as it's a great way to use it.

<alert>For Vue3, I'll use import { onBeforeMount } from 'vue3'</alert>

```ts
  import { onBeforeMount, reactive, toRefs, onBeforeUnmount } from '@nuxtjs/composition-api'

  const useReadingProgress = () => {
    const state = reactive({
      value: 0,
      max: 0
    })　// 1

    const getMax = (): number => {
      return document.body.clientHeight - window.innerHeight
    }

    const getValue = (): number => {
      return document.scrollingElement?.scrollTop ?? 0
    }

    const setStates = (): void => {
      state.value = getValue()
      state.max = getMax()
    }

    onBeforeMount(() => {
      state.max = getMax() // 2
      document.addEventListener('scroll', setStates)
      window.addEventListener('resize', setStates)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('scroll', setStates)
      window.removeEventListener('resize', setStates)
    })

    return toRefs(state) // 3
  }
```

1.Prepare the states. The `reactive` function is useful if you want to manage multiple and related states at once.

2.Set the initial position before mounting the component.
Also, since I have registered the event to the event listener, I delete the registered event before unmounting the component.

3.Return the reactive object.

This aggregation of state, logic and life cycle, and separation from the view, is the advantage of Composition API.
By doing so, I can increase the portability and ease of testing on its own.

Finally, use the function just created in our components.

```vue[ReadingProgress.vue]
<template>
  <base-progress v-model="value" :max="max" class="fixed top-0 left-0 z-30" />
</template>

<script lang="ts">
  import BaseProgress from '@/components/reading-progress/atoms/BaseProgress.vue'
  import { defineComponent, onBeforeMount, reactive, toRefs, onBeforeUnmount } from '@nuxtjs/composition-api'

  const useReadingProgress ... //別ファイルに切り出すこともできます

  export default defineComponent({
    components: {
      BaseProgress
    },

    setup() {
      return useReadingProgress()
    }
  })
</script>

```

Since I return the value with `setup`, the `max` and `value` can be referenced from the template.
This can be done because the function used earlier returns a reactive object by `toRefs`.

Now, if you pass the value to `Props`, you'll complete the Reading Progress function, which adjusts the progress bar every time you scroll or resize the screen.
