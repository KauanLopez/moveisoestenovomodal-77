
import React from 'react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { X, Loader2 } from 'lucide-react';

interface ProductImageDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedImage: string | null;
}

const ProductImageDialog = ({ 
  isOpen, 
  onOpenChange, 
  selectedImage
}: ProductImageDialogProps) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadError, setLoadError] = React.useState(false);

  React.useEffect(() => {
    if (selectedImage) {
      setIsLoading(true);
      setLoadError(false);
    }
  }, [selectedImage]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[90vw] max-h-[90vh] p-0 border-none bg-transparent">
        <DialogTitle>
          <VisuallyHidden>Visualização em tela cheia</VisuallyHidden>
        </DialogTitle>
        <div className="relative w-full h-full flex items-center justify-center">
          {isLoading && selectedImage && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <Loader2 className="h-10 w-10 animate-spin text-white" />
            </div>
          )}
          {selectedImage && (
            <img 
              src={selectedImage} 
              alt="Visualização em tela cheia" 
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setLoadError(true);
              }}
            />
          )}
          {loadError && (
            <div className="bg-white/80 p-4 rounded-lg text-center">
              <p className="text-red-500">Não foi possível carregar a imagem</p>
            </div>
          )}
          <button 
            onClick={() => onOpenChange(false)} 
            className="absolute top-3 right-3 bg-white/70 hover:bg-white rounded-full p-2 transition-colors"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductImageDialog;
