'use client';

import { SDK } from '../../domain/entities/SDK';
import { IVersionAnalysisService } from '../../domain/services/VersionAnalysisService';
import { IModalService } from '../services/ModalService';
import { IPlatformDisplayService } from '../services/PlatformDisplayService';
import { useSDKCard } from '../hooks/useSDKCard';

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
  
  const availablePlatforms = getAvailablePlatforms();
  const hasIOS = availablePlatforms.includes('iOS');
  const hasAndroid = availablePlatforms.includes('Android');

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

      <div className="space-y-2 flex-1">
        <h4 className="text-lg font-medium text-gray-900">Recent Versions</h4>
        {sdk.getRecentVersions().map((version, index) => {
          const hasRequirements = version.hasRequirements();
          
          return (
            <div key={index} className={`border rounded-md p-2 ${hasRequirements ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900 text-sm">v{version.version.value}</span>
                <span className="text-xs text-gray-500">
                  {version.releaseDate.toLocaleDateString()}
                </span>
              </div>
              
              {hasRequirements && (
                <div className="mt-2">
                  <div className="text-xs text-blue-600 font-medium mb-1">New requirements:</div>
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
              )}
            </div>
          );
        })}
        {sdk.versions.length > 5 && (
          <div className="text-xs text-gray-500 text-center py-1">
            ... and {sdk.versions.length - 5} more versions
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button
          onClick={toggleModal}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          View All {sdk.versions.length} Versions
        </button>
      </div>

      {/* Modal for all versions */}
      {showAllVersions && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              toggleModal();
            }
          }}
        >
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{sdk.name.value}</h2>
                  <p className="text-sm text-gray-600">
                    All {sdk.versions.length} versions • {sdk.getAllVersionsWithRequirements().length} requirement changes
                  </p>
                </div>
                <button
                  onClick={toggleModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
              <table className="w-full">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Release Date</th>
                    {hasIOS && (
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">iOS Requirement</th>
                    )}
                    {hasAndroid && (
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Android Requirement</th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sdk.versions.map((version, index) => {
                    const currentRequirements = getCurrentRequirements(index);
                    const iosReq = currentRequirements.find(p => p && p.platform === 'iOS');
                    const androidReq = currentRequirements.find(p => p && p.platform === 'Android');
                    const status = getVersionStatus(index);
                    const isStatusChange = status === 'Requirements changed' || status === 'Requirements added' || status === 'Initial requirements';
                    
                    return (
                      <tr key={index} className={isStatusChange ? 'bg-blue-50' : ''}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                          v{version.version.value}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {version.releaseDate.toLocaleDateString()}
                        </td>
                        {hasIOS && (
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            {iosReq ? (
                              <span className={platformDisplayService.getPlatformBadgeClasses('iOS')}>
                                {platformDisplayService.formatPlatformDisplay(iosReq)}
                              </span>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                        )}
                        {hasAndroid && (
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            {androidReq ? (
                              <span className={platformDisplayService.getPlatformBadgeClasses('Android')}>
                                {platformDisplayService.formatPlatformDisplay(androidReq)}
                              </span>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
