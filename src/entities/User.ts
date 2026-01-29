import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Post } from './Post.ts'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar' })
  firstName!: string

  @Column({ type: 'varchar' })
  lastName!: string

  @Column({ type: 'varchar', unique: true })
  email!: string

  @OneToMany(() => Post, (post) => post.user)
  posts!: Post[]
}
