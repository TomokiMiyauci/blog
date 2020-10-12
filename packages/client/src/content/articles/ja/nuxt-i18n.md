---
title: Nuxtとnuxt-i18nで国際化をしよう
description: Nuxtでnuxt-i18nを使って国際化を行いインテリセンスによってDXを向上しよう
tags: 
  - Nuxtjs
  - NuxtI18n
  - Tutorial
category: configuration
img: https://res.cloudinary.com/dz3vsv9pg/image/upload/v1600867634/nuxt-i18n/nuxt_i18n_bppm5k.png
private: false
thumbnail: https://res.cloudinary.com/dz3vsv9pg/image/upload/c_scale,f_auto,q_auto,w_800/v1599141075/nuxt-i18n/preview_rs5rzf.png
cover: https://res.cloudinary.com/dz3vsv9pg/image/upload/v1600867634/nuxt-i18n/nuxt_i18n_bppm5k.png
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
  vueI18nLoader: true,
  vueI18n: {
    fallbackLocale: 'en'
  },
  lazy: true,
  langDir: 'lang/'
}
```

設定をざっくり見てみると、`locales`は対応したい言語のファイルパスと言語コードのセットを指定します。ここに設定された言語は、グローバルに参照できます。
今回は英語と日本語にします。

また `defaultLocale`は初期言語、`fallbackLocale`は言語取得を失敗したときにフォールバックする言語を指定します。
`langDir`は翻訳ファイルを置くディレクトリ、`lazy`は翻訳ファイルを参照して翻訳する場合は`True`が必須になります。

NuxtにTypescriptのランタイムを選択した場合は、tsconfig.jsonを編集してnuxt-i18nのtypesを追加しましょう。
インテリセンスが効いて心地よく開発できるようになります。
<alert>vscodeの場合設定後にエディターを再起動するのをお勧めします。</alert>

```js[tsconfig.json]
{
  "compilerOptions": {
    "types": [
      "nuxt-i18n"
    ]
  }
}
```

## データを取得する

nuxt/i18nを使用すると、グローバルもしくはコンポーネントごとに辞書データを定義できます。またコンポーネントでは、templateで利用するか、scriptで辞書データの取得方法が若干異なります。１つづつ見ていきましょう。

### グローバルな辞書を扱う

ここではグローバルな辞書の扱いについて見てみましょう。グローバルな辞書を定義すると、componentsやpagesなど、i18nインスタンスへアクセスできるところであればどこからでも辞書データを参照できます。

よって、グローバルな辞書としては、プロジェクト全体で使われる言葉を定義するといいでしょう。

さて、辞書データの用意をしましょう。グローバルな辞書は先程設定した`langDir`のパスへ設定する必要があるのでそうします。

```js[~/lang/ja.yml]
PROJECT_NAME: テックソース
AUTHOR:
  NAME: TomokiMiyauci
```

```js[~/lang/ja.yml]
PROJECT_NAME: Techsrc
AUTHOR:
  NAME: 宮内智輝
