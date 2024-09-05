import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    readonly username: string;
    readonly password: string;
    readonly email: string;
    readonly tel: string;
    readonly fullName: string;
}
export {};
