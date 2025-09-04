import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  maxWidth?: string;
  children: ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  maxWidth = 'max-w-4xl',
  children
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className={`bg-card rounded-lg shadow-xl ${maxWidth} w-full max-h-[90vh] overflow-hidden border border-border`}>
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-card-foreground">{title}</h2>
              {subtitle && (
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-card-foreground text-2xl font-bold"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {children}
        </div>
      </div>
    </div>
  );
}
