import { CreateBoardDto } from './create-board.dto';
declare const UpdateBoardDto_base: import("@nestjs/common").Type<Partial<CreateBoardDto>>;
export declare class UpdateBoardDto extends UpdateBoardDto_base {
    readonly category: string;
    readonly location: string;
    readonly des: string;
}
export {};
