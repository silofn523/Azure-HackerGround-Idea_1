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
exports.BoardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const board_entity_1 = require("./entities/board.entity");
const typeorm_2 = require("typeorm");
let BoardService = class BoardService {
    constructor(board) {
        this.board = board;
    }
    async create(req, files, dto) {
        const thumbnailPath = files.thumbnail ? files.thumbnail[0].path : null;
        const filePaths = files.file ? files.file.map((file) => file.path).join(',') : null;
        await this.board.insert({
            category: dto.category,
            location: dto.location,
            des: dto.des,
            userId: dto.userId,
            img: filePaths
        });
    }
    async findAll() {
        return await this.board.find();
    }
    async findAllUserBoard(id) {
        return await this.board.find({
            where: {
                userId: id
            }
        });
    }
    async findAllCategory(category) {
        return await this.board.find({
            where: {
                category
            }
        });
    }
    async findAllLocation(location) {
        return await this.board.find({
            where: {
                location
            }
        });
    }
    async findOne(id) {
        return await this.board.findOne({
            where: {
                id
            }
        });
    }
    async update(id, updateBoardDto) {
        await this.board.update({ id }, updateBoardDto);
    }
    async remove(id) {
        await this.board.delete(id);
    }
};
exports.BoardService = BoardService;
exports.BoardService = BoardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(board_entity_1.Board)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BoardService);
//# sourceMappingURL=board.service.js.map