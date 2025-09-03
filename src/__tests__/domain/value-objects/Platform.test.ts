import { Platform, PlatformVersion } from '../../../domain/value-objects/Platform';

describe('PlatformVersion', () => {
  describe('constructor', () => {
    it('should create a valid iOS platform version', () => {
      const platformVersion = new PlatformVersion(Platform.IOS, '14.0');
      expect(platformVersion.platform).toBe(Platform.IOS);
      expect(platformVersion.version).toBe('14.0');
    });

    it('should create a valid Android platform version', () => {
      const platformVersion = new PlatformVersion(Platform.ANDROID, '21');
      expect(platformVersion.platform).toBe(Platform.ANDROID);
      expect(platformVersion.version).toBe('21');
    });

    it('should throw error for empty version', () => {
      expect(() => new PlatformVersion(Platform.IOS, '')).toThrow('Platform version cannot be empty');
    });

    it('should throw error for whitespace-only version', () => {
      expect(() => new PlatformVersion(Platform.IOS, '   ')).toThrow('Platform version cannot be empty');
    });
  });

  describe('toString', () => {
    it('should return formatted string for iOS', () => {
      const platformVersion = new PlatformVersion(Platform.IOS, '14.0');
      expect(platformVersion.toString()).toBe('iOS 14.0+');
    });

    it('should return formatted string for Android', () => {
      const platformVersion = new PlatformVersion(Platform.ANDROID, '21');
      expect(platformVersion.toString()).toBe('Android 21+');
    });
  });

  describe('equals', () => {
    it('should return true for identical platform versions', () => {
      const pv1 = new PlatformVersion(Platform.IOS, '14.0');
      const pv2 = new PlatformVersion(Platform.IOS, '14.0');
      expect(pv1.equals(pv2)).toBe(true);
    });

    it('should return false for different platforms', () => {
      const pv1 = new PlatformVersion(Platform.IOS, '14.0');
      const pv2 = new PlatformVersion(Platform.ANDROID, '21');
      expect(pv1.equals(pv2)).toBe(false);
    });

    it('should return false for different versions', () => {
      const pv1 = new PlatformVersion(Platform.IOS, '14.0');
      const pv2 = new PlatformVersion(Platform.IOS, '15.0');
      expect(pv1.equals(pv2)).toBe(false);
    });
  });
});
