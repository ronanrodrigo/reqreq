import { PlatformDisplayService } from '../../../presentation/services/PlatformDisplayService';
import { Platform, PlatformVersion } from '../../../domain/value-objects/Platform';

describe('PlatformDisplayService', () => {
  let service: PlatformDisplayService;

  beforeEach(() => {
    service = new PlatformDisplayService();
  });

  describe('getPlatformBadgeClasses', () => {
    it('should return iOS specific classes', () => {
      const classes = service.getPlatformBadgeClasses('iOS');
      
      expect(classes).toContain('inline-flex');
      expect(classes).toContain('items-center');
      expect(classes).toContain('px-2.5');
      expect(classes).toContain('py-0.5');
      expect(classes).toContain('rounded-full');
      expect(classes).toContain('text-xs');
      expect(classes).toContain('font-medium');
    });

    it('should return Android specific classes', () => {
      const classes = service.getPlatformBadgeClasses('Android');
      
      expect(classes).toContain('inline-flex');
    });

    it('should return default classes for unknown platform', () => {
      const classes = service.getPlatformBadgeClasses('Unknown');
      
      expect(classes).toContain('inline-flex');
    });

    it('should include base classes for all platforms', () => {
      const iosClasses = service.getPlatformBadgeClasses('iOS');
      const androidClasses = service.getPlatformBadgeClasses('Android');
      const unknownClasses = service.getPlatformBadgeClasses('Web');

      const expectedBaseClasses = [
        'inline-flex',
        'items-center',
        'px-2.5',
        'py-0.5',
        'rounded-full',
        'text-xs',
        'font-medium'
      ];

      expectedBaseClasses.forEach(baseClass => {
        expect(iosClasses).toContain(baseClass);
        expect(androidClasses).toContain(baseClass);
        expect(unknownClasses).toContain(baseClass);
      });
    });
  });

  describe('formatPlatformDisplay', () => {
    it('should format iOS platform version', () => {
      const platformVersion = new PlatformVersion(Platform.IOS, '15.0');
      const formatted = service.formatPlatformDisplay(platformVersion);
      
      expect(formatted).toBe('iOS 15.0+');
    });

    it('should format Android platform version', () => {
      const platformVersion = new PlatformVersion(Platform.ANDROID, '23');
      const formatted = service.formatPlatformDisplay(platformVersion);
      
      expect(formatted).toBe('Android 23+');
    });

    it('should delegate to PlatformVersion toString method', () => {
      const platformVersion = new PlatformVersion(Platform.IOS, '14.5');
      const spy = jest.spyOn(platformVersion, 'toString');
      
      service.formatPlatformDisplay(platformVersion);
      
      expect(spy).toHaveBeenCalled();
    });
  });
});
