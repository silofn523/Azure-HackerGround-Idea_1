import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from 'src/user/decorator/roles.decorator'
import { RolesEnum } from 'src/user/enum/roles.enum'
import { UserService } from 'src/user/user.service'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RolesEnum[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (!requiredRoles) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const userId = request.user?.id

    if (!userId) {
      throw new ForbiddenException({
        success: false,
        message: '사용자 정보가 없습니다'
      })
    }

    const user = await this.userService.getOneUser(userId)

    if (!user) {
      throw new ForbiddenException({
        success: false,
        message: '사용자를 찾을 수 없습니다'
      })
    }

    const hasRole = requiredRoles.some((role) => user.role === role)

    if (!hasRole) {
      throw new ForbiddenException({
        success: false,
        message: '권한이 없습니다'
      })
    }

    return true
  }
}
