import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable
} from 'typeorm'
import { User } from './User.ts'
import { Tag } from './Tag.ts'

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

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  user!: User

  @ManyToMany(() => Tag, (tag) => tag.posts, {
    cascade: true
  })
  @JoinTable()
  tags!: Tag[]

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
