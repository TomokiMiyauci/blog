---
title: ViteでVue3のTypescript環境を構築する
description: No bundleツールのViteを使って、TypescriptでのVue3環境を構築します。ESLintやPrettierの設定もあわせて行い、DXの高い環境を構築します。
tags: 
  - Vue3
  - Tutorial
img: https://res.cloudinary.com/dz3vsv9pg/image/upload/c_scale,f_auto,q_auto,w_824,x_0/v1603901810/vite-vue3-typescript/thumbnail.png
private: false
thumbnail: https://res.cloudinary.com/dz3vsv9pg/image/upload/c_scale,f_auto,q_auto,w_824,x_0/v1603901810/vite-vue3-typescript/thumbnail.png
cover: https://res.cloudinary.com/dz3vsv9pg/image/upload/c_scale,f_auto,q_auto,w_824,x_0/v1603901810/vite-vue3-typescript/thumbnail.png
alt: cover
---

## はじめに

ViteはVue.jsの作者のEvan You氏が開発しているビルドツールです。
ネイティブのES Moduleのインポートを利用し、バンドル不要で高速に動作する開発環境を提供します。
Vue3はもちろん、ReactやPreactも対応しています。

今回はそんなViteを使って、Vue3プロジェクトの環境構築をします。

できあがったテンプレートは[こちら](https://github.com/TomokiMiyauci/vite-vue3-template)にあります。

## やること

vue/cliのdefaultテンプレートに近づけることを目標に、最低限開発に必要なツールを導入していきます。
ツールを個別に導入できるよう、それぞれ順を追って説明しています。

- Typescript
- ESLint
- Prettier
- Stylelint
- huskyとlint-staged
- Path Alias
- VTI

## 環境構築

まずは、viteのテンプレートを展開しましょう。

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn create vite-app <project-name>
  cd <project-name>
  yarn
  ```

  </code-block>

  <code-block label="NPM">

  ```bash
  npm init vite-app <project-name>
  cd <project-name>
  npm i
  ```

  </code-block>
</code-group>

開発サーバーを立ち上げるとその速さに感動します。

### Typescriptにする

続いてプロジェクトをTypescript化しましょう。といってもVue3からはデフォルトでTypescriptが使えるので次の３つを行うだけです。

1.すべての`.vue`ファイルの`script`タグに`lang="ts"`を追記します。  
2.`main.js`を`main.ts`に変更します。  
3.`index.html`のscriptタグのsrcを`/src/main.ts`に変更します。

これで開発サーバーを立ち上げると、問題なく実行できるのが確認できます。

実際はこれだけでも動きますが、エディター上でのユーザーエクスペリエンスを向上させるために、さらに設定を加えます。

VSCodeを使っている場合は、`main.ts`でts(2307)エラーが出ているはずです。

これを解消するには、vue用の型宣言ファイルを用意します。

```ts[~/src/shims-vue.d.ts]
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string,unknown>, Record<string,unknown>, unknown>
  export default component
}
```

`tsconfig.json`をプロジェクトルートに設置します。これでエディターにTypescriptプロジェクトであることを認識させます。

```json[tsconfig.json]
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve",
    "importHelpers": true,
    "moduleResolution": "node",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "sourceMap": true,
    "baseUrl": ".",
    "paths": {
      "/@/*": [ // /から始まるようにします
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
  ],
  "exclude": [
    "node_modules"
  ]
}

```

これでTypescript化は終了です。

### ESLintを導入する

リンターのない開発は厳しいので、必ず導入しましょう。

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn add -D eslint eslint-plugin-vue @vue/eslint-config-typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin typescript
  ```

  </code-block>

  <code-block label="NPM">

  ```bash
  npm i -D eslint eslint-plugin-vue @vue/eslint-config-typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin typescript
  ```

  </code-block>

</code-group>

```json[.eslintrc]
{
  "root": true,
  "env": {
      "browser": true,
      "es2021": true,
      "node": true
  },
  "extends": [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended"
  ],
  "parserOptions": {
      "ecmaVersion": 2021
  },
  "plugins": [
  ],
  "rules": {
  }
}
```

`package.json`の`script`にリント用のコマンドを用意するとのちのち楽です。

```json[package.json]
"scripts": {
  "lint:script": "eslint --ext .ts,vue --ignore-path .gitignore ."
}
```

個人的には、fixしたくない場面もあるので、`--fix`は外から付けるようにしています。

さてこれを実行させましょう。

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn lint:script --fix
  ```

  </code-block>

  <code-block label="NPM">

  ```bash
  npm run lint:script --fix
  ```

  </code-block>
</code-group>

VSCodeユーザーは以下の設定もすることで、自動フォーマットを効かせることができます。
ESLintの拡張が必要なので、なければ[ここを参考に](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)インストールしてください。

```json[.vscode/settings.json]
{
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  }
}
```

これによって保存時にフォーマットできました。

### huskyとlint-stagedを設定する

コミット前に、静的チェックを走らせ、エラーコードをコミットできない仕組みにしましょう。

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn add -D husky lint-staged
  ```

  </code-block>

  <code-block label="NPM">

  ```bash
  npm i -D husky lint-staged
  ```
  
  </code-block>
