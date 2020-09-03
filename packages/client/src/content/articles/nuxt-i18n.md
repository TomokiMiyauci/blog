---
title: Nuxtとnuxt-i18nで国際化をしよう
description: Nuxtでnuxt-i18nを使って国際化を行いインテリセンスによってDXを向上しよう
tags: 
  - Nuxtjs
  - NuxtI18n
  - Tutorial
category: configuration
img: https://res.cloudinary.com/dz3vsv9pg/image/upload/c_scale,f_auto,q_auto,w_800/v1599141075/nuxt-i18n/preview_rs5rzf.png
private: false
thumbnail: https://res.cloudinary.com/dz3vsv9pg/image/upload/c_scale,f_auto,q_auto,w_800/v1599141075/nuxt-i18n/preview_rs5rzf.png
cover: https://res.cloudinary.com/dz3vsv9pg/image/upload/c_scale,f_auto,q_auto,w_800/v1599141075/nuxt-i18n/preview_rs5rzf.png
alt: cover
---

## nuxt-18nとは

vue-i18nをNuxtに簡単に統合できるモジュールです。自動的なrouteの生成やSEO、ブラウザ言語の自動切り替えなど、i18nをするのに便利な機能を提供しています。

[公式のリファレンスはこちら](https://i18n.nuxtjs.org/)

最近 **@nuxt/content**の新しいレイアウトに変わったようです。🎉

## 動作環境

```bash
$ node -v
v12.18.3

$ yarn -v
1.22.4

$ yarn nuxt-ts -v
@nuxt/cli v2.14.4
```

## 環境設定

まずは普通にCLIからプロジェクトを作成します。Typescriptに対応しておくと色々幸せなので、Programming languageは**Typescript**を選択します。

その他はお好きな項目を選択してください。
<alert>Typescriptに対応したNuxtプロジェクトを選択します。</alert>

```bash
create-nuxt-app v3.2.0
✨  Generating Nuxt.js project in nuxt-i18n
? Project name: nuxt-i18n
? Programming language: TypeScript
? Package manager: Yarn
? UI framework: None
? Nuxt.js modules: Content
? Linting tools: (Press <space> to select, <a> to toggle all, <i> to invert selection)
? Testing framework: None
? Rendering mode: Universal (SSR / SSG)
? Deployment target: Static (Static/JAMStack hosting)
? Development tools: (Press <space> to select, <a> to toggle all, <i> to invert　selection)
```

さて、プロジェクトがセットアップできたら、まずnuxt-i18nモジュールをインストールしましょう。

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn add nuxt-i18n
  ```

  </code-block>
  <code-block label="NPM">

  ```bash
  npm install nuxt-i18n
  ```

  </code-block>
</code-group>

次に、nuxt-i18nをプロジェクトに組み込むため、nuxt.configを編集します。

<alert>nuxt.config.jsでも構いません。</alert>

```js[nuxt.config.ts]

modules: [
  'nuxt-i18n',
]

i18n: {
  locales: [
    { file: 'ja.json', code: 'ja' },
    { file: 'en.json', code: 'en' }
  ],
  defaultLocale: 'en',
  vueI18n: {
    fallbackLocale: 'en'
  },
  lazy: true,
  langDir: 'lang/'
}
```

設定をざっくり見てみると、localesは対応したい言語のファイルパスと言語コードのセットを指定します。
今回は英語と日本語にしてみました。

また **defaultLocale**は初期言語、**fallbackLocale**は言語取得を失敗したときにフォールバックする言語を指定します。
**langDir**は翻訳ファイルを置くディレクトリ、**lazy**は翻訳ファイルを参照して翻訳する場合はTrueが必須になります。

NuxtにTypescriptのランタイムを選択した場合は、tsconfig.jsonを編集してnuxt-i18nのtypesを追加しましょう。
インテリセンスが効いて心地よく開発できるようになります。
<alert>vscodeの場合設定後にエディターを再起動するのを推奨します。</alert>

```js[tsconfig.json]
{
  "compilerOptions": {
    "types": [
      "nuxt-i18n"
    ]
  }
}
```

続いて、翻訳ファイルを作成しましょう。**langDir**に指定したディレクトリはnuxt.configで設定されているsrcDirを起点にしているので、今回はプロジェクトルートに設置します。

```js[~/lang/ja.json]
{
  "INPUT": {
    "PLACEHOLDER": "Search"
  }
}
```

```js[~/lang/ja.json]
{
  "INPUT": {
    "PLACEHOLDER": "検索"
  }
}
```

**locale**に指定したファイル名で翻訳内容をkey-value形式で記述します。

また今回の例のように、key-valueはネストさせることもできるので、好きなように階層を分けることができます。
大文字キーにするなどのルールは好きに決めてください。

これで設定は終わりです。次に実際の例とともにコンポーネントで使ってみましょう。

## コンポーネントでi18nを使う

今回は例としてInputタグのプレースホルダを翻訳してみましょう。
適当にInputタグのコンポーネントを作成しましょう。

```js[components/InputSearch.vue]
<template>
  <input
    type="search"
    aria-label="search"
    autocomplete="off"
    spellcheck="false"
    :placeholder="$t('INPUT.PLACEHOLDER')"
  />
</template>
```

コンポーネントのテンプレート内でi18nを使うには、$t関数を使います(vscodeではおそらくインテリセンスが効きます)。
$t関数の引数に、先程設定した翻訳ファイルのkey-valueを設定することで、自動的に翻訳できます。
**defaultLocale**をenにしているのでプレースホルダにSearchと出力されているのが確認できるでしょう。

### Language Switcherで言語を切り替える

デフォルトの言語が表示されたので、今度はそれを切り替えてみましょう。
今度は適当なボタンを用意します。

<code-group>
  <code-block label="Class API" active>

  ```js[components/LanguageSwitcher.vue]
  <template>
    <button @click="onClick">🌐</button>
  </template>

  <script lang="ts">
    export default Vue.extend({
      methods: {
        onClick():void {
          this.$i18n.locale = this.$i18n.locale === "en" ? "ja": "en"
        }
      }
    })
  </script>
  ```

  </code-block>
<code-block label="Composition API">

  ```js[components/LanguageSwitcher.vue]
  <template>
    <button @click="onClick">🌐</button>
  </template>

  <script lang="ts">
    import { defineComponent } from '@nuxtjs/composition-api'

    export default defineComponent({
      setup(_, { root }) {
        const onClick = ():void => {
          root.$i18n.locale = root.$i18n.locale === "en" ? "ja": "en"
        }

        return { onClick }
      }
    })
  </script>
  ```

  </code-block>
</code-group>

scriptタグの中では、Class APIではおなじみの**this**でComposition APIではContextの中のrootからアクセスできます。

このボタンコンポーネントをpagesに配置してボタンをクリックすると、クリックの度にプレースホルダの値がかわることを確認できます。
簡易的ですが、これで言語の切り替えもできましたね😄

<!-- ## nuxt generateで静的ファイルを見てみる -->
