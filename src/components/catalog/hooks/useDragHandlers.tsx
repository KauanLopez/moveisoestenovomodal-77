
import { useState, useEffect } from 'react';

interface UseDragHandlersProps {
  onPrevious: () => void;
  onNext: () => void;
}

export const useDragHandlers = ({ onPrevious, onNext }: UseDragHandlersProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setTranslateX(0);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    // Limit the drag distance to provide visual feedback
    const limitedDiff = Math.max(-150, Math.min(150, diff));
    setTranslateX(limitedDiff);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 80;
    
    if (translateX > threshold) {
      onPrevious();
    } else if (translateX < -threshold) {
      onNext();
    }
    
    setTranslateX(0);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Add global mouse event listeners for drag completion
  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        handleMove(e.clientX);
      };
      
      const handleGlobalMouseUp = () => {
        handleEnd();
      };

      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging, startX, translateX]);

  return {
    isDragging,
    translateX,
    handleMouseDown,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
};
