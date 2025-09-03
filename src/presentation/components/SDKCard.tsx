'use client';

import { SDK } from '../../domain/entities/SDK';
import { IVersionAnalysisService } from '../../domain/services/VersionAnalysisService';
import { IModalService } from '../services/ModalService';
import { IPlatformDisplayService } from '../services/PlatformDisplayService';
import { useSDKCard } from '../hooks/useSDKCard';
import Modal from './Modal';
import SDKVersionTable from './SDKVersionTable';

interface SDKCardProps {
  sdk: SDK;
  versionAnalysisService: IVersionAnalysisService;
  modalService: IModalService;
  platformDisplayService: IPlatformDisplayService;
}

export default function SDKCard({ 
  sdk, 
  versionAnalysisService, 
  modalService, 
  platformDisplayService 
}: SDKCardProps) {
  const {
    showAllVersions,
    toggleModal,
    getCurrentRequirements,
    getVersionStatus,
    getAvailablePlatforms
  } = useSDKCard(sdk, versionAnalysisService, modalService);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900 truncate flex-1 mr-2">{sdk.name.value}</h3>
        <div className="flex flex-wrap gap-1 flex-shrink-0">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            {sdk.language.value}
          </span>
          {sdk.tags.length > 0 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {sdk.tags[0].value}
              {sdk.tags.length > 1 && ` +${sdk.tags.length - 1}`}
            </span>
          )}
        </div>
      </div>

      <div className="flex-1">
        {(() => {
          const version = sdk.getRecentVersion();

          return (
            <div className={`border rounded-md p-2 bg-gray-50 border-gray-200`}>
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900 text-sm">v{version.version.value}</span>
                <span className="text-xs text-gray-500">
                  {version.releaseDate.toLocaleDateString()}
                </span>
              </div>
                <div className="mt-2">
                  <div className="flex flex-wrap gap-1">
                    {version.platformVersions.map((platform, platformIndex) => (
                      <div
                        key={platformIndex}
                        className={platformDisplayService.getPlatformBadgeClasses(platform.platform)}
                      >
                        {platformDisplayService.formatPlatformDisplay(platform)}
                      </div>
                    ))}
                  </div>
                </div>
            </div>
          );
        })()}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button
          onClick={toggleModal}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          View all versions
        </button>
      </div>

      {/* Modal for all versions */}
      <Modal
        isOpen={showAllVersions}
        onClose={toggleModal}
        title={sdk.name.value}
        subtitle={`All ${sdk.versions.length} versions • ${sdk.getAllVersionsWithRequirements().length} requirement changes`}
      >
        <SDKVersionTable
          sdk={sdk}
          getCurrentRequirements={getCurrentRequirements}
          getVersionStatus={getVersionStatus}
          platformDisplayService={platformDisplayService}
        />
      </Modal>
    </div>
  );
}
