import type { Post } from '../entities/Post.ts'

export type PostDTO = Pick<Post, 'title' | 'content' | 'category'> & {
  userId: number
}
