import { SDK } from '../../../domain/entities/SDK';
import { SDKVersion } from '../../../domain/entities/SDKVersion';
import { Platform, PlatformVersion } from '../../../domain/value-objects/Platform';
import { SDKName, SDKTag, ProgrammingLanguage } from '../../../domain/value-objects/SDKIdentifiers';

describe('SDK', () => {
  const createMockSDKVersions = (): SDKVersion[] => [
    SDKVersion.create('2.0.0', '2023-02-01', [
      new PlatformVersion(Platform.IOS, '15.0'),
      new PlatformVersion(Platform.ANDROID, '23')
    ]),
    SDKVersion.create('1.5.0', '2023-01-15', [
      new PlatformVersion(Platform.IOS, '14.0')
    ]),
    SDKVersion.create('1.0.0', '2022-12-01', [])
  ];

  const createMockSDK = (): SDK => {
    return new SDK(
      new SDKName('React Native'),
      [new SDKTag('framework'), new SDKTag('cross-platform')],
      new ProgrammingLanguage('JavaScript'),
      createMockSDKVersions()
    );
  };

  describe('constructor', () => {
    it('should create a valid SDK', () => {
      const sdk = createMockSDK();

      expect(sdk.name.value).toBe('React Native');
      expect(sdk.tags).toHaveLength(2);
      expect(sdk.language.value).toBe('JavaScript');
      expect(sdk.versions).toHaveLength(3);
    });

    it('should throw error when no versions provided', () => {
      expect(() => new SDK(
        new SDKName('Test SDK'),
        [],
        new ProgrammingLanguage('JavaScript'),
        []
      )).toThrow('SDK must have at least one version');
    });
  });

  describe('hasTag', () => {
    const sdk = createMockSDK();

    it('should return true for existing tag (case insensitive)', () => {
      expect(sdk.hasTag('framework')).toBe(true);
      expect(sdk.hasTag('Framework')).toBe(true);
      expect(sdk.hasTag('FRAMEWORK')).toBe(true);
    });

    it('should return false for non-existing tag', () => {
      expect(sdk.hasTag('library')).toBe(false);
    });
  });

  describe('hasLanguage', () => {
    const sdk = createMockSDK();

    it('should return true for matching language (case insensitive)', () => {
      expect(sdk.hasLanguage('javascript')).toBe(true);
      expect(sdk.hasLanguage('JavaScript')).toBe(true);
      expect(sdk.hasLanguage('JAVASCRIPT')).toBe(true);
    });

    it('should return false for non-matching language', () => {
      expect(sdk.hasLanguage('TypeScript')).toBe(false);
    });
  });

  describe('matchesSearchTerm', () => {
    const sdk = createMockSDK();

    it('should return true for matching search term (case insensitive)', () => {
      expect(sdk.matchesSearchTerm('React')).toBe(true);
      expect(sdk.matchesSearchTerm('react')).toBe(true);
      expect(sdk.matchesSearchTerm('Native')).toBe(true);
      expect(sdk.matchesSearchTerm('React Native')).toBe(true);
    });

    it('should return false for non-matching search term', () => {
      expect(sdk.matchesSearchTerm('Flutter')).toBe(false);
      expect(sdk.matchesSearchTerm('Angular')).toBe(false);
    });
  });

  describe('getRecentVersions', () => {
    const sdk = createMockSDK();

    it('should return default 5 recent versions', () => {
      const recentVersions = sdk.getRecentVersions();
      expect(recentVersions).toHaveLength(3); // SDK only has 3 versions
      expect(recentVersions[0].version.value).toBe('2.0.0');
      expect(recentVersions[1].version.value).toBe('1.5.0');
      expect(recentVersions[2].version.value).toBe('1.0.0');
    });

    it('should return specified number of recent versions', () => {
      const recentVersions = sdk.getRecentVersions(2);
      expect(recentVersions).toHaveLength(2);
      expect(recentVersions[0].version.value).toBe('2.0.0');
      expect(recentVersions[1].version.value).toBe('1.5.0');
    });

    it('should return all versions when count exceeds available versions', () => {
      const recentVersions = sdk.getRecentVersions(10);
      expect(recentVersions).toHaveLength(3);
    });
  });

  describe('getRecentVersion', () => {
    it('should return the most recent version', () => {
      const sdk = createMockSDK();
      const recentVersion = sdk.getRecentVersion();
      
      expect(recentVersion.version.value).toBe('2.0.0');
    });
  });

  describe('getAllVersionsWithRequirements', () => {
    it('should return only versions with platform requirements', () => {
      const sdk = createMockSDK();
      const versionsWithRequirements = sdk.getAllVersionsWithRequirements();
      
      expect(versionsWithRequirements).toHaveLength(2);
      expect(versionsWithRequirements[0].version.value).toBe('2.0.0');
      expect(versionsWithRequirements[1].version.value).toBe('1.5.0');
      
      // Verify they all have requirements
      versionsWithRequirements.forEach(version => {
        expect(version.hasRequirements()).toBe(true);
      });
    });
  });

  describe('getAvailablePlatforms', () => {
    it('should return all unique platforms sorted', () => {
      const sdk = createMockSDK();
      const platforms = sdk.getAvailablePlatforms();
      
      expect(platforms).toEqual(['Android', 'iOS']);
    });

    it('should return empty array for SDK with no platform requirements', () => {
      const sdk = new SDK(
        new SDKName('Test SDK'),
        [],
        new ProgrammingLanguage('JavaScript'),
        [SDKVersion.create('1.0.0', '2023-01-01')]
      );
      
      const platforms = sdk.getAvailablePlatforms();
      expect(platforms).toEqual([]);
    });
  });

  describe('create', () => {
    it('should create SDK from primitives', () => {
      const versions = createMockSDKVersions();
      const sdk = SDK.create(
        'Flutter',
        ['framework', 'ui'],
        'Dart',
        versions
      );

      expect(sdk.name.value).toBe('Flutter');
      expect(sdk.tags).toHaveLength(2);
      expect(sdk.tags[0].value).toBe('framework');
      expect(sdk.tags[1].value).toBe('ui');
      expect(sdk.language.value).toBe('Dart');
      expect(sdk.versions).toBe(versions);
    });
  });
});
