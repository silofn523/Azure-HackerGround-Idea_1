import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
export declare class BoardService {
    private readonly board;
    constructor(board: Repository<Board>);
    create(req: Request, files: {
        thumbnail: Express.Multer.File;
        file: Express.Multer.File[];
    }, dto: CreateBoardDto): Promise<void>;
    findAll(): Promise<Board[]>;
    findAllUserBoard(id: number): Promise<Board[]>;
    findAllCategory(category: string): Promise<Board[]>;
    findAllLocation(location: string): Promise<Board[]>;
    findOne(id: number): Promise<Board>;
    update(id: number, updateBoardDto: UpdateBoardDto): Promise<void>;
    remove(id: number): Promise<void>;
}
