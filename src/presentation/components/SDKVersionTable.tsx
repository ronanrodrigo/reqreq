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
      <thead className="bg-muted sticky top-0">
        <tr>
          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Version
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Release Date
          </th>
          {hasIOS && (
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              iOS Requirement
            </th>
          )}
          {hasAndroid && (
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Android Requirement
            </th>
          )}
        </tr>
      </thead>
      <tbody className="bg-card divide-y divide-border">
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
            <tr key={index} className={isStatusChange ? 'bg-accent' : ''}>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-card-foreground">
                v{version.version.value}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">
                {version.releaseDate.toLocaleDateString()}
              </td>
              {hasIOS && (
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  {iosReq ? (
                    <span className={platformDisplayService.getPlatformBadgeClasses('iOS')}>
                      {platformDisplayService.formatPlatformDisplay(iosReq)}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">-</span>
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
                    <span className="text-muted-foreground">-</span>
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
