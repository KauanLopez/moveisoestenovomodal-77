
import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDragHandlers } from './hooks/useDragHandlers';

interface CatalogImage {
  url: string;
  title: string;
}

interface CatalogData {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  images: CatalogImage[];
}

interface CatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  catalog: CatalogData | null;
}

const CatalogModal: React.FC<CatalogModalProps> = ({ isOpen, onClose, catalog }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePrevImage = () => {
    if (!catalog) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? catalog.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!catalog) return;
    setCurrentImageIndex((prev) => 
      prev === catalog.images.length - 1 ? 0 : prev + 1
    );
  };

  const {
    isDragging,
    translateX,
    handleMouseDown,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  } = useDragHandlers({
    onPrevious: handlePrevImage,
    onNext: handleNextImage
  });

  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setIsFullscreen(false);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen || !catalog) return;

      switch (event.key) {
        case 'Escape':
          if (isFullscreen) {
            setIsFullscreen(false);
          } else {
            onClose();
          }
          break;
        case 'ArrowLeft':
          handlePrevImage();
          break;
        case 'ArrowRight':
          handleNextImage();
          break;
        case 'f':
        case 'F':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            setIsFullscreen(!isFullscreen);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, catalog, currentImageIndex, isFullscreen]);

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget && !isFullscreen) {
      onClose();
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!isOpen || !catalog) {
    return null;
  }

  const currentImage = catalog.images[currentImageIndex];

  return (
    <div 
      className={`fixed inset-0 bg-black/80 flex items-center justify-center z-50 ${
        isFullscreen ? 'bg-black' : 'p-4'
      }`}
      onClick={handleOverlayClick}
    >
      {/* Modal container */}
      <div className={`bg-white rounded-lg flex flex-col shadow-2xl relative ${
        isFullscreen 
          ? 'w-full h-full rounded-none' 
          : 'w-full h-full max-w-[90vw] max-h-[90vh]'
      }`}>
        {/* Header - Hidden in fullscreen */}
        {!isFullscreen && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 truncate">
                {catalog.name}
              </h2>
              <p className="text-sm text-gray-600 mt-1 truncate">
                {catalog.description}
              </p>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-gray-100 flex-shrink-0 ml-4"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        )}

        {/* Image Display Area */}
        <div className="flex-1 relative bg-gray-50 min-h-0 overflow-hidden">
          {/* Fullscreen Toggle Button */}
          <Button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 z-30 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg border"
            size="icon"
          >
            {isFullscreen ? (
              <Minimize2 className="h-5 w-5" />
            ) : (
              <Maximize2 className="h-5 w-5" />
            )}
          </Button>

          {/* Close button for fullscreen mode */}
          {isFullscreen && (
            <Button
              onClick={onClose}
              className="absolute top-4 left-4 z-30 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg border"
              size="icon"
            >
              <X className="h-5 w-5" />
            </Button>
          )}

          {/* Navigation Arrows */}
          <Button
            onClick={handlePrevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg border"
            size="icon"
            disabled={catalog.images.length <= 1}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            onClick={handleNextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg border"
            size="icon"
            disabled={catalog.images.length <= 1}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Text-based Page Indicator */}
          {catalog.images.length > 1 && (
            <div className="absolute bottom-4 right-4 z-20 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
              Página {currentImageIndex + 1} de {catalog.images.length}
            </div>
          )}

          {/* Image Container with drag support */}
          <div 
            className="w-full h-full flex items-center justify-center p-8 cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              transform: isDragging ? `translateX(${translateX}px)` : 'translateX(0)',
              transition: isDragging ? 'none' : 'transform 0.3s ease'
            }}
          >
            <img
              src={currentImage.url}
              alt={currentImage.title}
              className="max-w-full max-h-full object-contain pointer-events-none"
              style={{ objectFit: 'contain' }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
              draggable={false}
            />
          </div>
        </div>

        {/* Footer - Hidden in fullscreen */}
        {!isFullscreen && (
          <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-white flex-shrink-0">
            <div className="text-sm text-gray-600 truncate flex-1 min-w-0">
              {currentImage.title}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogModal;
