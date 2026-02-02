import { In } from 'typeorm'
import { AppDataSource } from '../data-source.ts'
import { Tag } from '../entities/Tag.ts'

export class TagService {
  private tagRepository = AppDataSource.getRepository(Tag)

  async getOrCreateTags(names: string[]): Promise<Tag[]> {
    const existingTags = await this.tagRepository.findBy({ name: In(names) })
    const existingNames = existingTags.map((tag) => tag.name)
    const tagsToCreate = names.filter((name) => !existingNames.includes(name))
    const newTags = this.tagRepository.create(tagsToCreate.map((name) => ({ name })))

    const savedTags = await this.tagRepository.save(newTags)
    return [...existingTags, ...savedTags]
  }
}

export const tagService = new TagService()
