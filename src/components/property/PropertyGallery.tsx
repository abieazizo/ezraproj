"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export default function PropertyGallery({
  images,
  title,
}: PropertyGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + images.length) % images.length);
    },
    [images.length]
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  const goMobilePrev = () =>
    setMobileIndex((prev) => (prev - 1 + images.length) % images.length);
  const goMobileNext = () =>
    setMobileIndex((prev) => (prev + 1) % images.length);

  // Keyboard support
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          goPrev();
          break;
        case "ArrowRight":
          goNext();
          break;
        case "Escape":
          closeLightbox();
          break;
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen, goPrev, goNext, closeLightbox]);

  if (images.length === 0) {
    return (
      <div className="w-full h-[400px] bg-brand-cream rounded-xl flex items-center justify-center">
        <div className="text-center text-brand-slate">
          <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-40" />
          <p className="text-sm">No photos available</p>
        </div>
      </div>
    );
  }

  // Desktop grid thumbnails (up to 4 besides main)
  const gridThumbnails = images.slice(1, 5);
  const remainingCount = images.length - 5;

  return (
    <>
      {/* Desktop gallery grid */}
      <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 rounded-xl overflow-hidden h-[480px]">
        {/* Main large image */}
        <button
          onClick={() => openLightbox(0)}
          className="col-span-2 row-span-2 relative overflow-hidden cursor-pointer group"
        >
          <Image
            src={images[0]}
            alt={`${title} - Main`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="50vw"
            priority
          />
        </button>

        {/* Thumbnails */}
        {gridThumbnails.map((img, i) => {
          const isLast = i === gridThumbnails.length - 1 && remainingCount > 0;
          return (
            <button
              key={i}
              onClick={() => openLightbox(i + 1)}
              className="relative overflow-hidden cursor-pointer group"
            >
              <Image
                src={img}
                alt={`${title} - ${i + 2}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="25vw"
              />
              {isLast && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    View All {images.length} Photos
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Mobile single image carousel */}
      <div className="md:hidden relative rounded-xl overflow-hidden h-[300px]">
        <Image
          src={images[mobileIndex]}
          alt={`${title} - ${mobileIndex + 1}`}
          fill
          className="object-cover"
          sizes="100vw"
          priority={mobileIndex === 0}
        />

        {/* Mobile nav arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goMobilePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-brand-navy" />
            </button>
            <button
              onClick={goMobileNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-brand-navy" />
            </button>
          </>
        )}

        {/* Dots / counter */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
          {mobileIndex + 1} / {images.length}
        </div>

        {/* Tap to open lightbox */}
        <button
          onClick={() => openLightbox(mobileIndex)}
          className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm text-brand-navy text-xs font-semibold px-3 py-1.5 rounded-full"
        >
          View All
        </button>
      </div>

      {/* Lightbox modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col"
          role="dialog"
          aria-label="Image gallery"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-white/70 text-sm font-medium">
              {activeIndex + 1} / {images.length}
            </span>
            <button
              onClick={closeLightbox}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Close gallery"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Main image area */}
          <div className="flex-1 relative flex items-center justify-center px-16">
            <div className="relative w-full h-full max-w-5xl max-h-[70vh]">
              <Image
                src={images[activeIndex]}
                alt={`${title} - ${activeIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {/* Nav arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail strip */}
          <div className="px-4 py-3 overflow-x-auto">
            <div className="flex gap-2 justify-center">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all",
                    i === activeIndex
                      ? "border-brand-gold opacity-100"
                      : "border-transparent opacity-50 hover:opacity-80"
                  )}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
