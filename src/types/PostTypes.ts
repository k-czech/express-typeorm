import type { Post } from '../entities/Post.ts'
import type { Tag } from '../entities/Tag.ts'

export type PostDTO = Pick<Post, 'title' | 'content' | 'category'> & {
  tagNames: string[]
  userId: number
}
