"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardController = void 0;
const common_1 = require("@nestjs/common");
const board_service_1 = require("./board.service");
const create_board_dto_1 = require("./dto/create-board.dto");
const update_board_dto_1 = require("./dto/update-board.dto");
const platform_express_1 = require("@nestjs/platform-express");
const user_service_1 = require("../user/user.service");
const auth_guard_1 = require("../auth/guard/auth.guard");
const swagger_1 = require("@nestjs/swagger");
const role_guard_1 = require("../auth/guard/role.guard");
const roles_decorator_1 = require("../user/decorator/roles.decorator");
const roles_enum_1 = require("../user/enum/roles.enum");
let BoardController = class BoardController {
    constructor(boardService, userService) {
        this.boardService = boardService;
        this.userService = userService;
    }
    async uploadFile(request, files, dto) {
        const userId = await this.userService.getOneUser(dto.userId);
        if (!userId) {
            throw new common_1.NotFoundException({
                success: false,
                message: `${dto.userId}를 가진 유저를 찾지 못했습니다`
            });
        }
        if (!files) {
            throw new common_1.BadRequestException({
                success: false,
                message: '파일이 업로드되지 않았습니다.'
            });
        }
        console.log(files);
        await this.boardService.create(request, files, dto);
        return {
            success: true,
            body: files.file
        };
    }
    async findAll() {
        const boards = await this.boardService.findAll();
        return {
            success: true,
            body: boards
        };
    }
    async findOne(id) {
        const board = await this.boardService.findOne(id);
        if (!board) {
            throw new common_1.NotFoundException({
                success: false,
                message: `${id}를 가진 게시물을 찾지 못했습니다`
            });
        }
        return {
            success: true,
            body: board
        };
    }
    async findAllUserBoard(id) {
        const userId = await this.userService.getOneUser(id);
        if (!userId) {
            throw new common_1.NotFoundException({
                success: false,
                message: `${id}를 가진 유저를 찾지 못했습니다`
            });
        }
        return await this.boardService.findAllUserBoard(id);
    }
    async findAllCategory(category) {
        const board = await this.boardService.findAllCategory(category);
        return {
            success: true,
            body: board
        };
    }
    async findAllLocation(location) {
        const board = await this.boardService.findAllLocation(location);
        return {
            success: true,
            body: board
        };
    }
    async update(id, updateBoardDto) {
        const board = await this.boardService.findOne(id);
        if (!board) {
            throw new common_1.NotFoundException({
                success: false,
                message: `${id}를 가진 게시물을 찾지 못했습니다`
            });
        }
        await this.boardService.update(id, updateBoardDto);
        return {
            success: true
        };
    }
    async remove(id) {
        const board = await this.boardService.findOne(id);
        if (!board) {
            throw new common_1.NotFoundException({
                success: false,
                message: `${id}를 가진 게시물을 찾지 못했습니다`
            });
        }
        await this.boardService.remove(id);
        return {
            success: true
        };
    }
};
exports.BoardController = BoardController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '파일 업로드 , 게시글 추가',
        description: '데이터베이스에 게사글을 추가합니다.'
    }),
    (0, swagger_1.ApiBody)({ type: create_board_dto_1.CreateBoardDto }),
    (0, common_1.Post)('/uploada'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'file', maxCount: 20 }
    ])),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_board_dto_1.CreateBoardDto]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "uploadFile", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '모든 게시글 조회'
    }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_enum_1.RolesEnum.admin),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '게시글 하나만 조회'
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '유저별 작성한 게시글 조회'
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('user/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "findAllUserBoard", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '카테고리별로 모든 게시글 조회'
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/category/:category'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "findAllCategory", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '장소별로 모든 게시글 조회'
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('/location/:location'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(roles_enum_1.RolesEnum.admin),
    __param(0, (0, common_1.Param)('location')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "findAllLocation", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '게시글 수정'
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_board_dto_1.UpdateBoardDto]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: '게시글 삭제'
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BoardController.prototype, "remove", null);
exports.BoardController = BoardController = __decorate([
    (0, swagger_1.ApiTags)('Board("게시글CRUD")'),
    (0, common_1.Controller)('board'),
    __metadata("design:paramtypes", [board_service_1.BoardService,
        user_service_1.UserService])
], BoardController);
//# sourceMappingURL=board.controller.js.map