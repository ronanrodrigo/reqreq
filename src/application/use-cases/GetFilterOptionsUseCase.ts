import { SDKRepository } from '../../domain/repositories/SDKRepository';
import { SDKFilterService } from '../../domain/services/SDKFilterService';

export class GetFilterOptionsUseCase {
  constructor(
    private sdkRepository: SDKRepository,
    private filterService: SDKFilterService
  ) {}

  async execute(): Promise<{ tags: string[]; languages: string[] }> {
    const allSDKs = await this.sdkRepository.findAll();
    
    return {
      tags: this.filterService.getAllTags(allSDKs),
      languages: this.filterService.getAllLanguages(allSDKs)
    };
  }
}
