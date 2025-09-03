import { VersionAnalysisService, IVersionAnalysisService } from '../../domain/services/VersionAnalysisService';
import { ModalService, IModalService } from '../services/ModalService';
import { PlatformDisplayService, IPlatformDisplayService } from '../services/PlatformDisplayService';

export interface IServiceFactory {
  createVersionAnalysisService(): IVersionAnalysisService;
  createModalService(): IModalService;
  createPlatformDisplayService(): IPlatformDisplayService;
}

export class ServiceFactory implements IServiceFactory {
  createVersionAnalysisService(): IVersionAnalysisService {
    return new VersionAnalysisService();
  }

  createModalService(): IModalService {
    return new ModalService();
  }

  createPlatformDisplayService(): IPlatformDisplayService {
    return new PlatformDisplayService();
  }
}

// Singleton instance for the application
export const serviceFactory = new ServiceFactory();
