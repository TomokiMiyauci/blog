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
  toc: Toc[]
  extension: '.md'
  createdAt: string
  updatedAt: Date
}

type Frontmatter = {
  title: string
  description: string
  tags: string[]
  img: string
  thumbnail: string
  cover: string
  alt: string
}

type Toc = {
  id: string
  depth: number
  text: string
}

export type Article = BaseContent &
  Frontmatter & {
    readingTime: Stats['text']
  }

export type PrevNext = Pick<Article, 'title' | 'slug'>

export type Headline = Pick<
  Article,
  'title' | 'description' | 'slug' | 'tags' | 'readingTime' | 'createdAt' | 'img' | 'alt'
>

export type Current = Pick<Article, 'title' | 'slug' | 'img' | 'alt'>
