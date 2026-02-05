import { Router } from 'express'
import postController from '../controllers/PostController.ts'

const router: Router = Router()

router.post('/', (req, res) => {
  postController.create(req, res)
})

router.get('/', (req, res) => {
  postController.findByCategory(req, res)
})

router.patch('/:id/tags', (req, res) => {
  postController.updatePostTags(req, res)
})

export default router
