import { RolesEnum } from '../enum/roles.enum';
export declare const ROLES_KEY = "roles";
export declare const Roles: (...role: RolesEnum[]) => import("@nestjs/common").CustomDecorator<string>;
