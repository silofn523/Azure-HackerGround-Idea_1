import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common'
import { BoardService } from './board.service'
import { CreateBoardDto } from './dto/create-board.dto'
import { UpdateBoardDto } from './dto/update-board.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { UserService } from 'src/user/user.service'
import { Board } from './entities/board.entity'

@Controller('board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly userService: UserService
  ) {}

  // @Post('/uploada')
  // @UseInterceptors(FileInterceptor('file'))
  // @UsePipes(ValidationPipe)
  // public async uploadFile(
  //   @UploadedFile() file: Express.Multer.File
  // ): Promise<{ success: boolean }> {
  //   if (!file) {
  //     throw new BadRequestException({
  //       success: false,
  //       message: '파일이 업로드되지 않았습니다.'
  //     })
  //   }
  //   console.log(file)
  //   await this.boardService.uploadFile(file.filename)

  //   return {
  //     success: true
  //   }
  // }

  @Post()
  public async createBoard(@Body() dto: CreateBoardDto): Promise<{ success: boolean }> {
    const userId = await this.userService.getOneUser(dto.userId)

    if (!userId) {
      throw new NotFoundException({
        success: false,
        message: `${dto.userId}를 가진 유저를 찾지 못했습니다`
      })
    }
    await this.boardService.create(dto)

    return {
      success: true
    }
  }

  @Get()
  findAll() {
    return this.boardService.findAll()
  }

  @Get(':id')
  public async findOne(@Param('id') id: number): Promise<{ success: boolean; body: Board}> {
    const board = await this.boardService.findOne(id)

    if (!board) {
      throw new NotFoundException({
        success: false,
        message: `${id}를 가진 게시물을 찾지 못했습니다`
      })
    }

    return {
      success: true,
      body: board
    }
  }

  @Get('user/:id')
  public async findAllUserBoard(@Param('id') id: number) {
    const userId = await this.userService.getOneUser(id) 

    if (!userId) {
      throw new NotFoundException({
        success: false,
        message: `${id}를 가진 유저를 찾지 못했습니다`
      })
    }

    return await this.boardService.findAllUserBoard(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(+id, updateBoardDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardService.remove(+id)
  }
}
