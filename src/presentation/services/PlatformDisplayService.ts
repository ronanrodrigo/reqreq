import { PlatformVersion } from '../../domain/value-objects/Platform';

export interface IPlatformDisplayService {
  getPlatformBadgeClasses(platform: string): string;
  formatPlatformDisplay(platformVersion: PlatformVersion): string;
}

export class PlatformDisplayService implements IPlatformDisplayService {
  getPlatformBadgeClasses(platform: string): string {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    
    switch (platform) {
      case 'iOS':
        return `${baseClasses} platform-ios`;
      case 'Android':
        return `${baseClasses} platform-android`;
      default:
        return `${baseClasses} platform-default`;
    }
  }

  formatPlatformDisplay(platformVersion: PlatformVersion): string {
    return platformVersion.toString();
  }
}
