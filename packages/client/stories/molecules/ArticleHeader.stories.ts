import { thumbnail, tags, readingTime, date, title } from '../constant'

export default {
  title: 'ArticleHeader'
}

export const DEFAULT = () => ({
  template: '<article-header v-bind="$props"  />',
  props: {
    thumbnail: {
      default: thumbnail
    },

    title: {
      default: title
    },

    readingTime: {
      default: readingTime
    },

    tags: {
      default: tags
    },

    updatedAt: {
      default: date
    }
  }
})
