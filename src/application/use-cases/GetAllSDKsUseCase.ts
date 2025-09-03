import { SDK } from '../../domain/entities/SDK';
import { SDKRepository } from '../../domain/repositories/SDKRepository';

export class GetAllSDKsUseCase {
  constructor(private sdkRepository: SDKRepository) {}

  async execute(): Promise<SDK[]> {
    return await this.sdkRepository.findAll();
  }
}
