import { useEffect, useState, useRef, useCallback } from 'react';
import { useMobileDetection } from './useMobileDetection';
import { useAutoScroll } from './useAutoScroll';

interface Product {
  id: string;
  title: string;
  image: string;
}

export const useCarouselLogic = (products: Product[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useMobileDetection();
  
  const extendedProducts = products.length > 0 ? [...products, ...products, ...products] : [];
  const totalItems = products.length;

  const carouselRef = useRef<HTMLDivElement>(null);
  const itemWidthRef = useRef<number>(0);
  const containerWidthRef = useRef<number>(0);
  
  const userInteractionTimeoutRef = useRef<NodeJS.Timeout>();
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [initialScrollLeft, setInitialScrollLeft] = useState(0);
  
  // Flag única para indicar que um scroll programático está em andamento (snap, teleporte, auto-scroll).
  const isProgrammaticScrollRef = useRef(false);
  // Timeout para o debounce do snap no handleScroll (para scrolls manuais não-arraste).
  const scrollEndDebounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialSnapDoneRef = useRef(false);

  const updateDimensions = useCallback(() => {
    if (carouselRef.current) {
      containerWidthRef.current = carouselRef.current.offsetWidth;
      if (carouselRef.current.firstElementChild && totalItems > 0) {
        itemWidthRef.current = (carouselRef.current.firstElementChild as HTMLElement).offsetWidth;
      } else {
        itemWidthRef.current = 0;
      }
    }
  }, [totalItems]);

  useEffect(() => {
    if (totalItems > 0) {
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        const currentCarouselRef = carouselRef.current;
        let observer: ResizeObserver | null = null;
        if (currentCarouselRef) {
            observer = new ResizeObserver(updateDimensions);
            observer.observe(currentCarouselRef);
        }
        return () => {
            window.removeEventListener('resize', updateDimensions);
            if (currentCarouselRef && observer) {
                observer.unobserve(currentCarouselRef);
            }
            if (scrollEndDebounceTimeoutRef.current) {
                clearTimeout(scrollEndDebounceTimeoutRef.current);
            }
            if (userInteractionTimeoutRef.current) {
                clearTimeout(userInteractionTimeoutRef.current);
            }
        };
    }
  }, [updateDimensions, totalItems]);

  // Efeito para prevenir o scroll com a roda do mouse
  useEffect(() => {
    const carouselElement = carouselRef.current;
    const preventWheelScroll = (event: WheelEvent) => {
      if (carouselElement && carouselElement.contains(event.target as Node)) {
        event.preventDefault();
      }
    };
    if (carouselElement) {
      carouselElement.addEventListener('wheel', preventWheelScroll, { passive: false });
    }
    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener('wheel', preventWheelScroll);
      }
    };
  }, []);


  const handleUserInteraction = useCallback(() => {
    setIsUserInteracting(true); 
    if (userInteractionTimeoutRef.current) {
      clearTimeout(userInteractionTimeoutRef.current);
    }
    userInteractionTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false); 
    }, 5000); // 5 segundos de delay após interação para auto-scroll reiniciar
  }, []);
  
  const calculateScrollLeftForCenter = useCallback((physicalIndex: number) => {
    if (itemWidthRef.current === 0 || containerWidthRef.current === 0) return 0;
    const itemCenterOffset = (physicalIndex * itemWidthRef.current) + (itemWidthRef.current / 2);
    const containerCenterOffset = containerWidthRef.current / 2;
    return itemCenterOffset - containerCenterOffset;
  }, []);

  const snapToItem = useCallback((logicalIndexToSnap: number, smooth = true) => {
    if (!carouselRef.current || totalItems === 0 || itemWidthRef.current === 0) {
        isProgrammaticScrollRef.current = false; // Garante reset se sair cedo
        return;
    }
    
    const newLogicalIndex = (logicalIndexToSnap % totalItems + totalItems) % totalItems;

    isProgrammaticScrollRef.current = true; // Inicia scroll programático
    
    // Limpa qualquer snap pendente do handleScroll para evitar conflito
    if (scrollEndDebounceTimeoutRef.current) {
        clearTimeout(scrollEndDebounceTimeoutRef.current);
        scrollEndDebounceTimeoutRef.current = null;
    }
    
    const targetPhysicalIndex = newLogicalIndex + totalItems;
    const targetScrollLeft = calculateScrollLeftForCenter(targetPhysicalIndex);
    const currentScroll = carouselRef.current.scrollLeft;

    if (smooth && Math.abs(currentScroll - targetScrollLeft) < 2 && currentIndex === newLogicalIndex) {
        if (currentIndex !== newLogicalIndex) setCurrentIndex(newLogicalIndex);
        setTimeout(() => { isProgrammaticScrollRef.current = false; }, 50);
        return;
    }
    
    carouselRef.current.scrollTo({
      left: targetScrollLeft,
      behavior: smooth ? 'smooth' : 'auto',
    });
    
    if (currentIndex !== newLogicalIndex) {
        setCurrentIndex(newLogicalIndex);
    }
    
    const timeoutDuration = smooth ? 500 : 70; 
    setTimeout(() => { 
      isProgrammaticScrollRef.current = false; 
    }, timeoutDuration);

  }, [totalItems, calculateScrollLeftForCenter, currentIndex]);

  const onDragStart = useCallback((clientX: number, event?: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (event?.type === 'mousedown') {
        (event as React.MouseEvent<HTMLDivElement>).preventDefault();
    }
    if (!carouselRef.current || totalItems === 0 || !itemWidthRef.current || isDragging) return;
    
    if (scrollEndDebounceTimeoutRef.current) clearTimeout(scrollEndDebounceTimeoutRef.current);
    isProgrammaticScrollRef.current = true; // O drag é uma forma de scroll controlado

    handleUserInteraction();
    setIsDragging(true); 
    setStartX(clientX);
    setInitialScrollLeft(carouselRef.current.scrollLeft);
    if (carouselRef.current) {
      carouselRef.current.style.scrollBehavior = 'auto';
      carouselRef.current.style.cursor = 'grabbing';
    }
  }, [handleUserInteraction, totalItems, isDragging]);

  const onDragMove = useCallback((clientX: number) => {
    if (!isDragging || !carouselRef.current) return;
    const x = clientX;
    const walk = (x - startX);
    carouselRef.current.scrollLeft = initialScrollLeft - walk;
  }, [isDragging, startX, initialScrollLeft]);

  const onDragEnd = useCallback(() => {
    if (!isDragging || !carouselRef.current || totalItems === 0 || !itemWidthRef.current) {
      if (isDragging) setIsDragging(false); 
      if (carouselRef.current) carouselRef.current.style.cursor = 'grab';
      isProgrammaticScrollRef.current = false; // Garante reset se não estava arrastando ou saiu cedo
      return;
    }

    const finalScrollLeft = carouselRef.current.scrollLeft;
            
    if (carouselRef.current) {
        carouselRef.current.style.scrollBehavior = 'smooth';
        carouselRef.current.style.cursor = 'grab';
    }

    const centerOfViewport = finalScrollLeft + containerWidthRef.current / 2;
    const physicalIndexWhoseSlotContainsCenter = Math.floor(centerOfViewport / itemWidthRef.current);
    let logicalIndexToSnap = (physicalIndexWhoseSlotContainsCenter % totalItems + totalItems) % totalItems;
    
    // Importante: Resetar isDragging antes de iniciar o snap, 
    // mas o snap em si é programático.
    setIsDragging(false); 
    snapToItem(logicalIndexToSnap, true); // snapToItem gerencia isProgrammaticScrollRef
    
    handleUserInteraction(); // Reinicia timer para auto-scroll após o fim do arraste

  }, [isDragging, totalItems, snapToItem, itemWidthRef, containerWidthRef, handleUserInteraction]);


  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => { if(isDragging) onDragMove(e.pageX); };
    const handleGlobalMouseUp = () => { if(isDragging) onDragEnd(); }; 
    const handleGlobalTouchMove = (e: TouchEvent) => { if (isDragging) onDragMove(e.touches[0].clientX); };
    const handleGlobalTouchEnd = () => { if(isDragging) onDragEnd(); };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('touchmove', handleGlobalTouchMove, { passive: true });
      document.addEventListener('touchend', handleGlobalTouchEnd);
    }
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [isDragging, onDragMove, onDragEnd]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => onDragStart(e.pageX, e), [onDragStart]);
  const handleTouchStartCallback = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    onDragStart(e.touches[0].clientX, e);
  }, [onDragStart]);

  const handleScroll = useCallback(() => {
    // Ignora eventos de scroll se:
    // - Um scroll programático (snap, teleporte) estiver em progresso.
    // - O usuário estiver atualmente arrastando (onDragEnd cuidará do snap).
    if (isProgrammaticScrollRef.current || isDragging || 
        !carouselRef.current || totalItems === 0 || itemWidthRef.current === 0) {
      return;
    }

    const container = carouselRef.current;
    const currentScroll = container.scrollLeft;
    const oneSetWidth = totalItems * itemWidthRef.current;

    // Lógica de teletransporte para scroll infinito
    const physicalIndexAtScrollStart = currentScroll / itemWidthRef.current;
    const teleportBuffer = itemWidthRef.current * 0.1; // 10% da largura de um item como buffer
    
    // Condição para teletransportar da esquerda para o meio
    if (physicalIndexAtScrollStart < (totalItems - 1 + teleportBuffer) && currentScroll > teleportBuffer * 0.5 ) { 
        isProgrammaticScrollRef.current = true;
        container.scrollLeft += oneSetWidth;
        setTimeout(() => { isProgrammaticScrollRef.current = false; }, 70);
        return; 
    // Condição para teletransportar da direita para o meio
    } else if (physicalIndexAtScrollStart > (totalItems * 2 - teleportBuffer) && physicalIndexAtScrollStart < extendedProducts.length - 0.05) { 
        isProgrammaticScrollRef.current = true;
        container.scrollLeft -= oneSetWidth;
        setTimeout(() => { isProgrammaticScrollRef.current = false; }, 70);
        return;
    }
    
    // Atualiza o currentIndex (para dots/auto-scroll) durante scroll manual livre,
    // APENAS se nenhum scroll programático ou arraste estiver ocorrendo.
    if (!isProgrammaticScrollRef.current && !isDragging) {
        const centerOfViewport = currentScroll + containerWidthRef.current / 2;
        const physicalIndexAtCenter = Math.floor(centerOfViewport / itemWidthRef.current);
        let newLogicalIndex = (physicalIndexAtCenter % totalItems + totalItems) % totalItems;
        
        if (currentIndex !== newLogicalIndex) {
             setCurrentIndex(newLogicalIndex);
        }
    }

    // Debounce para o snap magnético APENAS para scrolls manuais (scrollbar, se visível)
    // que não são originados de um drag ou outro snap programático.
    if (scrollEndDebounceTimeoutRef.current) clearTimeout(scrollEndDebounceTimeoutRef.current);
    scrollEndDebounceTimeoutRef.current = setTimeout(() => {
      // Re-checa todas as flags no momento da execução do timeout
      if (!isDragging && !isProgrammaticScrollRef.current && 
          carouselRef.current && itemWidthRef.current > 0) {
        const finalScroll = carouselRef.current.scrollLeft;
        const centerOfViewport = finalScroll + containerWidthRef.current / 2;
        const physicalIndexAtCenter = Math.floor(centerOfViewport / itemWidthRef.current);
        let finalLogicalIndex = (physicalIndexAtCenter % totalItems + totalItems) % totalItems;
        
        snapToItem(finalLogicalIndex, true); // isFromDragEnd é implicitamente false
      }
    }, 250); 

  }, [isDragging, totalItems, itemWidthRef, containerWidthRef, extendedProducts.length, snapToItem, currentIndex, calculateScrollLeftForCenter]);

  useAutoScroll(isUserInteracting, totalItems, currentIndex, snapToItem);

  useEffect(() => {
    if (!initialSnapDoneRef.current && totalItems > 0 && carouselRef.current) {
        const initSetup = () => {
            updateDimensions(); 
            if (itemWidthRef.current > 0) { 
                snapToItem(0, false); // isFromDragEnd é implicitamente false
                initialSnapDoneRef.current = true;
            } else {
                setTimeout(initSetup, 150); 
            }
        };
        const initTimeout = setTimeout(initSetup, 200); 
        return () => clearTimeout(initTimeout);
    }
  }, [totalItems, snapToItem, updateDimensions]);

  return {
    carouselRef,
    currentIndex,
    isMobile,
    extendedProducts,
    totalItems,
    snapToItem,
    handleScroll,
    handleMouseDown,
    handleTouchStart: handleTouchStartCallback,
    isDragging,
  };
};