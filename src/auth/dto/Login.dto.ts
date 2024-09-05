import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator'

export class LoginDto {
  @ApiProperty({
    description: '이메일 혹은 전화번호 혹은 아이디',
    default: '예시: 01012345678 || test@gmail.com || username'
  })
  @IsNotEmpty()
  @IsString()
  readonly login: string

  @ApiProperty({ description: '비밀번호', default: 'qazwsx1234' })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @IsNotEmpty()
  @Matches(/^[a-z A-Z 0-9 !? @]*$/, {
    message: 'password only accepts english and number and !? and @'
  })
  readonly password: string
}
