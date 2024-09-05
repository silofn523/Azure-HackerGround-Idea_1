import { Board } from 'src/board/entities/board.entity';
import { BaseEntity } from 'typeorm';
import { RolesEnum } from '../enum/roles.enum';
export declare class User extends BaseEntity {
    readonly id: number;
    readonly username: string;
    readonly password: string;
    readonly email: string;
    readonly tel: string;
    readonly fullName: string;
    readonly role: RolesEnum;
    readonly board: Board[];
}
