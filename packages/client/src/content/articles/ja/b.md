---
title: Googleアナリティクスを使うには？
description: Google アナリティクスを使うには？
category: configuration
position: 9
private: true
tags: []
---

はじめに、Nuxt.js用の [公式 Google アナリティクスモジュール](https://github.com/nuxt-community/analytics-module) があるのでそちらを確認してください。

```js[hhe]
/* eslint-disable */

export default ({ app }) => {
  app.router.afterEach((to, from) => {
    /*
     ** Google アナリティクスにページビューが追加されたことを伝えるfsjfofjsoifjsofjasojsofijsofisjfosjfosijfosfijosifjsofijsofjsofjsofjsaofjsoajsosijfosjfsofjsofijsofsjofsjfosjfoasifjsojfofijosijfosjfisijfosjfsoijfsijosijfosfijsofijsojfo
     */
    ga('set', 'page', to.fullPath)
    ga('send', 'pageview')
  })
}
```
