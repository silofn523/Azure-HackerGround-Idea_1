import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength
} from 'class-validator'
import { Board } from 'src/board/entities/board.entity'
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { RolesEnum } from '../enum/roles.enum'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public readonly id: number

  @Column({ unique: true })
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  @IsNotEmpty()
  public readonly username: string

  @Column()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^[a-z A-Z 0-9 !? @]*$/, {
    message: 'password only accepts english and number and !? and @'
  })
  public readonly password: string

  @Column({ unique: true })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'email :('
  })
  public readonly email: string

  @Column({ unique: true })
  @IsNotEmpty()
  @IsPhoneNumber('KR') // 'KR'은 대한민국의 국가 코드
  @Matches(/^010\d{7,8}$/, {
    message: 'Phone number must start with 010 and contain 10 or 11 digits'
  })
  public readonly tel: string

  @Column()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  @IsNotEmpty()
  public readonly fullName: string // 이름

  @Column()
  @IsString()
  readonly role: RolesEnum

  @OneToMany(() => Board, (board) => board.user, { eager: true })
  public readonly board: Board[]
}
