import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateBoardDto {
  @ApiProperty({ description: '카테고리', default: '예시: 낙석, 싱크홀' })
  @IsNotEmpty()
  @IsString()
  public readonly category: string // 카테고리

  @ApiProperty({ description: '장소', default: '예시: 대구 동성로 세븐일레븐 맞은편 건물' })
  @IsNotEmpty()
  @IsString()
  public readonly location: string

  @ApiProperty({ description: '내용', default: '내용입력' })
  @IsNotEmpty()
  @IsString()
  public readonly des: string

  @ApiProperty({ description: '작성자ID', default: '1' })
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10)) // 이걸 설정 해 줘야 포스트맨애서 숫자타입으로 인식
  public readonly userId: number
}
