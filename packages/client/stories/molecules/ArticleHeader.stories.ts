import { Headline } from '@/types/article'

export default {
  title: 'ArticleHeadline'
}

const headline: Headline = {
  title: 'This is title',
  slug: 'slug',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  tags: ['Nuxtjs', 'Tutorial', 'Blog'],
  createdAt: new Date().toString(),
  readingTime: '30 min read',
  img: 'https://res.cloudinary.com/dz3vsv9pg/image/upload/c_scale,f_auto,q_auto,w_400/v1598874649/composition-api.png',
  alt: 'image'
}

export const DEFAULT = () => ({
  template: '<article-headline :headline="headline" />',
  props: {
    headline: {
      default: headline
    }
  }
})
