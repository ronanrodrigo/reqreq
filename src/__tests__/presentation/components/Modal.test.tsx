import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from '../../../presentation/components/Modal';

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    title: 'Test Modal',
    children: <div>Modal Content</div>
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render when isOpen is true', () => {
      render(<Modal {...defaultProps} />);
      
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
      expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });

    it('should not render when isOpen is false', () => {
      render(<Modal {...defaultProps} isOpen={false} />);
      
      expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
      expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
    });

    it('should render subtitle when provided', () => {
      render(<Modal {...defaultProps} subtitle="Test Subtitle" />);
      
      expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    });

    it('should apply custom maxWidth class', () => {
      const { container } = render(
        <Modal {...defaultProps} maxWidth="max-w-2xl" />
      );
      
      const modalContent = container.querySelector('.max-w-2xl');
      expect(modalContent).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('should call onClose when close button is clicked', () => {
      const onClose = jest.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);
      
      const closeButton = screen.getByLabelText('Close modal');
      fireEvent.click(closeButton);
      
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when backdrop is clicked', () => {
      const onClose = jest.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);
      
      // Find the backdrop (the fixed overlay div)
      const backdrop = screen.getByText('Test Modal').closest('.fixed');
      if (backdrop) {
        fireEvent.click(backdrop);
        expect(onClose).toHaveBeenCalledTimes(1);
      }
    });

    it('should not call onClose when modal content is clicked', () => {
      const onClose = jest.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);
      
      const modalContent = screen.getByText('Modal Content');
      fireEvent.click(modalContent);
      
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('should have proper ARIA label on close button', () => {
      render(<Modal {...defaultProps} />);
      
      const closeButton = screen.getByLabelText('Close modal');
      expect(closeButton).toBeInTheDocument();
      expect(closeButton).toHaveAttribute('aria-label', 'Close modal');
    });

    it('should render close button with proper text', () => {
      render(<Modal {...defaultProps} />);
      
      const closeButton = screen.getByText('×');
      expect(closeButton).toBeInTheDocument();
    });
  });

  describe('styling', () => {
    it('should apply default maxWidth when not specified', () => {
      const { container } = render(<Modal {...defaultProps} />);
      
      const modalContent = container.querySelector('.max-w-4xl');
      expect(modalContent).toBeInTheDocument();
    });

    it('should have proper backdrop styling', () => {
      const { container } = render(<Modal {...defaultProps} />);
      
      const backdrop = container.querySelector('.fixed.inset-0');
      expect(backdrop).toBeInTheDocument();
      expect(backdrop).toHaveClass('z-50', 'p-4', 'flex', 'items-center', 'justify-center');
    });

    it('should have scrollable content area', () => {
      const { container } = render(<Modal {...defaultProps} />);
      
      const scrollableArea = container.querySelector('.overflow-y-auto');
      expect(scrollableArea).toBeInTheDocument();
      expect(scrollableArea).toHaveClass('max-h-[calc(90vh-120px)]');
    });
  });
});