```

`locale`に指定したファイル名で翻訳内容をkey-value形式で記述します。
また今回の例のように、key-valueはネストさせることもできるので、好きなように階層を分けることができます。
大文字キーにするなどのルールは好きに決めてください。
<alert > yml形式の場合は、インデントに気をつけてください。</alert>

続いて、翻訳ファイルを作成しましょう。**langDir**に指定したディレクトリはnuxt.configで設定されているsrcDirを起点にしているので、今回はプロジェクトルートに設置します。

辞書が用意できたら、コンポーネントから辞書がデータを取得しましょう。template内での利用法と、script内での利用法を併記します。例はコンポーネントでの利用法ですが、pagesやlayout内でも同様に利用できます。

また、辞書を取得するには$t関数を使います(Vscodeではおそらくインテリセンスが効きます)。 $t関数の引数に、先程設定した翻訳ファイルのkey-valueを設定することで、自動的に翻訳できます。

Language Switch

#### <template\>

```js[~/components/*.vue]
<template>
  <div>
    <h2>{{$t('PROJECT_NAME')}}</h2>
    <p>{{$t('AUTHOR.NAME')}}</p>
  </div>
</template>
```

#### <script\>

<code-group>
  <code-block label="Class API" active>

  ```js[~/components/*.vue]
  <script lang="ts">
    export default Vue.extend({
      computed: {
        credit: {
          return `© ${this.$t('AUTHOR.NAME')}`
        }
      }
    })
  </script>
  ```

  </code-block>
<code-block label="Composition API">

  ```js[~/components/*.vue]

  <script lang="ts">
    import { defineComponent, computed } from '@nuxtjs/composition-api'

    export default defineComponent({
      setup(_, { root }) {
        const credit = computed(() => {
          return `© ${this.$t('AUTHOR.NAME')}`
        })

        return { credit }
      }
    })
  </script>
  ```

  </code-block>
</code-group>

これだけです。非常に簡単ですね。ちなみにキーのないデータにアクセスしようとすると、エラーではなく、指定したキー名をそのまま返すようになってるようです。

### コンポーネントで辞書を扱う

グローバルな辞書はプロジェクト全体を通して使われる言葉にはいいですが、特定のコンポーネントでしか使わない言葉もあります。そういった言葉はコンポーネントの中で管理したほうが、責務が分離して管理しやすくなります。

コンポーネントの中に辞書を定義する例を見ていきます。
まず、コンポーネントに辞書を定義するには、i18nのオプションとして`vueI18nLoader`を**true**にする必要があります。
そしてコンポーネントの中に`i18n`というタグを埋め込みます。`i18n`には`lang`を選択でき、デフォルトでは、json形式やyml形式を読み込めます。

しかし、そのままだとeslintの警告が出るため、`lang`にymlを指定しています。他にもjson5形式もサポートされています。

```js[~/components/InputSearch.vue]
<i18n lang="yml">
en:
  PLACEHOLDER: Search
ja:
  PLACEHOLDER: 検索
</i18n>
```

ちなみに、言語ごと複数の`i18n`タグを用意し、こんな書き方もできます。

```js[~/components/InputSearch.vue]
<i18n locale="en" lang="yml">
PLACEHOLDER: Search
</i18n>

<i18n locale="ja" lang="yml">
PLACEHOLDER: 検索
</i18n>
```

### コンポーネントで辞書データを取得する

コンポーネント内に辞書を定義したら、それを取得しましょう。

まずは`template`で直接取得する場合です。

`<template>`

```js[components/InputSearch.vue]
<template>
  <input
    type="search"
    aria-label="search"
    :placeholder="$t('PLACEHOLDER')"
  />
</template>
```

グローバルな辞書を取得する場合と全く同じです。
ただし、コンポーネント内で定義した辞書とグローバルに定義した辞書が重複した場合は、コンポーネント内で定義した辞書が優先されます。

続いて`script`内で取得する場合です。

`<script>`

<code-group>
  <code-block label="Class API" active>

  ```js[components/InputSearch.vue]
  <script lang="ts">
    export default Vue.extend({
      computed: {
        withEmoji: {
          return `© ${this.$t('placeholder')}`
        }
      }
    })
  </script>
  ```

  </code-block>
<code-block label="Composition API">

  ```js[components/InputSearch.vue]
  <script lang="ts">
    import { defineComponent, getCurrentInstance } from '@nuxtjs/composition-api'

    export default defineComponent({
      setup() {
        const vm = getCurrentInstance()

        const withEmoji = computed(() => {
          return `🔍 ${vm!.$t('placeholder')}`
        })

        return { withEmoji }
      }
    })
  </script>
  ```

  </code-block>
</code-group>

composition-apiを使った場合、コンポーネントに定義した辞書へ動的にアクセスするのには、少し癖があります。`getCurrentInstance`で、コンポーネントのインスタンスを取得し、インスタンスの`$t`関数からアクセスできます。

さて、これにてデフォルトに設定した言語で翻訳がされました。
<!-- 
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
**defaultLocale**をenにしているのでプレースホルダにSearchと出力されているのが確認できるでしょう。 -->

### Language Switcherで言語を切り替える

デフォルトの言語が表示されたので、今度はそれを切り替えてみましょう。
切り替えるために適当なボタンを用意します。

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

言語を切り替えるためには、`i18n`の`locale`に切り替えたい言語を設定します。
scriptタグの中では、Class APIではおなじみの**this**でComposition APIではContextの中のrootからアクセスできます。

このボタンコンポーネントをpagesに配置してボタンをクリックすると、クリックの度にプレースホルダの値が変わります。
簡易的ですが、これで言語の切り替えもできましたね😄

## まとめ

nuxt/i18nを用いて基本的な国際化の方法を見てきました。i18nには他にも、PluralizationやDateTime localization、Number localizationなど、便利な機能があります。

また、eslintのプラグインとして、[eslint-plugin-vue-i18n](https://eslint-plugin-vue-i18n.intlify.dev/)があったり、Vscodeのプラグインとして[i18n-ally](https://marketplace.visualstudio.com/items?itemName=antfu.i18n-ally)があります。このあたりの解説は、別の記事で行うので参照してください。
