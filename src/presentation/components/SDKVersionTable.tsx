import { SDK } from '../../domain/entities/SDK';
import { PlatformVersion } from '../../domain/value-objects/Platform';
import { IPlatformDisplayService } from '../services/PlatformDisplayService';

interface SDKVersionTableProps {
  sdk: SDK;
  getCurrentRequirements: (versionIndex: number) => PlatformVersion[];
  getVersionStatus: (versionIndex: number) => string;
  platformDisplayService: IPlatformDisplayService;
}

export default function SDKVersionTable({
  sdk,
  getCurrentRequirements,
  getVersionStatus,
  platformDisplayService
}: SDKVersionTableProps) {
  const availablePlatforms = sdk.getAvailablePlatforms();
  const hasIOS = availablePlatforms.includes('iOS');
  const hasAndroid = availablePlatforms.includes('Android');

  return (
    <table className="w-full">
      <thead className="bg-gray-50 sticky top-0">
        <tr>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Version
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Release Date
          </th>
          {hasIOS && (
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              iOS Requirement
            </th>
          )}
          {hasAndroid && (
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Android Requirement
            </th>
          )}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {sdk.versions.map((version, index) => {
          const currentRequirements = getCurrentRequirements(index);
          const iosReq = currentRequirements.find(p => p && p.platform === 'iOS');
          const androidReq = currentRequirements.find(p => p && p.platform === 'Android');
          const status = getVersionStatus(index);
          const isStatusChange = 
            status === 'Requirements changed' || 
            status === 'Requirements added' || 
            status === 'Initial requirements';
          
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
  );
}
