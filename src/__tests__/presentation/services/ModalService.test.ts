import { ModalService } from '../../../presentation/services/ModalService';

// Mock DOM methods
Object.defineProperty(document, 'addEventListener', {
  value: jest.fn(),
  writable: true,
});

Object.defineProperty(document, 'removeEventListener', {
  value: jest.fn(),
  writable: true,
});

Object.defineProperty(document.body.style, 'overflow', {
  value: '',
  writable: true,
});

describe('ModalService', () => {
  let service: ModalService;
  let mockOnClose: jest.Mock;

  beforeEach(() => {
    service = new ModalService();
    mockOnClose = jest.fn();
    jest.clearAllMocks();
    
    // Reset document.body.style.overflow
    document.body.style.overflow = '';
  });

  describe('handleKeyPress', () => {
    it('should add event listener for specified key', () => {
      const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
      
      service.handleKeyPress('Escape', mockOnClose);
      
      expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    });

    it('should call onClose when specified key is pressed', () => {
      let keydownHandler: (event: KeyboardEvent) => void;
      jest.spyOn(document, 'addEventListener').mockImplementation((event, handler) => {
        if (event === 'keydown') {
          keydownHandler = handler as (event: KeyboardEvent) => void;
        }
      });

      service.handleKeyPress('Escape', mockOnClose);

      // Simulate Escape key press
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      keydownHandler!(escapeEvent);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should not call onClose for different key press', () => {
      let keydownHandler: (event: KeyboardEvent) => void;
      jest.spyOn(document, 'addEventListener').mockImplementation((event, handler) => {
        if (event === 'keydown') {
          keydownHandler = handler as (event: KeyboardEvent) => void;
        }
      });

      service.handleKeyPress('Escape', mockOnClose);

      // Simulate Enter key press (different key)
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      keydownHandler!(enterEvent);

      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('preventBackgroundScroll', () => {
    it('should set document body overflow to hidden', () => {
      service.preventBackgroundScroll();
      
      expect(document.body.style.overflow).toBe('hidden');
    });
  });

  describe('restoreBackgroundScroll', () => {
    it('should restore document body overflow to unset', () => {
      // First set it to hidden
      document.body.style.overflow = 'hidden';
      
      service.restoreBackgroundScroll();
      
      expect(document.body.style.overflow).toBe('unset');
    });

    it('should remove event listener when called', () => {
      const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
      
      // First setup the key handler
      service.handleKeyPress('Escape', mockOnClose);
      
      // Then restore scroll (which should remove the event listener)
      service.restoreBackgroundScroll();
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    });

    it('should not remove event listener if none was added', () => {
      const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
      
      // Call restore without setting up key handler first
      service.restoreBackgroundScroll();
      
      expect(removeEventListenerSpy).not.toHaveBeenCalled();
    });
  });

  describe('integration', () => {
    it('should handle complete modal lifecycle', () => {
      const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
      const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
      
      // Open modal
      service.handleKeyPress('Escape', mockOnClose);
      service.preventBackgroundScroll();
      
      expect(addEventListenerSpy).toHaveBeenCalled();
      expect(document.body.style.overflow).toBe('hidden');
      
      // Close modal
      service.restoreBackgroundScroll();
      
      expect(removeEventListenerSpy).toHaveBeenCalled();
      expect(document.body.style.overflow).toBe('unset');
    });

    it('should handle multiple modal instances', () => {
      const service2 = new ModalService();
      const mockOnClose2 = jest.fn();
      
      // Setup first modal
      service.handleKeyPress('Escape', mockOnClose);
      service.preventBackgroundScroll();
      
      // Setup second modal
      service2.handleKeyPress('Enter', mockOnClose2);
      service2.preventBackgroundScroll();
      
      // Both should work independently
      expect(document.body.style.overflow).toBe('hidden');
      
      // Close first modal
      service.restoreBackgroundScroll();
      expect(document.body.style.overflow).toBe('unset');
      
      // Close second modal
      service2.restoreBackgroundScroll();
      expect(document.body.style.overflow).toBe('unset');
    });
  });
});
