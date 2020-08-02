export interface Article {
  title: string
  description: string
  slug: string
}

export type PrevNext = Pick<Article, 'title' | 'slug'>

export type Headline = Pick<Article, 'title' | 'description' | 'slug'>
