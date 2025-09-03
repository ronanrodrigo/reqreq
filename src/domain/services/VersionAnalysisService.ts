import { SDK } from '../entities/SDK';
import { PlatformVersion } from '../value-objects/Platform';

export interface IVersionAnalysisService {
  getCurrentRequirements(sdk: SDK, versionIndex: number): PlatformVersion[];
  getVersionStatus(sdk: SDK, versionIndex: number): string;
  getAvailablePlatforms(sdk: SDK): string[];
}

export class VersionAnalysisService implements IVersionAnalysisService {
  getCurrentRequirements(sdk: SDK, versionIndex: number): PlatformVersion[] {
    if (!sdk.versions || !sdk.versions[versionIndex]) {
      return [];
    }
    
    // If this version has requirements, use them
    if (sdk.versions[versionIndex].hasRequirements()) {
      return sdk.versions[versionIndex].platformVersions;
    }
    
    // Otherwise, find the most recent version with requirements
    for (let i = versionIndex - 1; i >= 0; i--) {
      if (sdk.versions[i] && sdk.versions[i].hasRequirements()) {
        return sdk.versions[i].platformVersions;
      }
    }
    
    return [];
  }

  getVersionStatus(sdk: SDK, versionIndex: number): string {
    if (!sdk.versions || !sdk.versions[versionIndex]) {
      return 'No data';
    }

    const currentVersion = sdk.versions[versionIndex];
    const hasDirectRequirements = currentVersion.hasRequirements();
    
    if (versionIndex === 0) {
      // First version - if it has requirements, they're new
      return hasDirectRequirements ? 'Initial requirements' : 'No requirements';
    }

    if (!hasDirectRequirements) {
      return 'Same as previous';
    }

    // This version has requirements - check if they changed from previous
    const currentRequirements = currentVersion.platformVersions || [];
    const previousRequirements = this.getCurrentRequirements(sdk, versionIndex - 1);

    // Compare requirements
    if (previousRequirements.length === 0) {
      return 'Requirements added';
    }

    // Check if requirements are different
    const requirementsChanged = currentRequirements.some(current => {
      const prevReq = previousRequirements.find(prev => prev && prev.platform === current.platform);
      return !prevReq || prevReq.version !== current.version;
    }) || previousRequirements.some(prev => {
      const currReq = currentRequirements.find(curr => curr && curr.platform === prev.platform);
      return !currReq;
    });

    return requirementsChanged ? 'Requirements changed' : 'Same as previous';
  }

  getAvailablePlatforms(sdk: SDK): string[] {
    return sdk.getAvailablePlatforms();
  }
}