</code-group>

`package.json`に次を追加します。

```json[package.json]
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,vue}": "eslint --fix"
  }
}
```

これによって、コミット前にコミットファイルのうち該当する拡張子のファイルに対し、ESLintが走ります。

もちろんリントエラーの場合はコミットがキャンセルされます。

### Prettierを設定する

Prettierにプロジェクト全体のフォーマットを任せましょう。
また、Typescriptのコードでは、セミコロンは視認性が悪くなるため、Prettierで自動的に削除しましょう。

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn add -D prettier eslint-plugin-prettier @vue/eslint-config-prettier
  ```

  </code-block>

  <code-block label="NPM">

  ```bash
  npm i -D prettier eslint-plugin-prettier @vue/eslint-config-prettier
  ```

  </code-block>
</code-group>

```json[.prettierrc]
{
  "singleQuote": true,
  "semi": false,
  "vueIndentScriptAndStyle": true
}
```

ESLintとPrettierを併用する場合、ルールのバッティングがあるため、`.eslintrc`を修正します。

```json[.eslintrc]
{
  "extends": [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended",
    // 他のルールの下に追加
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint"
  ]
}
```

コマンドによってフォーマッターを実行できます。

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn prettier -w -u .
  ```

  </code-block>

  <code-block label="NPM">

  ```bash
  npm run prettier -w -u .
  ```

  </code-block>
</code-group>

コミット前に自動フォーマットを適用させたいので、`lint-staged`にその設定を加えます。

```json[package.json]
{
 "lint-staged": {
    "*.{ts,vue}": "eslint --fix",
    "*": "prettier -w -u" // prettierは一番最後にします
  }
}
```

VSCodeユーザーは次の設定によって、自動的にフォーマットできます。
また、例によって拡張が必要なので、なければ[こちらを参考に](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)インストールしてください。

```json[.vscode/settings.json]
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

### Stylelintを設定する

スタイルもリント対象にしましょう。

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn add -D stylelint stylelint-config-recommended stylelint-config-standard
  ```

  </code-block>

  <code-block label="NPM">

  ```bash
  npm i -D stylelint stylelint-config-recommended stylelint-config-standard
  ```

  </code-block>
</code-group>

```json[.stylelintrc]
{
  "extends": ["stylelint-config-recommended", "stylelint-config-standard"]
}
```

`package.jsoon`を編集して、コマンドとlint-stagedを設定します。

```json[package.json]
{
  "scripts": {
    "lint:style": "stylelint src/**/*.{css,scss,vue}"
  },
  "lint-staged": {
    "*.{ts,tsx}": "eslint --fix",
    "*.{css,scss,vue}": "stylelint --fix",
    "*": "prettier -w -u"
  }
}
```

VSCodeユーザーは次の設定によって、自動的にフォーマットできます。
拡張が必要なので、なければ[こちらを参考に](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)インストールしてください。

長くなりましたがこれでリンターとフォーマッターの基本的な設定は終了です。

### Path Aliasを設定する

モジュールのimportはデフォルトでは相対パスを指定しますが、aliasを設定して常に同じルートを参照したいです。
viteは内部ではRollupを使用しているようですが、`vite.config.ts`を作成しaliasを設定しましょう。

<alert type="warning">Keyは`/`から始まらなければなりません。</alert>

```ts[vite.config.ts]
import { join } from 'path'
import type { UserConfig } from 'vite'

const config: UserConfig = {
  alias: {
    '/@/': join(__dirname, 'src'),
  }
}
```

これでaliasの設定ができました。こんな感じで使います。

```vue[App.vue]
<script lang="ts">
  import HelloWorld from '/@/components/HelloWorld.vue'
</script>
```

`/`から始まらなければならないのが、少し違和感ありますが、パッケージ名のaliasとの兼ね合いみたいです。
詳しくは[こちら](https://github.com/vitejs/vite/blob/master/src/node/config.ts#L53)を参照ください。

### VTIでtemplateの静的チェックをする

<alert type="warning" >VTIはWIPなため、使用は各自判断してください</alert>

Vueファイルのtemplateタグへも静的チェックを行いたいです。今回はVeturのプロジェクトにあるvtiを使います。

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn add -D vti
  ```

  </code-block>

  <code-block label="NPM">

  ```bash
  npm i -D vti
  ```

  </code-block>
</code-group>

```json[package.json]
"scripts": {
  "lint:markup": "vti diagnostics",
}
```

既存のVueファイルでは`defineComponent`でラップしないとエラーになってしまうので、修正します。

```vue[*.vue]
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({})
</script>
```

また、静的チェックはVueファイルが増加するとかなり時間がかかるようになるため、コミット前ではなくCIで実行することをおすすめします。

以上で最低限の環境が構築できました。
