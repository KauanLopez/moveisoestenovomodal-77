
import * as React from "react";
import { cn } from "@/lib/utils";
import { CarouselContext, type CarouselProps } from "./carousel-context";
import useEmblaCarousel from "embla-carousel-react";

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      autoPlay = false,
      autoInterval = 4000,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const autoPlayIntervalRef = React.useRef<NodeJS.Timeout | null>(null);

    const onSelect = React.useCallback((emblaApi: ReturnType<typeof useEmblaCarousel>[1]) => {
      if (!emblaApi) {
        return;
      }

      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );

    // Autoplay functionality
    React.useEffect(() => {
      if (api && autoPlay) {
        const autoPlayFunction = () => {
          if (document.visibilityState === 'visible') {
            api.scrollNext();
          }
        };

        // Clear any existing interval
        if (autoPlayIntervalRef.current) {
          clearInterval(autoPlayIntervalRef.current);
        }

        // Start new autoplay interval
        autoPlayIntervalRef.current = setInterval(autoPlayFunction, autoInterval);

        return () => {
          if (autoPlayIntervalRef.current) {
            clearInterval(autoPlayIntervalRef.current);
          }
        };
      }
      
      return undefined;
    }, [api, autoPlay, autoInterval]);

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          autoPlay,
          autoInterval,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

export { Carousel };
