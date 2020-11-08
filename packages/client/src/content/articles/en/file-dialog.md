---
title: I want to call the file dialog from anywhere
description: Explains how to call a file dialog from a program and receive a FileList
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

## What is the File Dialog

The `input` tag has type of `file`, and if you click on it, you can see the file dialog.
Currently, there is no way to call the file dialog directly from the program.
The following is a description of how to call the file dialog.

- CSS hack to make the label look like a button by making the input tag hidden
- Make the input tag hidden, get the DOM with getElement and call `click`.

These methods do not cause input `change` events to occur when the same file is selected multiple times,
or require rendering of extra elements.
It's not smart to call the file dialog and just want to receive the file.

In this article, I'll show you how to easily call a file dialog and receive a file.

## Implementation

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

The point is, if you just want to call the file dialog, you don't need to render the input element.
Instead, you can generate the same event as when you create an input element with `createElement` and click on the input tag with `click` type=file.

After firing the `onchange` event, the `input` property allows you to access the file selected in the file dialog in the `files` property.
As it accepts `FileList` or `null` as the type, it branches off for a null check.

Because `onchange` can be handled synchronously by wrapping it with Promise,
you can add `await` in the caller to handle it synchronously. In the sample, when `files` is `null`, it is treated as a `reject`.

Also, the sample takes `accept` and `multiple` as arguments.
Both of them are in the input tag and `accept` specifies the type of the file to accept. If `multiple` is set to `true`,
you can select multiple files.

You can call this function by a click event such as a button to open a file dialog and receive the file.

You can separate the logic from the view and implement it simply, so please refer to it.
