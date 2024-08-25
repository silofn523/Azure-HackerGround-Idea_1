import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateBoardDto {
  @ApiProperty({ description: '제목', default: '제목입력' })
  @IsNotEmpty()
  @IsString()
  public readonly title: string

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
  public readonly userId: number
}
