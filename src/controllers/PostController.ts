import { postService } from '../services/PostService.ts'
import type { Request, Response } from 'express'
import type { PostDTO } from '../types/PostTypes.ts'
import { userService } from '../services/UserService.ts'

class PostController {
  async create(req: Request<{}, {}, PostDTO>, res: Response) {
    try {
      const { title, content, category, userId } = req.body

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

      const post = await postService.create({ title, content, category, userId })
      res.status(201).json(post)
    } catch (error) {
      res.status(500).json({ message: 'Błąd serwera' })
    }
  }
}

export default new PostController()
