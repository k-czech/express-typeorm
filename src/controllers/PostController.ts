import { postService } from '../services/PostService.ts'
import type { Request, Response } from 'express'
import type { PostDTO } from '../types/PostTypes.ts'
import { userService } from '../services/UserService.ts'

class PostController {
  async create(req: Request<{}, {}, PostDTO>, res: Response) {
    try {
      const { title, content, category, userId, tagNames } = req.body

      if (!title || !content || !category || !userId) {
        return res.status(400).json({ message: 'Wszystkie pola są wymagane' })
      }

      const user = await userService.findOne(userId)

      if (!user) {
        return res.status(404).json({ message: 'Użytkownik nie został znaleziony' })
      }

      if (typeof userId !== 'number') {
        return res.status(400).json({ message: 'Id użytkownika musi być liczbą' })
      }

      const post = await postService.create({ title, content, category, userId, tagNames })
      res.status(201).json(post)
    } catch (error) {
      res.status(500).json({ message: 'Błąd serwera' })
    }
  }

  async findByCategory(req: Request, res: Response) {
    try {
      const category = req.query.category as string

      if (!category) {
        const allPosts = await postService.findAll()
        return res.status(200).json(allPosts)
      }

      const posts = await postService.findByCategory(category)
      res.status(200).json(posts)
    } catch (error) {
      res.status(500).json({ message: 'Błąd serwera' })
    }
  }
}

export default new PostController()
