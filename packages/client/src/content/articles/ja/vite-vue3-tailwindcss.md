---
title: ViteとVue3にtailwindcssを導入する
description: ViteプロジェクトでCSSフレームワークのtailwindcssを導入する方法を紹介します。ついでに、tailwindcss用のStylelintのルールやVSCodeの設定をします。
tags: 
  - Vue3
  - tailwindcss
  - Vite
img: https://res.cloudinary.com/dz3vsv9pg/image/upload/c_scale,f_auto,q_auto,w_800/v1603983138/vite-vue3-tailwindcss/thumbnail.png
private: false
thumbnail: https://res.cloudinary.com/dz3vsv9pg/image/upload/c_scale,f_auto,q_auto,w_800/v1603983138/vite-vue3-tailwindcss/thumbnail.png
cover: https://res.cloudinary.com/dz3vsv9pg/image/upload/c_scale,f_auto,q_auto,w_800/v1603983138/vite-vue3-tailwindcss/thumbnail.png
alt: cover
---

## はじめに

ViteはNo bundle掲げており、開発時に高速なHMRを提供してくれます。
しかし、CLIを用いたデフォルトテンプレート自体はかなりシンプルになっているため、Viteプロジェクトを始める際、他のモジュールを使うには自分で環境を構築しなければなりません。

今回はViteを使って、CSSフレームワークであるtailwindcssの環境構築をします。

なお、[こちら](https://github.com/TomokiMiyauci/vite-vue3-template)の環境をベースに説明するので、適宜参考にしてください。
以下ではViteプロジェクトがある前提で説明します。

## 環境構築

まずは、tailwindcssモジュールをインストールし、設定ファイルを生成します。
ついでに、`scss`や`sass`も使いたいので、それ用のモジュールもインストールします。

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn add -D tailwindcss sass
  yarn tailwindcss init
  ```

  </code-block>

  <code-block label="NPM">

  ```bash
  npm i -d tailwindcss sass
  npx tailwind init
  ```

  </code-block>
</code-group>

続いて、tailwindのディレクティブを注入するために、スタイルファイルを用意します。

```css[~/assets/styles/tailwind.scss]
@tailwind base;
@tailwind components;
@tailwind utilities;
```

PostCSSの設定ファイルも必要なので、プロジェクトルートに用意します。

```js[~/postcss.config.js]
module.exports = {
  plugins: [require('tailwindcss'), require('autoprefixer')],
}
```

最後にスタイルファイルをエントリーポイントでインポートします。

<alert>例ではパスエイリアスでパスを指定しています。各自適切なパスを設定してください。</alert>

```ts[~/src/main.ts]
import { createApp } from 'vue'
import App from '/@/App.vue'
import '/@/assets/styles/main.scss'
import '/@/assets/styles/tailwind.scss'

createApp(App).mount('#app')
```

これで開発時にUtility Classを使えるようになりました。

## DXを向上させる

VSCodeではtailwindのインテリセンスを効かせることができます。
[こちらから](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)インストールしてください。

また、VSCodeではデフォルトで`css`のバリデーションを行っているので、`unknownAtRules`が出ています。
それを、解消するには以下のように`settings.json`に設定します。

```json[~/.vscode/settings.json]
{
  "scss.validate": false,
  "css.validate": false
}
```

Stylelintを使っている場合は、`@tailwind`や、`@apply`などtailwind特有の構文がStylelintのルールに引っかかることがあります。

これを解消しましょう。

```json[.stylelintrc]
{
  "rules": {
    "at-rule-no-unknown": [
      true,
      {
        "ignoreAtRules": [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
        ],
      },
    ],
  }
}
```

## PurgeCSSでビルドを最適化する

tailwindはそのままビルドしてしまうと、使っていない膨大なUtility Classも一緒にバンドルされてしまいます。

tailwindcssはPurgeCSSを標準でサポートしているため、設定してビルドを最適化しましょう。

```js[~/tailwind.config.js]
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { join } = require('path')
const BASE_DIR = join(__dirname, 'src')
const VUE_FILE = join('**', '*.vue')

const config = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [join(BASE_DIR, VUE_FILE), join(__dirname, '*.html')],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins:[],
}

module.exports = config
```

ちなみにES Module形式ではなく、CommonJS形式で記述している理由は、tailwindcssのプラグインがES Module形式を認識できないからです。`.js`形式なのも同様の理由です。

さてこれにてtailwindcssの環境が構築できました。
