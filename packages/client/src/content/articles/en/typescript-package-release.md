---
title: Publish Typescript Packages with minimal configuration
description: Describes how to publish the Typescript project as a package to the NPM registry. It assumes you are using NPM and Yarn as a package manager.
tags: 
  - Typescript
  - Package
  - Yarn
img: https://res.cloudinary.com/dz3vsv9pg/image/upload/c_scale,f_auto,q_auto,w_800/v1605456609/typescript-library-release/thumbnail.png
private: false
thumbnail: https://res.cloudinary.com/dz3vsv9pg/image/upload/c_scale,f_auto,q_auto,w_800/v1605456609/typescript-library-release/thumbnail.png
cover: https://res.cloudinary.com/dz3vsv9pg/image/upload/c_scale,f_auto,q_auto,w_800/v1605456609/typescript-library-release/thumbnail.png
alt: cover
---


## Introduction

I will show you how to expose Node.js packages written in Typescript to the NPM registry.
I will walk you through the process of publishing a generic package, assuming `tsc` as the compiler and `CommonJS` as the target.

This article is especially recommended for the following people.

- Those who are publishing a package for the first time
- Who want to know about the Typescript project packages
- Although used automatic release tools such as `standard-version` and `semantic-release`,
Who want to know what actually doing

This article covers the most primitive part of the release.
I'm not going to cover things like Git tags, release notes, or updating GitHub releases.
We'll cover this area in another article.

I'll even show you how to remove packages at the end, so you can get a feel for it if get hands-on with it.

## Building the Typescript environment

First, prepare a Typescript project.
The introduction is omitted .gitignore and other linters from the explanation, so please deal with it accordingly.
If you already have a project, please refer to the necessary parts of it.

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn init
  ```

  </code-block>

  <code-block label="NPM">

  ```bash
  npm init
  ```

  </code-block>
</code-group>

```bash
package name: (test-typescript-release) // Must be a non-existent
version: (1.0.0) 0.0.0 // Set it to 0.0.0 for now
description: This is test typescript project
entry point: (index.js) dist/index.js　// Change this to match the outDir
test command:
git repository:
keywords: test
author: TomokiMiyauci
license: (ISC) MIT
```

The package name must be unique in NPM.
You can confirm the existence of the project by using the following command or the NPM website.

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn info <package-name>
  ```

  </code-block>

  <code-block label="NPM">

  ```bash
  npm search <package-name>
  ```

  </code-block>
</code-group>

As for the first `version`, the recommended value is `0.1.0`, so you should set it to `0.0.0`.

For `version`1.0.0`, the following criteria seem to apply.

`If your software is being used in production, it should probably already be 1.0.0. If you have a stable API on which users have come to depend, you should be 1.0.0. If you’re worrying a lot about backwards compatibility, you should probably already be 1.0.0.`

Next, install the packages needed for Typescript.

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn add -D typescript @types/node
  yarn tsc --init
  ```

  </code-block>

  <code-block label="NPM">

  ```bash
  npm i -D typescript @types/node
  npx tsc --init
  ```

  </code-block>
</code-group>

```ts[tsconfig.json]
{
  "compilerOptions": {
    "target": "ESNext",  
    "module": "CommonJS",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",

    /* Checks */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,

    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true  
  },

  "include": ["src/**/*"]
}
```

Since the package is intended to work with Node.js, `module` is set to `CommonJS`.
It is a package, set `declaration`, `declarationMap` and `sourceMap` to `true`.
And `include` is the directory you want to include in the compilation. The main code is placed under `src`.

Set the `script` in package.json to include the build command and the command to build the code before publishing each time.

```json[package.json]
{
  "name": "test-typescript-release",
  "version": "0.0.0",
  "description": "This is test typescript project",
  "main": "dist/index.js",
  "license": "MIT",
  "private": false,
  "files": [
    "dist"
  ],
  "devDependencies": {
    "typescript": "^4.0.5"
  },
  "scripts": {
    "build": "tsc",
    "prepublishOnly": "yarn build" // "npm run build" if you are an npm user
  }
}
```

