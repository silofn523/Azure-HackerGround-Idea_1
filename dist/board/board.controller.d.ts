import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { UserService } from 'src/user/user.service';
import { Board } from './entities/board.entity';
export declare class BoardController {
    private readonly boardService;
    private readonly userService;
    constructor(boardService: BoardService, userService: UserService);
    uploadFile(request: any, files: {
        thumbnail: Express.Multer.File;
        file: Express.Multer.File[];
    }, dto: CreateBoardDto): Promise<{
        success: boolean;
        body: Express.Multer.File[];
    }>;
    findAll(): Promise<{
        success: boolean;
        body: Board[];
    }>;
    findOne(id: number): Promise<{
        success: boolean;
        body: Board;
    }>;
    findAllUserBoard(id: number): Promise<Board[]>;
    findAllCategory(category: string): Promise<{
        success: boolean;
        body: Board[];
    }>;
    findAllLocation(location: string): Promise<{
        success: boolean;
        body: Board[];
    }>;
    update(id: number, updateBoardDto: UpdateBoardDto): Promise<{
        success: boolean;
    }>;
    remove(id: number): Promise<{
        success: boolean;
    }>;
}
