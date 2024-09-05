import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateBoardDto } from './create-board.dto'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
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
}
