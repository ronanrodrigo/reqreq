import { SDKVersion } from '../../../domain/entities/SDKVersion';
import { Platform, PlatformVersion } from '../../../domain/value-objects/Platform';
import { VersionNumber, ReleaseDate } from '../../../domain/value-objects/Version';

describe('SDKVersion', () => {
  const createMockPlatformVersions = (): PlatformVersion[] => [
    new PlatformVersion(Platform.IOS, '14.0'),
    new PlatformVersion(Platform.ANDROID, '21')
  ];

  describe('constructor', () => {
    it('should create a valid SDK version', () => {
      const version = new VersionNumber('1.0.0');
      const releaseDate = new ReleaseDate(new Date('2023-01-15'));
      const platformVersions = createMockPlatformVersions();

      const sdkVersion = new SDKVersion(version, releaseDate, platformVersions);

      expect(sdkVersion.version).toBe(version);
      expect(sdkVersion.releaseDate).toBe(releaseDate);
      expect(sdkVersion.platformVersions).toBe(platformVersions);
    });

    it('should create a version with empty platform requirements', () => {
      const version = new VersionNumber('1.0.0');
      const releaseDate = new ReleaseDate(new Date('2023-01-15'));

      const sdkVersion = new SDKVersion(version, releaseDate, []);

      expect(sdkVersion.platformVersions).toEqual([]);
      expect(sdkVersion.hasRequirements()).toBe(false);
    });
  });

  describe('hasRequirements', () => {
    it('should return true when platform versions exist', () => {
      const sdkVersion = new SDKVersion(
        new VersionNumber('1.0.0'),
        new ReleaseDate(new Date('2023-01-15')),
        createMockPlatformVersions()
      );

      expect(sdkVersion.hasRequirements()).toBe(true);
    });

    it('should return false when no platform versions exist', () => {
      const sdkVersion = new SDKVersion(
        new VersionNumber('1.0.0'),
        new ReleaseDate(new Date('2023-01-15')),
        []
      );

      expect(sdkVersion.hasRequirements()).toBe(false);
    });
  });

  describe('getRequirementForPlatform', () => {
    const sdkVersion = new SDKVersion(
      new VersionNumber('1.0.0'),
      new ReleaseDate(new Date('2023-01-15')),
      createMockPlatformVersions()
    );

    it('should return platform requirement when it exists', () => {
      const iosRequirement = sdkVersion.getRequirementForPlatform(Platform.IOS);
      expect(iosRequirement).toBeDefined();
      expect(iosRequirement?.platform).toBe(Platform.IOS);
      expect(iosRequirement?.version).toBe('14.0');
    });

    it('should return undefined when platform requirement does not exist', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const webRequirement = sdkVersion.getRequirementForPlatform('Web' as any);
      expect(webRequirement).toBeUndefined();
    });
  });

  describe('equals', () => {
    it('should return true for versions with same version number', () => {
      const version1 = new SDKVersion(
        new VersionNumber('1.0.0'),
        new ReleaseDate(new Date('2023-01-15')),
        []
      );
      const version2 = new SDKVersion(
        new VersionNumber('1.0.0'),
        new ReleaseDate(new Date('2023-02-15')),
        createMockPlatformVersions()
      );

      expect(version1.equals(version2)).toBe(true);
    });

    it('should return false for versions with different version numbers', () => {
      const version1 = new SDKVersion(
        new VersionNumber('1.0.0'),
        new ReleaseDate(new Date('2023-01-15')),
        []
      );
      const version2 = new SDKVersion(
        new VersionNumber('2.0.0'),
        new ReleaseDate(new Date('2023-01-15')),
        []
      );

      expect(version1.equals(version2)).toBe(false);
    });
  });

  describe('create', () => {
    it('should create SDK version from primitives', () => {
      const platformVersions = createMockPlatformVersions();
      const sdkVersion = SDKVersion.create('1.0.0', '2023-01-15', platformVersions);

      expect(sdkVersion.version.value).toBe('1.0.0');
      expect(sdkVersion.releaseDate.value.getFullYear()).toBe(2023);
      expect(sdkVersion.platformVersions).toBe(platformVersions);
    });

    it('should create SDK version without platform requirements', () => {
      const sdkVersion = SDKVersion.create('1.0.0', '2023-01-15');

      expect(sdkVersion.version.value).toBe('1.0.0');
      expect(sdkVersion.platformVersions).toEqual([]);
      expect(sdkVersion.hasRequirements()).toBe(false);
    });
  });
});
