import { useState, useEffect } from 'react';
import { SDK } from '../../domain/entities/SDK';
import { PlatformVersion } from '../../domain/value-objects/Platform';
import { IVersionAnalysisService } from '../../domain/services/VersionAnalysisService';
import { IModalService } from '../services/ModalService';

export interface ISDKCardHook {
  showAllVersions: boolean;
  toggleModal: () => void;
  getCurrentRequirements: (versionIndex: number) => PlatformVersion[];
  getVersionStatus: (versionIndex: number) => string;
  getAvailablePlatforms: () => string[];
}

export function useSDKCard(
  sdk: SDK,
  versionAnalysisService: IVersionAnalysisService,
  modalService: IModalService
): ISDKCardHook {
  const [showAllVersions, setShowAllVersions] = useState(false);
  
  // Handle modal state and keyboard events
  useEffect(() => {
    if (showAllVersions) {
      modalService.handleKeyPress('Escape', () => setShowAllVersions(false));
      modalService.preventBackgroundScroll();
    }

    return () => {
      modalService.restoreBackgroundScroll();
    };
  }, [showAllVersions, modalService]);

  const toggleModal = () => {
    setShowAllVersions(prev => !prev);
  };

  const getCurrentRequirements = (versionIndex: number): PlatformVersion[] => {
    return versionAnalysisService.getCurrentRequirements(sdk, versionIndex);
  };

  const getVersionStatus = (versionIndex: number): string => {
    return versionAnalysisService.getVersionStatus(sdk, versionIndex);
  };

  const getAvailablePlatforms = (): string[] => {
    return versionAnalysisService.getAvailablePlatforms(sdk);
  };

  return {
    showAllVersions,
    toggleModal,
    getCurrentRequirements,
    getVersionStatus,
    getAvailablePlatforms
  };
}
