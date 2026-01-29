import { AppDataSource } from '../data-source.ts'
import { Post } from '../entities/Post.ts'
import { User } from '../entities/User.ts'
import type { PostDTO } from '../types/PostTypes.ts'

export class PostService {
  private postRepository = AppDataSource.getRepository(Post)
  private userRepository = AppDataSource.getRepository(User)

  async create({ title, content, category, userId }: PostDTO): Promise<Post> {
    const user = await this.userRepository.findOneBy({ id: userId })
    if (!user) throw new Error('Użytkownik nie został znaleziony')

    const post = this.postRepository.create({ title, content, category, user })
    return await this.postRepository.save(post)
  }
}

export const postService = new PostService()
