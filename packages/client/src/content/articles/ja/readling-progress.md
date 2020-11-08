---
title: VueでReading Progressを表示する
description: コンテンツの長さがひと目で分かるReading ProgressをVueで実装する
tags: 
  - Vue
  - Tutorial
img: https://res.cloudinary.com/dz3vsv9pg/image/upload/c_scale,f_auto,q_100,w_825/v1602915710/readling-progress/note_%E3%83%8E%E3%83%BC%E3%83%88_%E8%A8%98%E4%BA%8B%E8%A6%8B%E5%87%BA%E3%81%97%E7%94%BB%E5%83%8F_%E3%82%A2%E3%82%A4%E3%82%AD%E3%83%A3%E3%83%83%E3%83%81_2_fkfwdc.png
private: false
thumbnail: https://res.cloudinary.com/dz3vsv9pg/image/upload/c_scale,f_auto,q_100,w_825/v1602915710/readling-progress/note_%E3%83%8E%E3%83%BC%E3%83%88_%E8%A8%98%E4%BA%8B%E8%A6%8B%E5%87%BA%E3%81%97%E7%94%BB%E5%83%8F_%E3%82%A2%E3%82%A4%E3%82%AD%E3%83%A3%E3%83%83%E3%83%81_2_fkfwdc.png
cover: https://res.cloudinary.com/dz3vsv9pg/image/upload/c_scale,f_auto,q_100,w_825/v1602915710/readling-progress/note_%E3%83%8E%E3%83%BC%E3%83%88_%E8%A8%98%E4%BA%8B%E8%A6%8B%E5%87%BA%E3%81%97%E7%94%BB%E5%83%8F_%E3%82%A2%E3%82%A4%E3%82%AD%E3%83%A3%E3%83%83%E3%83%81_2_fkfwdc.png
alt: cover
---

## はじめに

Reading Progressはページの上部にあるプログレスバーのことで、スクロールに合わせてバーの長さが変化し、ページの残りの長さを表示するものです。このブログの上部にあるのがそれです。

こういったコンポーネントは、たいていライブラリが既にありますが、スタイリングが自由自在であったり、パフォーマンス的に有利であったりするので、自分で作ってみましょう。

## コンポーネント設計

まず、コンポーネントの設計について見てみましょう。コンポーネントは見た目を管理するプレゼンテーションコンポーネントと、状態を管理するコンテナコンポーネントに責務を分離します。
ステートはコンテナコンポーネントにさせることとします。

- プレゼンテーション: BaseProgress
- コンテナ: ReadingProgress

![component grapth](https://res.cloudinary.com/dz3vsv9pg/image/upload/f_auto,q_100/v1602931054/readling-progress/component_ajqajf.png 'component graph')

## プログレスバーを実装する

プレゼンテーションコンポーネントとしてプログレスバーを実装します。propsには、maxとvalueを受け取ります。

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

スタイルのポイントとしては、プログレスバーのスタイルはブラウザの差異が大きいため、Webkitなどの設定が必要なことです。今回はおしゃれにグラデーションカラーを設定します。

<playground>
  <progress-playground />
</playground>

## コンテナコンポーネントを実装する

見た目ができたので、コンテナコンポーネントでステートを管理し、それを渡しましょう。ステートは`max`と`value`を管理します。`max`は次のように算出します。

```js
const max = document.body.clientHeight - window.innerHeight
```

また、`value`は `document.scrollingElement.scrollTop`から取得できます。

これらをスクロールイベントの発火の度に取得し、リアクティブにレンダリングすればいいわけです。

イベントを`document`や`window`オブジェクトに設定しましょう。コンポーネント内で`document`や`window`オブジェクトにアクセスするためには、Vueでは`BeforeMount`以降のライフサイクルでなくてはなりません。

Vue3では正式にComposition APIが採用されました。今回は、ステートとロジック、ライフサイクルとComposition APIを使うのにはうってつけなため、これを期に使ってみましょう。

<alert>Vue3の場合は import { onBeforeMount } from 'vue3' のように使います</alert>

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

1.ステートを準備します。ステートが複数で関連があるなどまとめて管理する場合は、`reactive`関数が便利です。

2.マウントする前に、初期位置をセットしています。また、今回はイベントリスナーへイベントを登録したので、コンポーネントのアンマウント前に登録したイベントを削除します。

3.リアクティブオブジェクトをリターンします。

このステートとロジックとライフサイクルを集約し、ビューから分離させることこそ、Composition APIの利点と言えます。こうすることで、単独でのテスト容易性とポータビリティを高めることができます。

最後に先程作った関数を、コンポーネントで利用します。

```vue[ReadingProgress.vue]
<template>
  <base-progress v-model="value" :max="max" class="fixed top-0 left-0 z-30" />
</template>

<script lang="ts">
  import BaseProgress from '@/components/reading-progress/atoms/BaseProgress.vue'
  import { defineComponent, onBeforeMount, reactive, toRefs, onBeforeUnmount } from '@nuxtjs/composition-api'

  const useReadingProgress ... //You can also separate file.

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

`setup`で値をリターンしているので、`max`と`value`がテンプレートから参照できます。これは、先程の関数で`toRefs`によってリアクティブなオブジェクトを返しているためできます。

あとは、`Props`に値を受け渡してあげると、スクロールや画面のリサイズの度にプログレスバーの進捗が調整される、Reading Progress機能の完成になります。
