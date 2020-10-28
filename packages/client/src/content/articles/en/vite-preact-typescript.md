---
title: ViteでPreactのTypescript環境を構築する
description: No bundleツールのViteを使って、TypescriptベースのPreactの環境を構築します。ESLintやPrettierの設定もあわせて行います。
tags: 
  - Preact
  - Tutorial
img: https://res.cloudinary.com/dz3vsv9pg/image/upload/c_scale,f_auto,h_453,q_auto/v1603002330/vite-preact-typescript/note_%E3%83%8E%E3%83%BC%E3%83%88_%E8%A8%98%E4%BA%8B%E8%A6%8B%E5%87%BA%E3%81%97%E7%94%BB%E5%83%8F_%E3%82%A2%E3%82%A4%E3%82%AD%E3%83%A3%E3%83%83%E3%83%81_4_wpmyr1.png
private: false
thumbnail: https://res.cloudinary.com/dz3vsv9pg/image/upload/c_scale,f_auto,h_453,q_auto/v1603002330/vite-preact-typescript/note_%E3%83%8E%E3%83%BC%E3%83%88_%E8%A8%98%E4%BA%8B%E8%A6%8B%E5%87%BA%E3%81%97%E7%94%BB%E5%83%8F_%E3%82%A2%E3%82%A4%E3%82%AD%E3%83%A3%E3%83%83%E3%83%81_4_wpmyr1.png
cover: https://res.cloudinary.com/dz3vsv9pg/image/upload/c_scale,f_auto,h_453,q_auto/v1603002330/vite-preact-typescript/note_%E3%83%8E%E3%83%BC%E3%83%88_%E8%A8%98%E4%BA%8B%E8%A6%8B%E5%87%BA%E3%81%97%E7%94%BB%E5%83%8F_%E3%82%A2%E3%82%A4%E3%82%AD%E3%83%A3%E3%83%83%E3%83%81_4_wpmyr1.png
alt: cover
---

## はじめに

ViteはVue.jsの作者のEvan You氏が開発しているビルドツールです。
ネイティブのES Moduleのインポートを利用し、バンドル不要で高速に動作する開発環境を提供します。
Vue3はもちろん、ReactやPreactも対応しています。
今回はそんなViteを使って、Preactプロジェクトの環境構築をします。

