import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  CreateDateColumn
} from 'typeorm'
import { IsNotEmpty, IsNumber, IsString, Length, MaxLength, MinLength } from 'class-validator'
import { User } from 'src/user/entities/user.entity'

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  public readonly id: number

  @Column()
  @IsNotEmpty()
  @IsString()
  public readonly category: string // 카테고리

  @Column()
  @IsNotEmpty()
  @IsString()
  public readonly location: string // 장소

  @Column({ nullable: true })
  @IsNotEmpty()
  @IsString()
  public img?: string | null

  @Column()
  @IsNotEmpty()
  @IsString()
  @Length(1, 1000, {
    message: '최소 입력은 1, 최대 입력은 1000입니다'
  })
  public readonly des: string

  @Column()
  @CreateDateColumn({ type: 'timestamp' })
  public readonly date: Date

  @Column()
  @IsNumber()
  @IsNotEmpty()
  public readonly userId: number

  @ManyToOne(() => User, (user) => user.board)
  public readonly user: User
}
