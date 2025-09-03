import { VersionNumber, ReleaseDate } from '../../../domain/value-objects/Version';

describe('VersionNumber', () => {
  describe('constructor', () => {
    it('should create a valid version number', () => {
      const version = new VersionNumber('1.2.3');
      expect(version.value).toBe('1.2.3');
    });

    it('should throw error for empty version', () => {
      expect(() => new VersionNumber('')).toThrow('Version number cannot be empty');
    });

    it('should throw error for whitespace-only version', () => {
      expect(() => new VersionNumber('   ')).toThrow('Version number cannot be empty');
    });

    it('should throw error for undefined version', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => new VersionNumber(undefined as any)).toThrow('Version number cannot be empty');
    });
  });

  describe('equals', () => {
    it('should return true for identical versions', () => {
      const version1 = new VersionNumber('1.2.3');
      const version2 = new VersionNumber('1.2.3');
      expect(version1.equals(version2)).toBe(true);
    });

    it('should return false for different versions', () => {
      const version1 = new VersionNumber('1.2.3');
      const version2 = new VersionNumber('1.2.4');
      expect(version1.equals(version2)).toBe(false);
    });
  });

  describe('toString', () => {
    it('should return the version string', () => {
      const version = new VersionNumber('1.2.3');
      expect(version.toString()).toBe('1.2.3');
    });
  });
});

describe('ReleaseDate', () => {
  describe('constructor', () => {
    it('should create a valid release date', () => {
      const date = new Date('2023-01-15');
      const releaseDate = new ReleaseDate(date);
      expect(releaseDate.value).toEqual(date);
    });

    it('should throw error for invalid date', () => {
      const invalidDate = new Date('invalid');
      expect(() => new ReleaseDate(invalidDate)).toThrow('Invalid release date');
    });

    it('should throw error for future date', () => {
      const futureDate = new Date('2030-01-01');
      expect(() => new ReleaseDate(futureDate)).toThrow('Release date cannot be in the future');
    });

    it('should accept today\'s date', () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to avoid millisecond differences
      expect(() => new ReleaseDate(today)).not.toThrow();
    });
  });

  describe('fromString', () => {
    it('should create ReleaseDate from valid date string', () => {
      const releaseDate = ReleaseDate.fromString('2023-01-15');
      expect(releaseDate.value.getFullYear()).toBe(2023);
      expect(releaseDate.value.getMonth()).toBe(0); // January is 0
      // Use getUTCDate for consistent results across timezones
      expect(releaseDate.value.getUTCDate()).toBe(15);
    });

    it('should throw error for invalid date string', () => {
      expect(() => ReleaseDate.fromString('invalid-date')).toThrow('Invalid release date');
    });
  });

  describe('equals', () => {
    it('should return true for same dates', () => {
      const date1 = new ReleaseDate(new Date('2023-01-15'));
      const date2 = new ReleaseDate(new Date('2023-01-15'));
      expect(date1.equals(date2)).toBe(true);
    });

    it('should return false for different dates', () => {
      const date1 = new ReleaseDate(new Date('2023-01-15'));
      const date2 = new ReleaseDate(new Date('2023-01-16'));
      expect(date1.equals(date2)).toBe(false);
    });
  });

  describe('toString', () => {
    it('should return ISO date string', () => {
      const date = new Date('2023-01-15T00:00:00.000Z');
      const releaseDate = new ReleaseDate(date);
      expect(releaseDate.toString()).toBe('2023-01-15');
    });
  });

  describe('toLocaleDateString', () => {
    it('should return localized date string', () => {
      const date = new Date('2023-01-15');
      const releaseDate = new ReleaseDate(date);
      const localeDateString = releaseDate.toLocaleDateString();
      expect(typeof localeDateString).toBe('string');
      expect(localeDateString.length).toBeGreaterThan(0);
    });
  });
});
