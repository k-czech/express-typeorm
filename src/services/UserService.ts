import { AppDataSource } from '../data-source.ts'
import { User } from '../entities/User.ts'
import type { UserDTO } from '../types/UserTypes.ts'
import bcrypt from 'bcrypt'

export class UserService {
  private userRepository = AppDataSource.getRepository(User)

  async create(user: UserDTO): Promise<User> {
    const { password, email, ...rest } = user
    const existingUser = await this.findByEmail(email)
    if (existingUser) throw new Error('Użytkownik o podanym email już istnieje')

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = this.userRepository.create({ ...rest, email, password: hashedPassword })
    return this.userRepository.save(newUser)
  }

  async findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id }, relations: ['posts'] })
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } })
  }

  async update(
    id: number,
    user: Omit<UserDTO, 'password'>
  ): Promise<Omit<UserDTO, 'password'> | null> {
    const updatedUser = await this.userRepository.update(id, user)
    return updatedUser.affected ? user : null
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.userRepository.delete(id)
    return result.affected ? true : false
  }
}

export const userService = new UserService()
