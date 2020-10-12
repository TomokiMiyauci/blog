---
title: Googleアナリティクスを使うには？
description: Google アナリティクスを使うには？
category: configuration
position: 9
tags: []
private: true
---

はじめに、Nuxt.js用の [公式 Google アナリティクスモジュール](https://github.com/nuxt-community/analytics-module) があるのでそちらを確認してください。

その他に [Google Analytics](https://www.google.com/analytics/) をNuxt.jsアプリケーションで使用するには、`plugins/ga.js`というファイルを作成することをお勧めします。

```js[hhe]
/* eslint-disable */

export default ({ app }) => {
  /*
   ** クライアントサイドかつプロダクションモードでのみ実行
   */
  if (process.env.NODE_ENV !== 'production')
    return /*
     ** Google アナリティクスのスクリプトをインクルード
     */
  ;(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r
    ;(i[r] =
      i[r] ||
      function () {
        ;(i[r].q = i[r].q || []).push(arguments)
      }),
      (i[r].l = 1 * new Date())
    ;(a = s.createElement(o)), (m = s.getElementsByTagName(o)[0])
    a.async = 1
    a.src = g
    m.parentNode.insertBefore(a, m)
  })(
    window,
    document,
    'script',
    'https://www.google-analytics.com/analytics.js',
    'ga'
  )
  /*
   ** 現在のページをセット
   */
  ga('create', 'UA-XXXXXXXX-X', 'auto')
  /*
   ** ルートが変更されるたびに毎回実行（初期化も実行される）
   */
  app.router.afterEach((to, from) => {
    /*
     ** Google アナリティクスにページビューが追加されたことを伝える
     */
    ga('set', 'page', to.fullPath)
    ga('send', 'pageview')
  })
}
```

> `UA-XXXXXXXX-X`を Google アナリティクスのトラッキング ID に置き換えてください。

それからplugins/ga.jsをメインアプリケーション内でインポートすることをNuxt.jsに伝えます。

```js[nuxt.config.js]
export default {
  plugins: [{ src: '~plugins/ga.js', mode: 'client' }]
}
```

これでGoogleアナリティクスはNuxt.jsアプリケーションに統合され、すべてのページビューをトラッキングするようになりました。

<div class="Alert Alert--nuxt-green">

<b>情報:</b> 他のトラッキングサービスでも、同様の方法を使うことができます。

</div>