できあがったテンプレートは[こちら](https://github.com/TomokiMiyauci/vite-preact)にあります。

## やること

preact/cliのdefaultテンプレートに近づけることを目標に、最低限開発に必要なツールを導入していきます。
ツールを個別に導入できるよう、それぞれ順を追って説明しています。

- Typescript
- ESLint
- Prettier
- Stylelint
- huskyとlint-staged
- Path Alias

## 環境構築

まずは、viteのテンプレートを展開しましょう。

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn create vite-app <project-name> --template preact
  cd <project-name>
  yarn
  ```

  </code-block>

  <code-block label="NPM">

  ```bash
  npm init vite-app <project-name> --template preact
  cd <project-name>
  npm i
  ```

  </code-block>
</code-group>

開発サーバーを立ち上げるとその速さに感動します。

### Typescriptにする

続いてプロジェクトをTypescript化しましょう。最小限の構成では次の２つを行うだけです。

1.すべての`.jsx`ファイルを`.tsx`にします。  
2.`index.html`のscriptタグのsrcを`/src/main.tsx`に変更します。

これで開発サーバーを立ち上げると、問題なく実行できるのが確認できます。

実際はこれだけでも動きますが、エディター上でのユーザーエクスペリエンスを向上させるために、さらに設定を加えます。

`tsconfig.json`をプロジェクトルートに設置します。これでエディターにTypescriptプロジェクトであることを認識させます。

```json[tsconfig.json]
{
  "compilerOptions": {
    "target": "esnext",
    "lib": ["DOM", "DOM.Iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": false,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "jsxFactory": "h",
    "jsxFragmentFactory": "Fragment"
  },
  "include": ["src"]
}
```

VSCodeではこの時点で、`.tsx`ファイルにエラーが表示されているので、これを修正します。全ての`.tsx`ファイルに次の一文を加えます。

```ts
import { h } from 'preact'
```

また`Fragment`を使っている場合は、更にそれもインポートします。

```ts
import { h, Fragment } from 'preact'
```

次に、エントリーポイントである`main.tsx`を修正します。
Typescriptになったことで、型エラーが検出されています。
`document.getElementById`は戻り値が`HTMLElement`または`null`なため、nullチェックを入れてあげます。
<alert>
`index.html`のidにappが必ず存在するなら、`Non-null assertion operator`も使えます。
</alert>

```tsx[main.tsx]
const el = document.getElementById('app')
if (el) {
  render(<App />, el)
}
```

続いて`vite.config.js`に変更を加えます。

```ts[vite.config.js]
const config = {
  jsx: {
    factory: 'h',
    fragment: 'Fragment'
  },
  plugins: [preactRefresh()]
}
```

最小構成でTypescript化できました。以下は、やらなくても問題ありません。

`.js`ファイルの撲滅のため、`vite.config.js`を`.ts`に変更しましょう。また、ES Module形式に変更し、プロジェクト全体の統一感を高めましょう。

`vite.config.ts`は以下のようになります。

```ts[vite.config.ts]
import preactRefresh from '@prefresh/vite'
import type { UserConfig } from 'vite'

const config: UserConfig = {
  jsx: {
    factory: 'h',
    fragment: 'Fragment',
  },

  plugins: [preactRefresh()],
}

export default config
```

これでTypescript化は終了です。

### ESLintを導入する

リンターのない開発は厳しいので、必ず導入しましょう。

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn add -D eslint eslint-config-preact @typescript-eslint/parser typescript
  ```

  </code-block>

  <code-block label="NPM">

  ```bash
  npm i -D eslint eslint-config-preact @typescript-eslint/parser typescript
  ```

  </code-block>

</code-group>

```json[.eslintrc]
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "preact"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {}
}
```

`package.json`の`script`にリント用のコマンドを用意するとのちのち楽です。

```json[package.json]
"scripts": {
  "lint:script": "eslint --ext .ts,tsx --ignore-path .gitignore ."
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
    "*.{ts,tsx}": "eslint --fix"
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
  yarn add -D prettier eslint-config-prettier
  ```

  </code-block>

  <code-block label="NPM">

  ```bash
  npm i -D prettier eslint-config-prettier
  ```

  </code-block>
</code-group>

```json[.prettierrc]
{
  "trailingComma": "es5",
  "semi": false,
  "singleQuote": true
}
```

ESLintとPrettierを併用する場合、ルールのバッティングがあるため、`.eslintrc`を修正します。

```json[.eslintrc]
{
  "extends": [
    "eslint:all",
    "preact",
    // 他のルールの下に追加
    "prettier",
    "prettier/@typescript-eslint"
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
    "*.{ts,tsx}": "eslint --fix",
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

スタイルファイルもリント対象にしましょう。

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
    "lint:style": "stylelint src/**/*.{css,scss}"
  },
  "lint-staged": {
    "*.{ts,tsx}": "eslint --fix",
    "*.{css,scss}": "stylelint --fix",
    "*": "prettier -w -u"
  }
}
```

VSCodeユーザーは次の設定によって、自動的にフォーマットできます。
拡張が必要なので、なければ[こちらを参考に](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)インストールしてください。

長くなりましたがこれでリンターとフォーマッターの基本的な設定は終了です。

### Path Aliasを設定する

モジュールのimportはデフォルトでは相対パスを指定しますが、aliasを設定して常に同じルートを参照したいです。

`vite.config.ts`と`tsconfig.json`変更してaliasを設定しましょう。

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

```json[tsconfig.json]
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "/@/*": ["src/*"]
    }
  },
  "include": ["src"]
}
```

これでaliasの設定ができました。こんな感じで使います。

```tsx[main.tsx]
import { App } from '/@/app'
```

`/`から始まらなければならないのが、少し違和感ありますが、パッケージ名のaliasとの兼ね合いみたいです。
詳しくは[こちら](https://github.com/vitejs/vite/blob/master/src/node/config.ts#L53)を参照ください。

以上で最低限の環境が構築できました。
