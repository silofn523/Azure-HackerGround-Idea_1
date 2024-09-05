import { BaseEntity } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
export declare class Board extends BaseEntity {
    readonly id: number;
    readonly category: string;
    readonly location: string;
    img?: string | null;
    readonly des: string;
    readonly date: Date;
    readonly userId: number;
    readonly user: User;
}
