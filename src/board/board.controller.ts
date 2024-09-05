import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ValidationPipe,
  UseInterceptors,
  UsePipes,
  BadRequestException,
  Req,
  UploadedFiles,
  UseGuards
} from '@nestjs/common'
import { BoardService } from './board.service'
import { CreateBoardDto } from './dto/create-board.dto'
import { UpdateBoardDto } from './dto/update-board.dto'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { UserService } from 'src/user/user.service'
import { Board } from './entities/board.entity'
import { AuthGuard } from 'src/auth/guard/auth.guard'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { RolesGuard } from 'src/auth/guard/role.guard'
import { Roles } from 'src/user/decorator/roles.decorator'
import { RolesEnum } from 'src/user/enum/roles.enum'

@ApiTags('Board("게시글CRUD")')
@Controller('board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly userService: UserService
  ) {}

  @ApiOperation({
    summary: '파일 업로드 , 게시글 추가',
    description: '데이터베이스에 게사글을 추가합니다.'
  })
  @ApiBody({ type: CreateBoardDto })
  @Post('/uploada')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'file', maxCount: 20 }
    ])
  )
  @UsePipes(ValidationPipe)
  public async uploadFile(
    @Req() request,
    @UploadedFiles()
    files: { thumbnail: Express.Multer.File; file: Express.Multer.File[] },
    @Body() dto: CreateBoardDto
  ): Promise<{ success: boolean; body: Express.Multer.File[] }> {
    const userId = await this.userService.getOneUser(dto.userId)

    if (!userId) {
      throw new NotFoundException({
        success: false,
        message: `${dto.userId}를 가진 유저를 찾지 못했습니다`
      })
    }

    if (!files) {
      throw new BadRequestException({
        success: false,
        message: '파일이 업로드되지 않았습니다.'
      })
    }
    console.log(files)
    await this.boardService.create(request, files, dto)

    return {
      success: true,
      body: files.file
    }
  }

  @ApiOperation({
    summary: '모든 게시글 조회'
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.admin)
  @ApiBearerAuth()
  @Get()
  public async findAll(): Promise<{ success: boolean; body: Board[] }> {
    const boards = await this.boardService.findAll()

    return {
      success: true,
      body: boards
    }
  }

  @ApiOperation({
    summary: '게시글 하나만 조회'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  public async findOne(@Param('id') id: number): Promise<{ success: boolean; body: Board }> {
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

  @ApiOperation({
    summary: '유저별 작성한 게시글 조회'
  })
  @ApiBearerAuth()
  @Get('user/:id')
  @UseGuards(AuthGuard)
  public async findAllUserBoard(@Param('id') id: number): Promise<Board[]> {
    const userId = await this.userService.getOneUser(id)

    if (!userId) {
      throw new NotFoundException({
        success: false,
        message: `${id}를 가진 유저를 찾지 못했습니다`
      })
    }

    return await this.boardService.findAllUserBoard(id)
  }

  @ApiOperation({
    summary: '카테고리별로 모든 게시글 조회'
  })
  @ApiBearerAuth()
  @Get('/category/:category')
  @UseGuards(AuthGuard)
  public async findAllCategory(
    @Param('category') category: string
  ): Promise<{ success: boolean; body: Board[] }> {
    const board = await this.boardService.findAllCategory(category)

    return {
      success: true,
      body: board
    }
  }

  @ApiOperation({
    summary: '장소별로 모든 게시글 조회'
  })
  @ApiBearerAuth()
  @Get('/location/:location')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.admin)
  public async findAllLocation(
    @Param('location') location: string
  ): Promise<{ success: boolean; body: Board[] }> {
    const board = await this.boardService.findAllLocation(location)

    return {
      success: true,
      body: board
    }
  }

  @ApiOperation({
    summary: '게시글 수정'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  public async update(
    @Param('id') id: number,
    @Body(ValidationPipe) updateBoardDto: UpdateBoardDto
  ): Promise<{ success: boolean }> {
    const board = await this.boardService.findOne(id)

    if (!board) {
      throw new NotFoundException({
        success: false,
        message: `${id}를 가진 게시물을 찾지 못했습니다`
      })
    }
    await this.boardService.update(id, updateBoardDto)

    return {
      success: true
    }
  }

  @ApiOperation({
    summary: '게시글 삭제'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  public async remove(@Param('id') id: number): Promise<{ success: boolean }> {
    const board = await this.boardService.findOne(id)

    if (!board) {
      throw new NotFoundException({
        success: false,
        message: `${id}를 가진 게시물을 찾지 못했습니다`
      })
    }
    await this.boardService.remove(id)

    return {
      success: true
    }
  }
}
