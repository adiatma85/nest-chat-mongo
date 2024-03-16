import { Module } from '@nestjs/common';
import { PtestingController } from './ptesting.controller';
import { PtestingService } from './ptesting.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user..schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [PtestingController],
  providers: [
    PtestingService
  ]
})
export class PtestingModule { }
