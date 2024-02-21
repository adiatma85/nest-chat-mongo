import { Test, TestingModule } from '@nestjs/testing';
import { PtestingController } from './ptesting.controller';

describe('PtestingController', () => {
  let controller: PtestingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PtestingController],
    }).compile();

    controller = module.get<PtestingController>(PtestingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
