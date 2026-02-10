import { userService } from '../services/UserService.ts'
import type { Request, Response } from 'express'
import { validatePassword } from '../utils/validatePassword.ts'

class UserController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const result = await userService.login(email, password)

      if (!result) {
        return res.status(401).json({ message: 'Błędne dane logowania' })
      }

      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ message: 'Błąd serwera' })
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const users = await userService.findAll()
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json({ message: 'Błąd serwera' })
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params

      if (isNaN(Number(id))) {
        return res.status(400).json({ message: 'Nieprawidłowy format id' })
      }

      const user = await userService.findOne(Number(id))

      if (!user) {
        return res.status(404).json({ message: 'Użytkownik nie istnieje' })
      }

      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ message: 'Błąd serwera' })
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { firstName, lastName, email, password } = req.body
      console.log('Otrzymane hasło:', `"${password}"`) // Cudzysłów pomoże nam dostrzec spacje
      console.log('Długość hasła:', password.length)

      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'Imię, nazwisko, email i hasło są wymagane' })
      }

      if (!validatePassword(password)) {
        return res.status(400).json({
          message:
            'Hasło musi mieć co najmniej 8 znaków, jedną dużą literę, jedną małą literę, jedną cyfrę i jeden specjalny znak'
        })
      }

      if (!email.includes('@')) {
        return res.status(400).json({ message: 'Email musi być poprawny' })
      }

      const user = await userService.create({ firstName, lastName, email, password })
      res.status(201).json(user)
    } catch (error) {
      res.status(500).json({ message: 'Błąd serwera' })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { firstName, lastName, email } = req.body

      if (isNaN(Number(id))) {
        return res.status(400).json({ message: 'Nieprawidłowy format id' })
      }

      if (!firstName || !lastName || !email) {
        return res.status(400).json({ message: 'Imię, nazwisko i email są wymagane' })
      }

      if (!email.includes('@')) {
        return res.status(400).json({ message: 'Email musi być poprawny' })
      }

      const user = await userService.update(Number(id), { firstName, lastName, email })

      if (!user) {
        return res.status(404).json({ message: 'Użytkownik nie istnieje' })
      }
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ message: 'Błąd serwera' })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params

      if (isNaN(Number(id))) {
        return res.status(400).json({ message: 'Nieprawidłowy format id' })
      }

      const user = await userService.delete(Number(id))

      if (!user) {
        return res.status(404).json({ message: 'Użytkownik nie istnieje' })
      }

      res.status(200).json({ message: 'Użytkownik usunięty' })
    } catch (error) {
      res.status(500).json({ message: 'Błąd serwera' })
    }
  }
}

export const userController = new UserController()
