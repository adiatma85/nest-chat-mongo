import { Test, TestingModule } from '@nestjs/testing';
import { PtestingService } from './ptesting.service';

describe('PtestingService', () => {
  let service: PtestingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PtestingService],
    }).compile();

    service = module.get<PtestingService>(PtestingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
