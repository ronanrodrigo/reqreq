export interface IModalService {
  handleKeyPress(key: string, onClose: () => void): void;
  preventBackgroundScroll(): void;
  restoreBackgroundScroll(): void;
}

export class ModalService implements IModalService {
  private keydownHandler: ((e: KeyboardEvent) => void) | null = null;

  handleKeyPress(key: string, onClose: () => void): void {
    this.keydownHandler = (e: KeyboardEvent) => {
      if (e.key === key) {
        onClose();
      }
    };
    document.addEventListener('keydown', this.keydownHandler);
  }

  preventBackgroundScroll(): void {
    document.body.style.overflow = 'hidden';
  }

  restoreBackgroundScroll(): void {
    document.body.style.overflow = 'unset';
    if (this.keydownHandler) {
      document.removeEventListener('keydown', this.keydownHandler);
      this.keydownHandler = null;
    }
  }
}
