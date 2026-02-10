import { Router } from 'express'
import { userController } from '../controllers/UserController.ts'

const router: Router = Router()

router.post('/login', (req, res) => {
  userController.login(req, res)
})

router.get('/', (req, res) => {
  userController.findAll(req, res)
})
router.get('/:id', (req, res) => {
  userController.findOne(req, res)
})
router.post('/', (req, res) => {
  userController.create(req, res)
})
router.put('/:id', (req, res) => {
  userController.update(req, res)
})
router.delete('/:id', (req, res) => {
  userController.delete(req, res)
})

export default router
