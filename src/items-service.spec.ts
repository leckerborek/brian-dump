import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items-service';

describe('ItemsService', () => {
  let provider: ItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemsService],
    }).compile();

    provider = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
