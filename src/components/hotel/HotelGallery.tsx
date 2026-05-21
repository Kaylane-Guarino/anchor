"use client";

import Image from "next/image";
import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { is } from "date-fns/locale";

type HotelGalleryProps = {
  images: string[];
  hotelName: string;
};

const galleryCategories = [
  "Áreas comuns",
  "Piscina",
  "Opções para refeição",
  "Comodidades",
  "Vistas",
  "Ideal para famílias",
  "Acessibilidade",
];

export function HotelGallery({ images, hotelName }: HotelGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);

  const mainImage = images[0];
  const mobilePreviewImages = images.length === 3 ? images.slice(1, 3) : images.slice(1, 2);
  const remainingPhotos = Math.max(images.length - 2, 0);

  return (
    <>
      {/* Mobile */}
      <div className="grid gap-2 overflow-hidden rounded-2xl md:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="relative h-[280px] cursor-pointer bg-gray-200"
        >
          <Image
            src={mainImage}
            alt={hotelName}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </button>

        {mobilePreviewImages.length > 0 && (
          <div
            className={
              mobilePreviewImages.length === 2
                ? "grid grid-cols-2 gap-2"
                : "grid grid-cols-1 gap-2"
            }
          >
            {mobilePreviewImages.map((image, index) => {
              const shouldShowRemaining =
                images.length > 3 && index === mobilePreviewImages.length - 1;

              return (
                <button
                  key={image}
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="relative h-[140px] cursor-pointer overflow-hidden bg-gray-200"
                >
                  <Image
                    src={image}
                    alt={`${hotelName} imagem ${index + 2}`}
                    fill
                    sizes={mobilePreviewImages.length === 2 ? "50vw" : "100vw"}
                    className="object-cover"
                  />

                  {shouldShowRemaining && remainingPhotos > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/45 text-xl font-bold text-white">
                      +{remainingPhotos} fotos
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Desktop */}
      <div className="hidden gap-2 overflow-hidden rounded-2xl md:grid md:grid-cols-[2fr_1fr]">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="relative h-[360px] cursor-pointer bg-gray-200"
        >
          <Image
            src={mainImage}
            alt={hotelName}
            fill
            sizes="50vw"
            className="object-cover"
            priority
          />
        </button>

        <div className="grid grid-cols-2 gap-2">
          {images.slice(1, 5).map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setIsOpen(true)}
              className="relative h-[176px] cursor-pointer bg-gray-200"
            >
              <Image
                src={image}
                alt={`${hotelName} imagem ${index + 2}`}
                fill
                sizes="220px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <HotelGalleryModal
        open={isOpen}
        onOpenChange={setIsOpen}
        images={images}
        hotelName={hotelName}
      />
    </>
  );
}

type HotelGalleryModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images: string[];
  hotelName: string;
};

function HotelGalleryModal({
  open,
  onOpenChange,
  images,
  hotelName,
}: HotelGalleryModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  function scrollCategories(direction: "left" | "right") {
    const element = document.getElementById("gallery-categories");

    element?.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-[85vh] w-[94vw] !max-w-[1200px] overflow-hidden rounded-2xl p-0">
        <DialogTitle className="sr-only">
          Galeria de fotos do {hotelName}
        </DialogTitle>

        <div className="h-full overflow-y-auto overflow-x-hidden">
          <div className="sticky top-0 z-50 bg-white px-6 py-5">
            <div className="mb-5 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="flex min-w-0 items-center gap-4 text-xl font-bold text-secondary-text cursor-pointer"
              >
                {isDesktop ? <ArrowLeft size={24} className="shrink-0" /> : <X size={24} className="shrink-0" />}
                <span className="hidden md:truncate md:flex ">{hotelName}</span>
              </button>
            </div>
            <button
              type="button"
              onClick={() => scrollCategories("left")}
              className="absolute left-4 top-2/3 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow cursor-pointer"
            >
              <ChevronLeft />
            </button>

            <div
              id="gallery-categories"
              className="flex gap-4 overflow-hidden px-12"
            >
              {galleryCategories.map((category, index) => (
                <button
                  key={`${category}-${index}`}
                  className="relative h-[76px] min-w-[200px] overflow-hidden rounded-2xl"
                >
                  <Image
                    src={images[index % images.length]}
                    alt={category}
                    fill
                    sizes="220px"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-black/35" />

                  <span className="absolute inset-x-2 bottom-3 text-center text-base font-bold text-white">
                    {category}
                  </span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollCategories("right")}
              className="absolute right-5 top-2/3 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow cursor-pointer"
            >
              <ChevronRight />
            </button>
          </div>

          <div className="px-6 pb-10">
            <h2 className="mb-5 text-3xl font-bold text-secondary-text md:text-4xl">
              Todas as fotos ({images.length})
            </h2>

            <div className="grid w-full grid-cols-1 gap-4 overflow-x-hidden md:grid-cols-2">
              {images.map((image, index) => (
                <div key={`${image}-${index}`} className="min-w-0">
                  <div className="relative h-[260px] w-full overflow-hidden bg-gray-200 md:h-[360px] lg:h-[410px]">
                    <Image
                      src={image}
                      alt={`${hotelName} foto ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <p className="mt-2 text-base text-secondary-text md:text-lg">
                    {galleryCategories[index % galleryCategories.length]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
