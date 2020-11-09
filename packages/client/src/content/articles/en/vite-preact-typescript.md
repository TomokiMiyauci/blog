---
title: Building a Typescript Environment for Preact with Vite
description: Building a Typescript Preact environment using the No bundle tool Vite, along with ESLint and Prettier configuration.
tags: 
  - Preact
  - Tutorial
img: https://res.cloudinary.com/dz3vsv9pg/image/upload/c_scale,f_auto,h_453,q_auto/v1603002330/vite-preact-typescript/note_%E3%83%8E%E3%83%BC%E3%83%88_%E8%A8%98%E4%BA%8B%E8%A6%8B%E5%87%BA%E3%81%97%E7%94%BB%E5%83%8F_%E3%82%A2%E3%82%A4%E3%82%AD%E3%83%A3%E3%83%83%E3%83%81_4_wpmyr1.png
private: false
thumbnail: https://res.cloudinary.com/dz3vsv9pg/image/upload/c_scale,f_auto,h_453,q_auto/v1603002330/vite-preact-typescript/note_%E3%83%8E%E3%83%BC%E3%83%88_%E8%A8%98%E4%BA%8B%E8%A6%8B%E5%87%BA%E3%81%97%E7%94%BB%E5%83%8F_%E3%82%A2%E3%82%A4%E3%82%AD%E3%83%A3%E3%83%83%E3%83%81_4_wpmyr1.png
cover: https://res.cloudinary.com/dz3vsv9pg/image/upload/c_scale,f_auto,h_453,q_auto/v1603002330/vite-preact-typescript/note_%E3%83%8E%E3%83%BC%E3%83%88_%E8%A8%98%E4%BA%8B%E8%A6%8B%E5%87%BA%E3%81%97%E7%94%BB%E5%83%8F_%E3%82%A2%E3%82%A4%E3%82%AD%E3%83%A3%E3%83%83%E3%83%81_4_wpmyr1.png
alt: cover
---

## Introduction

Vite is a build tool developed by Evan You, the author of Vue.
It uses native ES Module imports and provide a fast running development environment with no bundling required.
Vue3, React and Preact are also supported.
In this article, I'll use Vite to build a Preact project environment.

You can find the result template in [here](https://github.com/TomokiMiyauci/vite-preact).

## To do

I will introduce the minimum tools necessary for development.
The goal is making it close to the default preact/cli template.
The following is a step-by-step explanation of each tool, so that you can introduce them individually.

- Typescript
- ESLint
- Prettier
- Stylelint
- husky and lint-staged
- Path Alias

## Building Environments

First, let's expand the vite template.

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

Once the development server is up, you'll be impressed by how fast it is.

### Typescript

Then, let's typescript the project. In a minimal configuration, you only need to do two things.

1.Change all `.jsx` files to `.tsx`.  
2.Change the src of the script tag of `index.html` to `/src/main.tsx`.

Now you can start up the development server and see that it runs without any problems.

It should work, but I'll add a few more settings to improve the user experience in the editor.

Place the `tsconfig.json` in your project root. This will tell the editor to recognize the project as a Typescript project.

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

VSCode shows an error in the `.tsx` file at this point, so fix it. Add this sentence to all the `.tsx` files.

```ts
import { h } from 'preact'
```

If you are using `Fragment`, import it as well.

```ts
import { h, Fragment } from 'preact'
```

Next, fix the entry point, `main.tsx`.
Now that it's in Typescript, a type error has been detected.
The `document.getElementById` returns `HTMLElement` or `null`, give it a null check.

<alert>You can use the `Non-null assertion operator` if the `app` is always exists in `index.html`.</alert>

```tsx[main.tsx]
const el = document.getElementById('app')
if (el) {
  render(<App />, el)
}
```

Then make some changes to `vite.config.js`.

```ts[vite.config.js]
const config = {
  jsx: {
    factory: 'h',
    fragment: 'Fragment'
  },
  plugins: [preactRefresh()]
}
```

I was able to make Typescript with minimal configuration. You don't have to do the following.

Change `vite.config.js` to `.ts` to eliminate `.js` files.
Also, change it to the ES Module format to make the whole project more consistent.

The `vite.config.ts` should look like this

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

That's the end of Typescript.

### Introducing ESLint

Development without a linter is tough, so be sure to install it.

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

It is easy to prepare a linting command in the `script` of the `package.json` for later.

It will be easier later on if you have a command for linting in the `package.json` script of the `package.json`.

```json[package.json]
"scripts": {
  "lint:script": "eslint --ext .ts,tsx --ignore-path .gitignore ."
}
```

Personally, I don't want to fix some situations, so I use `--fix` from outside.

Now let's run this.

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

VSCode users can also set up the following settings to make the automatic formatting work.
An extension to ESLint is required, so if you don't have it, please install it [here](<https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint>).

```json[.vscode/settings.json]
{
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  }
}
```

This allowed me to format the file on save.

### Configuring husky and lint-staged

Before committing, let's run a static check to make sure you can't commit the error code.

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

Add the following to `package.json`.

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

This causes ESLint to run against any files with the appropriate extensions in the commit file before you commit.

Of course, on a linting error, the commit is canceled.

### Configuring Prettier

Let Prettier do the formatting for your entire project.
Also, let Prettier automatically remove semicolons in Typescript code, as they are less visible.

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

When ESLint and Prettier are used together, I need to fix the ``.eslintrc`` to avoid duplicate rules.

```json[.eslintrc]
{
  "extends": [
    "eslint:all",
    "preact",
    // Added under other rules
    "prettier",
    "prettier/@typescript-eslint"
  ]
}
```

command to execute the formatter.

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

We want to apply automatic formatting before committing, so we add the setting to ``lint-staged``.

```json[package.json]
{
 "lint-staged": {
    "*.{ts,tsx}": "eslint --fix",
    "*": "prettier -w -u" // Prettier is the last one to go
  }
}
```

VSCode users can format it automatically with the following settings.
Also, an extension is required, so if it is not available, please install it [here](<https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>).

```json[.vscode/settings.json]
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

### Configuring Stylelint

Let's make the style file a target for linting as well.

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

Edit the `package.jsoon` and set the commands and lint-staged.

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

VSCode users can format it automatically with the following settings.
Extensions are required, so if you don't have them, install them [here](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint).

That's the end of the basic setup of the linker and formatter.

### Configuring Path Alias

Module import is relative by default, but we want to set alias to always refer to the same root.

Change the `vite.config.ts` and `tsconfig.json` to set the alias.

<alert type="warning">Keys must start with `/`.</alert>

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

Now you can set up alias. We'll use it like this.

```tsx[main.tsx]
import { App } from '/@/app'
```

It's a little strange that it has to start from `/`, but it seems to combine with the alias of the package name.
For more information, please refer to [here](https://github.com/vitejs/vite/blob/master/src/node/config.ts#L53).

That's the minimum environment you can build.
