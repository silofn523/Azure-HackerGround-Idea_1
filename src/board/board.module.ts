import { Module } from '@nestjs/common'
import { BoardService } from './board.service'
import { BoardController } from './board.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Board } from './entities/board.entity'
import { User } from 'src/user/entities/user.entity'
import { UserModule } from 'src/user/user.module'
import { MulterModule } from '@nestjs/platform-express'
import { extname } from 'path'
import { diskStorage } from 'multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, User]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads', // 파일 저장 경로
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
    UserModule
  ],
  controllers: [BoardController],
  providers: [BoardService]
})
export class BoardModule {}
