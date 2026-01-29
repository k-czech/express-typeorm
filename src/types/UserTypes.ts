import type { User } from '../entities/User.ts'

export type UserDTO = Pick<User, 'firstName' | 'lastName' | 'email'>
