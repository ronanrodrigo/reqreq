import { PlatformVersion } from '../value-objects/Platform';
import { VersionNumber, ReleaseDate } from '../value-objects/Version';

export class SDKVersion {
  constructor(
    public readonly version: VersionNumber,
    public readonly releaseDate: ReleaseDate,
    public readonly platformVersions: PlatformVersion[]
  ) {}

  hasRequirements(): boolean {
    return this.platformVersions.length > 0;
  }

  getRequirementForPlatform(platform: string): PlatformVersion | undefined {
    return this.platformVersions.find(pv => pv.platform === platform);
  }

  equals(other: SDKVersion): boolean {
    return this.version.equals(other.version);
  }

  static create(
    version: string,
    releaseDate: string,
    platformVersions?: PlatformVersion[]
  ): SDKVersion {
    return new SDKVersion(
      new VersionNumber(version),
      ReleaseDate.fromString(releaseDate),
      platformVersions || []
    );
  }
}
