import { VersionAnalysisService } from '../../../domain/services/VersionAnalysisService';
import { SDK } from '../../../domain/entities/SDK';
import { SDKVersion } from '../../../domain/entities/SDKVersion';
import { Platform, PlatformVersion } from '../../../domain/value-objects/Platform';

describe('VersionAnalysisService', () => {
  let service: VersionAnalysisService;

  beforeEach(() => {
    service = new VersionAnalysisService();
  });

  const createMockSDK = (): SDK => {
    const versions = [
      SDKVersion.create('3.0.0', '2023-03-01', [
        new PlatformVersion(Platform.IOS, '16.0'),
        new PlatformVersion(Platform.ANDROID, '24')
      ]),
      SDKVersion.create('2.5.0', '2023-02-15', [
        new PlatformVersion(Platform.IOS, '15.0'),
        new PlatformVersion(Platform.ANDROID, '23')
      ]),
      SDKVersion.create('2.0.0', '2023-01-01', [
        new PlatformVersion(Platform.IOS, '15.0'),
        new PlatformVersion(Platform.ANDROID, '23')
      ]),
      SDKVersion.create('1.5.0', '2022-12-01', []),
      SDKVersion.create('1.0.0', '2022-11-01', [
        new PlatformVersion(Platform.IOS, '14.0'),
        new PlatformVersion(Platform.ANDROID, '21')
      ])
    ];

    return SDK.create('Test SDK', ['framework'], 'JavaScript', versions);
  };

  describe('getCurrentRequirements', () => {
    const sdk = createMockSDK();

    it('should return requirements for version with direct requirements', () => {
      const requirements = service.getCurrentRequirements(sdk, 0); // Version 3.0.0
      
      expect(requirements).toHaveLength(2);
      expect(requirements[0].platform).toBe(Platform.IOS);
      expect(requirements[0].version).toBe('16.0');
      expect(requirements[1].platform).toBe(Platform.ANDROID);
      expect(requirements[1].version).toBe('24');
    });

    it('should return requirements from previous version when current has none', () => {
      const requirements = service.getCurrentRequirements(sdk, 3); // Version 1.5.0 (no requirements)
      
      expect(requirements).toHaveLength(2);
      expect(requirements[0].platform).toBe(Platform.IOS);
      expect(requirements[0].version).toBe('15.0'); // From version 2.0.0
    });

    it('should return empty array when no version exists at index', () => {
      const requirements = service.getCurrentRequirements(sdk, 10);
      expect(requirements).toEqual([]);
    });

    it('should return empty array when no requirements found in current or previous versions', () => {
      const versionsWithoutRequirements = [
        SDKVersion.create('1.0.0', '2023-01-01', []),
        SDKVersion.create('0.9.0', '2022-12-01', [])
      ];
      const sdkWithoutRequirements = SDK.create('Test SDK', [], 'JavaScript', versionsWithoutRequirements);
      
      const requirements = service.getCurrentRequirements(sdkWithoutRequirements, 0);
      expect(requirements).toEqual([]);
    });
  });

  describe('getVersionStatus', () => {
    const sdk = createMockSDK();

    it('should return "Initial requirements" for first version with requirements', () => {
      // Create SDK where first version has requirements
      const versions = [
        SDKVersion.create('1.0.0', '2023-01-01', [
          new PlatformVersion(Platform.IOS, '14.0')
        ])
      ];
      const sdkWithInitialReq = SDK.create('Test SDK', [], 'JavaScript', versions);
      
      const status = service.getVersionStatus(sdkWithInitialReq, 0);
      expect(status).toBe('Initial requirements');
    });

    it('should return "No requirements" for first version without requirements', () => {
      const versions = [
        SDKVersion.create('1.0.0', '2023-01-01', [])
      ];
      const sdkWithoutReq = SDK.create('Test SDK', [], 'JavaScript', versions);
      
      const status = service.getVersionStatus(sdkWithoutReq, 0);
      expect(status).toBe('No requirements');
    });

    it('should return "Same as previous" for version without direct requirements', () => {
      const status = service.getVersionStatus(sdk, 3); // Version 1.5.0 (no requirements)
      expect(status).toBe('Same as previous');
    });

    it('should return "Requirements added" when adding requirements after having none', () => {
      // This tests the case where previous version had no requirements
      // but current version adds them
      const status = service.getVersionStatus(sdk, 4); // Version 1.0.0 adds requirements after 1.5.0
      expect(status).toBe('Requirements added');
    });

    it('should return "Requirements changed" when requirements differ from previous', () => {
      const status = service.getVersionStatus(sdk, 0); // Version 3.0.0 changes requirements
      expect(status).toBe('Requirements changed');
    });

    it('should return "Same as previous" when requirements are identical to previous', () => {
      const status = service.getVersionStatus(sdk, 2); // Version 2.0.0 same as 2.5.0
      expect(status).toBe('Same as previous');
    });

    it('should return "No data" for invalid version index', () => {
      const status = service.getVersionStatus(sdk, 10);
      expect(status).toBe('No data');
    });
  });

  describe('getAvailablePlatforms', () => {
    it('should return available platforms from SDK', () => {
      const sdk = createMockSDK();
      const platforms = service.getAvailablePlatforms(sdk);
      
      expect(platforms).toEqual(['Android', 'iOS']);
    });

    it('should return empty array for SDK without platform requirements', () => {
      const versions = [SDKVersion.create('1.0.0', '2023-01-01', [])];
      const sdkWithoutPlatforms = SDK.create('Test SDK', [], 'JavaScript', versions);
      
      const platforms = service.getAvailablePlatforms(sdkWithoutPlatforms);
      expect(platforms).toEqual([]);
    });
  });
});
