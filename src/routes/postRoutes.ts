import { Router } from 'express'
import postController from '../controllers/PostController.ts'

const router: Router = Router()

router.post('/', (req, res) => {
  postController.create(req, res)
})

export default router
