import { AppDataSource } from '../data-source.ts'
import { Post } from '../entities/Post.ts'
import { User } from '../entities/User.ts'
import type { PostDTO } from '../types/PostTypes.ts'
import { tagService } from './TagService.ts'

export class PostService {
  private postRepository = AppDataSource.getRepository(Post)
  private userRepository = AppDataSource.getRepository(User)

  async create({ title, content, category, userId, tagNames }: PostDTO): Promise<Post> {
    const user = await this.userRepository.findOneBy({ id: userId })
    if (!user) throw new Error('Użytkownik nie został znaleziony')

    const tags = await tagService.getOrCreateTags(tagNames)

    const post = this.postRepository.create({ title, content, category, user, tags })
    return await this.postRepository.save(post)
  }

  async findByCategory(category: string): Promise<Post[]> {
    return this.postRepository.find({ where: { category }, relations: ['user', 'tags'] })
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.find({ relations: ['user', 'tags'] })
  }
}

export const postService = new PostService()
