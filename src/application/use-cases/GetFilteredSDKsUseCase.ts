import { SDK } from '../../domain/entities/SDK';
import { SDKRepository } from '../../domain/repositories/SDKRepository';
import { SDKFilterService, FilterCriteria } from '../../domain/services/SDKFilterService';

export class GetFilteredSDKsUseCase {
  constructor(
    private sdkRepository: SDKRepository,
    private filterService: SDKFilterService
  ) {}

  async execute(criteria: FilterCriteria): Promise<SDK[]> {
    const allSDKs = await this.sdkRepository.findAll();
    return this.filterService.filterSDKs(allSDKs, criteria);
  }
}
