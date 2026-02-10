import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Brak lub nieprawidłowy format tokena' })
  }

  const token = authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Brak tokenu' })
  }

  try {
    const decoded = jwt.verify(token, 'YOUR_SECRET_KEY')

    ;(req as any).user = decoded

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Token wygasł lub jest błędny' })
  }
}
