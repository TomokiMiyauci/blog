export const thumbnail =
  'https://res.cloudinary.com/dz3vsv9pg/image/upload/c_scale,f_auto,q_auto,w_400/v1598874649/composition-api.png'

export const tags = ['Nuxtjs', 'Tutorial', 'Blog']

export const title = 'This is sample title'

export const readingTime = '10 min read'

export const date = '2020/01/01'

export const document = {
  title: 'Vue3の新機能「composition-api」をNuxtで使ってみる',
  description: 'portal-vueをNuxtプロジェクトで使い、Teleportの基本的な使い方を解説する',
  category: 'configuration',
  tags: ['Nuxtjs', 'Tutorial', 'CompositionApi'],
  img: 'https://res.cloudinary.com/dz3vsv9pg/image/upload/c_scale,f_auto,q_auto,w_400/v1598874649/composition-api.png',
  private: false,
  alt: 'cover',
  toc: [{ id: 'teleportとは', depth: 2, text: 'Teleportとは' }],
  body: {
    type: 'root',
    children: [
      {
        type: 'element',
        tag: 'h2',
        props: { id: 'teleportとは' },
        children: [
          {
            type: 'element',
            tag: 'a',
            props: { ariaHidden: 'true', href: '#teleport%E3%81%A8%E3%81%AF', tabIndex: -1 },
            children: [{ type: 'element', tag: 'span', props: { className: ['icon', 'icon-link'] }, children: [] }]
          },
          { type: 'text', value: 'Teleportとは' }
        ]
      }
    ]
  },
  dir: '/articles',
  path: '/articles/nuxt-composition-api',
  extension: '.md',
  slug: 'nuxt-composition-api',
  createdAt: '2020-08-30T09:31:21.372Z',
  updatedAt: '2020-09-02T13:30:14.158Z',
  readingTime: '1 min read'
}

export const prevNext = {
  title: 'Nuxtjsでブログを作ろう',
  path: '/articles/start-to-create-blog',
  extension: '.md',
  slug: 'start-to-create-blog',
  img: thumbnail
}
