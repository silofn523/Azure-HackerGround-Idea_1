import { Injectable } from '@nestjs/common'
import { CreateBoardDto } from './dto/create-board.dto'
import { UpdateBoardDto } from './dto/update-board.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Board } from './entities/board.entity'
import { Repository } from 'typeorm'
import { Request } from 'express'

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly board: Repository<Board>
  ) {}

  public async create(
    req: Request,
    files: { thumbnail: Express.Multer.File; file: Express.Multer.File[] },
    dto: CreateBoardDto
  ): Promise<void> {
    const thumbnailPath = files.thumbnail ? files.thumbnail[0].path : null
    const filePaths = files.file ? files.file.map((file) => file.path).join(',') : null

    await this.board.insert({
      category: dto.category,
      location: dto.location,
      des: dto.des,
      userId: dto.userId,
      img: filePaths
    })
  }

  public async findAll(): Promise<Board[]>{
    return await this.board.find()
  }

  public async findAllUserBoard(id: number): Promise<Board[]> {
    return await this.board.find({
      where: {
        userId: id
      }
    })
  }

  public async findAllCategory(category: string): Promise<Board[]> {
    return await this.board.find({
      where: {
        category
      }
    })
  }

  public async findAllLocation(location: string): Promise<Board[]> {
    return await this.board.find({
      where: {
        location
      }
    })
  }

  public async findOne(id: number): Promise<Board> {
    return await this.board.findOne({
      where: {
        id
      }
    })
  }

  public async update(id: number, updateBoardDto: UpdateBoardDto): Promise<void> {
    await this.board.update({ id }, updateBoardDto)
  }

  public async remove(id: number): Promise<void> {
    await this.board.delete(id)
  }
}
