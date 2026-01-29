import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from './User.ts'

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar' })
  title!: string

  @Column({ type: 'text' })
  content!: string

  @Column({ type: 'varchar' })
  category!: string

  @ManyToOne(() => User, (user) => user.posts)
  user!: User

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
