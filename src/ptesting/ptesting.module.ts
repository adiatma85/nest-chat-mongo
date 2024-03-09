import { Module } from '@nestjs/common';
import { PtestingController } from './ptesting.controller';
import { PtestingService } from './ptesting.service';

@Module({
  controllers: [PtestingController],
  providers: [
    PtestingService
  ]
})
export class PtestingModule { }
