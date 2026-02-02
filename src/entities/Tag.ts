import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm'
import { Post } from './Post.ts'

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar', unique: true })
  name!: string

  @ManyToMany(() => Post, (post) => post.tags)
  posts!: Post[]
}
