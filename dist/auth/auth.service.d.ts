import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/Login.dto';
import { UserService } from 'src/user/user.service';
export declare class AuthService {
    private readonly jwt;
    private readonly userService;
    constructor(jwt: JwtService, userService: UserService);
    signToken(userId: number, refreshToken: boolean): Promise<string>;
    loginUser(userId: number): Promise<{
        success: boolean;
        accessToken?: string;
        refreshToken?: string;
    }>;
    loginWithEmailAndUsernameAndTel(user: Pick<LoginDto, 'login' | 'password'>): Promise<{
        success: boolean;
        accessToken?: string;
        refreshToken?: string;
    }>;
    checkUser(dto: Pick<LoginDto, 'login' | 'password'>): Promise<number>;
    verifyToken(token: string): Promise<{
        id: number;
        type: 'access' | 'refresh';
    }>;
    rotateToken(token: string, refreshToken: boolean): Promise<{
        success: boolean;
        message: string;
        token: {
            newAccessToken: string;
        };
    }>;
}
