import { GetAllSDKsUseCase } from '../../../application/use-cases/GetAllSDKsUseCase';
import { SDKRepository } from '../../../domain/repositories/SDKRepository';
import { SDK } from '../../../domain/entities/SDK';
import { SDKVersion } from '../../../domain/entities/SDKVersion';

// Mock repository
class MockSDKRepository implements SDKRepository {
  private sdks: SDK[] = [];

  constructor(sdks: SDK[] = []) {
    this.sdks = sdks;
  }

  async findAll(): Promise<SDK[]> {
    return Promise.resolve(this.sdks);
  }

  async findByTag(tag: string): Promise<SDK[]> {
    return Promise.resolve(this.sdks.filter(sdk => sdk.hasTag(tag)));
  }

  async findByLanguage(language: string): Promise<SDK[]> {
    return Promise.resolve(this.sdks.filter(sdk => sdk.hasLanguage(language)));
  }

  async findByName(name: string): Promise<SDK | null> {
    const found = this.sdks.find(sdk => sdk.name.value === name);
    return Promise.resolve(found || null);
  }
}

describe('GetAllSDKsUseCase', () => {
  let useCase: GetAllSDKsUseCase;
  let mockRepository: MockSDKRepository;

  const createMockSDKs = (): SDK[] => [
    SDK.create('React Native', ['framework'], 'JavaScript', [
      SDKVersion.create('0.70.0', '2023-01-01')
    ]),
    SDK.create('Flutter', ['framework', 'ui'], 'Dart', [
      SDKVersion.create('3.0.0', '2023-02-01')
    ]),
    SDK.create('Expo', ['framework'], 'JavaScript', [
      SDKVersion.create('48.0.0', '2023-03-01')
    ])
  ];

  beforeEach(() => {
    const mockSDKs = createMockSDKs();
    mockRepository = new MockSDKRepository(mockSDKs);
    useCase = new GetAllSDKsUseCase(mockRepository);
  });

  describe('execute', () => {
    it('should return all SDKs from repository', async () => {
      const result = await useCase.execute();

      expect(result).toHaveLength(3);
      expect(result[0].name.value).toBe('React Native');
      expect(result[1].name.value).toBe('Flutter');
      expect(result[2].name.value).toBe('Expo');
    });

    it('should return empty array when no SDKs exist', async () => {
      const emptyRepository = new MockSDKRepository([]);
      const emptyUseCase = new GetAllSDKsUseCase(emptyRepository);

      const result = await emptyUseCase.execute();

      expect(result).toEqual([]);
    });

    it('should handle repository errors', async () => {
      const errorRepository: SDKRepository = {
        findAll: jest.fn().mockRejectedValue(new Error('Repository error')),
        findByTag: jest.fn(),
        findByLanguage: jest.fn(),
        findByName: jest.fn()
      };
      const errorUseCase = new GetAllSDKsUseCase(errorRepository);

      await expect(errorUseCase.execute()).rejects.toThrow('Repository error');
    });
  });
});