The `private` option should be marked `false`. If the option set to `true`, the file is never published.

Also, the `files` option specifies the actual directory to be published. This saves you from publishing anything extra.
Since I specified dist in the `outDir` in `tsconfig.json`, I can specify the dist to match it.
For the same reason, set the `main` option to dist/index.js . This will be the entry point for `import` and `require`.

Now, make a src directory and prepare an appropriate program.
As I specified dist/index.js in `main` earlier, there is no problem as long as you have `index.ts` as the entry point.

Import the functions from the file and re-export them as you see fit. You can create your own program here as well.

```ts[~/src/index.ts]
export { hello } from './core'
```

```ts[~/src/core.ts]
export const hello = () => console.info('hello world')
```

When compile it, you get the following directory structure

```bash
.
├── dist
│   ├── core.d.ts
│   ├── core.d.ts.map
│   ├── core.js
│   ├── core.js.map
│   ├── index.d.ts
│   ├── index.d.ts.map
│   ├── index.js
│   └── index.js.map
├── package.json
├── src
│   ├── core.ts
│   └── index.ts
├── tsconfig.json
└── yarn.lock/package-lock.json
```

## Publish the package

All you have to do now is to publish the package. To publish, you need an NPM account first.
If you don't have an account, please create one from [here](https://www.npmjs.com/signup).

Then, log in with the command line.

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn login
  ```

  </code-block>

  <code-block label="NPM">

  ```bash
  npm login
  ```

  </code-block>
</code-group>

You can check if you have successfully logged in with the following command.

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn npm whoami
  ```

  </code-block>

  <code-block label="NPM">

  ```bash
  npm whoami
  ```

  </code-block>
</code-group>

Once you have successfully logged in, it's time to publish the package.
To do so, issue the following command.

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn publish
  ```

  </code-block>

  <code-block label="NPM">

  ```bash
  npm publish
  ```

  </code-block>
</code-group>

The interactive interface asks for the version, so set `0.1.0` at first.

```bash
info Current version: 0.0.0
question New version: 0.1.0
```

If you don't increment version, you can't publish it.
The numbering process will be a pain in the ass, but there is a tool that automatically numbers from the commit message.
I will explain about this in another article.

After that, the version of package.json will be rewritten automatically and the package will be published.

If you look at the command log,
you can see that the build command specified in `prepublishOnly` of package.json is also executed.

After the package has been successfully published, let's install the published package.

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn add <package-name>
  ```

  </code-block>

  <code-block label="NPM">

  ```bash
  npm i <package-name>
  ```

  </code-block>
</code-group>

You can import them by `import` or `require` like normal packages. Depending on the editor, type information may also be shown.

Also, if you check the installed package from node_modules, you will see the following information.

```bash
.
├── dist
│   ├── core.d.ts
│   ├── core.d.ts.map
│   ├── core.js
│   ├── core.js.map
│   ├── index.d.ts
│   ├── index.d.ts.map
│   ├── index.js
│   └── index.js.map
└── package.json
```

It looks like only the dist directory and package.json are public, as specified in the `files` option of package.json.

## Removing the package

You can remove the package by executing the following command.

```bash
npm unpublish <package-name>　--force
```

By the way, yarn v1 does not support the unpublish command.
So if you publish with yarn, you can unpublish with npm.

Also, unpublish has a privacy policy.
See [here](https://www.npmjs.com/policies/unpublish) for more details, but in summary, you can make the following cases private

- Packages published within 72 hours
  - Not referenced to any other public package in NPM

- Packages that are more than 72 hours old since their release
  - Not referenced to any other public package in NPM
  - Less than 300 downloads in the previous week
  - Single owner or maintainer

You should be aware that while this works fine for testing,
it is virtually impossible to remove it if it is referenced by another public package.

At any rate, the Typescript package is now available.
