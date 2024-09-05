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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBoardDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_board_dto_1 = require("./create-board.dto");
const class_validator_1 = require("class-validator");
class UpdateBoardDto extends (0, swagger_1.PartialType)(create_board_dto_1.CreateBoardDto) {
}
exports.UpdateBoardDto = UpdateBoardDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '카테고리', default: '예시: 낙석, 싱크홀' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBoardDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '장소', default: '예시: 대구 동성로 세븐일레븐 맞은편 건물' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBoardDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: '내용', default: '내용입력' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBoardDto.prototype, "des", void 0);
//# sourceMappingURL=update-board.dto.js.map