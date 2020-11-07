---
title: どこからでもファイルダイアログを呼び出したい
description: プログラムからファイルダイアログを呼び出し、FileListを受け取る方法を解説する
tags: 
  - Typescript
  - Javascript
  - FileDialog
img: https://res.cloudinary.com/dz3vsv9pg/image/upload/c_scale,f_auto,q_80,w_824/v1603808272/file-dialog/file-dialog.png
private: false
thumbnail: https://res.cloudinary.com/dz3vsv9pg/image/upload/c_scale,f_auto,q_80,w_824/v1603808272/file-dialog/file-dialog.png
cover: https://res.cloudinary.com/dz3vsv9pg/image/upload/c_scale,f_auto,q_80,w_824/v1603808272/file-dialog/file-dialog.png
alt: cover
---

## ファイルダイアログとは

`input`のtypeに`file`を指定し、クリックすると出てくるあれです。現状、ファイルダイアログ自体を直接プログラムから呼び出す方法は無いようで、
巷の解説では、

- inputタグをhiddenにして、labelをボタンのように見せるCSSハック
- inputタグをhiddenにして、getElementでDOMを取得し、`click`を呼び出す

といった方法が溢れています。これらの方法は、同じファイルを複数回選択したときに、inputの`change`イベントが発生しなかったり余計な要素のレンダリングが必要であったりします。
ファイルダイアログを呼び出して、ファイルを受け取りたいだけなのに、スマートではありません。

今回は、ファイルダイアログを簡単に呼び出し、ファイルを受け取る方法を解説します。

## 実装

```ts
export const fileDialog = (accept: string = '*', multiple: boolean = false): Promise<FileList> =>
  new Promise((resolve, reject) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.multiple = multiple
    input.accept = accept

    input.onchange = () => {
      const { files } = input
      if (files) {
        resolve(files)
      } else {
        reject(Error('Not receive the FileList'))
      }
      input.remove()
    }

    input.click()
  })
```

ポイントとしては、ファイルダイアログを呼び出すだけなら、input要素のレンダリングは必要ありません。
そのかわりに、`createElement`でinput要素を作成し`click`でtype=fileのinputタグをクリックしたときと、同じイベントを発生できます。

input要素では`onchange`の発火後、`input`の`files`プロパティで、ファイルダイアログで選択されたファイルへアクセスできます。型としては`FileList`または`null`を受け取るので、nullチェックのために分岐します。

Promiseでラップすることにより、`onchange`を同期的に処理できるため、呼び出し側で `await`を付ければ同期的に処理できます。サンプルでは、`files`が`null`の場合は、`reject`として処理しています。

また、引数として`accept`と`multiple`を受け取るようにしています。どちらもinputタグに存在する属性で、`accept`には受け取るファイルの種類を指定します。`multiple`を`true`にすると複数のファイルを選択できます。

この関数をボタンなどのクリックイベント等によって呼び出すことで、ファイルダイアログを開き、ファイルを受け取ることができます。

ロジックとビューを分離でき、シンプルに実装できるため、ぜひ参考にしてください。
