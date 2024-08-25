import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly board: Repository<Board>
  ) {}
  public async create(dto: CreateBoardDto) {
    await this.board.insert({
      title: dto.title,
      category: dto.category,
      location: dto.location,
      des: dto.des,
      userId: dto.userId,
    })
  }

  // public async uploadFile(img: string) {
  //   return await this.board.insert({
  //     img
  //   })
  // }

  findAll() {
    return this.board.find()
  }

  public async findAllUserBoard(id: number) {
    return await this.board.find({
      where: {
        userId: id
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

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
