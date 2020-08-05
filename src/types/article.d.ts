type Stats = {
  text: string
  minutes: number
  time: number
  words: number
}

type BaseContent = {
  dir: string
  path: string
  slug: string
  extension: '.md'
  createdAt: Date
  updated: Date
}

type Frontmatter = {
  title: string
  description: string
  tags: string[]
}

export type Article = BaseContent &
  Frontmatter & {
    readingTime: Stats['text']
  }

export type PrevNext = Pick<Article, 'title' | 'slug'>

export type Headline = Pick<Article, 'title' | 'description' | 'slug' | 'readingTime' | 'createdAt'>
