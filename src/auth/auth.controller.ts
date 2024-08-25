import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/Login.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('Auth("로그인 & 인증관리")')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '로그인'
  })
  @Post('login')
  public async loginUser(@Body() dto: LoginDto): Promise<{
    success: boolean
    accessToken?: string
    refreshToken?: string
  }> {
    return await this.authService.loginWithEmailAndUsernameAndTel(dto)
  }
}
