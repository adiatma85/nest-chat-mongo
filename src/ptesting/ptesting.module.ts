import { Module } from '@nestjs/common';
import { PtestingController } from './ptesting.controller';
import { PtestingService } from './ptesting.service';
import { ResponseService } from 'src/common/response.util';

@Module({
  controllers: [PtestingController],
  providers: [PtestingService, ResponseService]
})
export class PtestingModule {}
