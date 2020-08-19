---
title: Svelte３を試してみよう
description: フロントエンドフレームワークとして勢いのあるSvelteをチュートリアル＋必要なツールの設定をしてみた
tags: 
  - Tutorial
position: 1
category: Getting started
version: 1.4
fullscreen: false
---

## Svelteとは

最初にSvelteの特徴について軽くまとめておきましょう。筆者は特にVueに精通しているので、Vueと比較したときに感じた違いは以下のとおりです。

- Buildが早い
- 組み込みのアニメーションやトランジションモジュールが便利
- Typescript周りのエコシステムは一部を覗いて概ね育っている

## 使うもの

```bash
$ yarn -v
1.22.4

$ node -v
v14.5.0
```

## 環境設定

はじめに以下のコマンドで、プロジェクトのテンプレートを作成します。

```bash
npx degit sveltejs/template <your-project>
```

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn add @nuxt/content
  ```

  </code-block>
  <code-block label="NPM">

  ```bash
  npm install @nuxt/content
  ```

  </code-block>
</code-group>
