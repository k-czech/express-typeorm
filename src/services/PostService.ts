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

  async updatePostTags(postId: number, tagNames: string[]): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id: postId }, relations: ['tags'] })
    if (!post) throw new Error('Post nie został znaleziony')

    const newTags = await tagService.getOrCreateTags(tagNames)
    const allTags = [...post.tags, ...newTags]
    post.tags = allTags.filter(
      (tag, index, self) => index === self.findIndex((t) => t.id === tag.id)
    )
    return await this.postRepository.save(post)
  }
}

export const postService = new PostService()
