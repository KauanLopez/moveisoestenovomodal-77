
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CatalogImage {
  id: string;
  image_url: string;
  title?: string;
  description?: string;
}

interface CatalogImageCarouselProps {
  images: CatalogImage[];
}

const CatalogImageCarousel: React.FC<CatalogImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log('CatalogImageCarousel: Received images:', images?.length || 0);

  if (!images || images.length === 0) {
    console.log('CatalogImageCarousel: No images to display');
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>Nenhuma imagem encontrada para este catálogo.</p>
      </div>
    );
  }

  console.log('CatalogImageCarousel: Rendering carousel with', images.length, 'images');

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentImage = images[currentIndex];

  return (
    <div className="relative w-full h-full bg-gray-50">
      <div className="w-full h-full flex items-center justify-center p-4">
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={currentImage.image_url}
            alt={currentImage.title || `Imagem ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              console.error('CatalogImageCarousel: Failed to load image:', currentImage.image_url);
              const target = e.target as HTMLImageElement;
              target.style.display = 'block';
              target.alt = 'Erro ao carregar imagem';
            }}
            onLoad={() => {
              console.log('CatalogImageCarousel: Image loaded successfully:', currentImage.image_url);
            }}
          />
          
          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <Button
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 bg-white/95 text-gray-800 hover:bg-white shadow-lg z-30 border"
                size="icon"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 bg-white/95 text-gray-800 hover:bg-white shadow-lg z-30 border"
                size="icon"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
      
      {/* Image info */}
      {(currentImage.title || currentImage.description) && (
        <div className="absolute bottom-0 left-0 right-0 bg-white/95 p-3 border-t">
          {currentImage.title && <h4 className="font-medium text-lg text-center">{currentImage.title}</h4>}
          {currentImage.description && <p className="text-gray-600 mt-1 text-center">{currentImage.description}</p>}
        </div>
      )}
      
      {/* Dots indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors border border-white/50 ${
                currentIndex === index ? 'bg-furniture-yellow' : 'bg-white/60'
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CatalogImageCarousel;
