"use client";

import Image from "next/image";
import { useState } from "react";
import { IMAGES_PER_COLLECTION } from "@/lib/constants";
import type { Coleccion, GaleriaImagen } from "@/types/coleccion";

const TILE_LAYOUT = [
  "aspect-4/5 sm:aspect-auto sm:flex-3",
  "aspect-4/5 sm:aspect-auto sm:flex-2",
  "aspect-4/5 sm:aspect-auto sm:flex-2",
  "aspect-4/5 sm:aspect-auto sm:flex-3",
];

type GalleryGridProps = {
  colecciones: Coleccion[];
};

export const GalleryGrid = ({ colecciones }: GalleryGridProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (colecciones.length === 0) {
    return null;
  }

  const lastCollectionIndex = colecciones.length - 1;
  const activeCollection = colecciones[activeIndex];
  const activeImages = activeCollection.galeria.slice(0, IMAGES_PER_COLLECTION);

  const goToNextCollection = () => {
    setActiveIndex((prev) => (prev === lastCollectionIndex ? 0 : prev + 1));
  };

  return (
    <section className="bg-white px-6 py-10 sm:px-10 lg:px-14">
      <div className="mx-auto flex max-w-6xl flex-col">
        <CollectionHeader
          name={activeCollection.titulo}
          onNext={goToNextCollection}
        />

        <MosaicGrid
          images={activeImages}
          collectionName={activeCollection.titulo}
          interactive
          onImageClick={() => setIsLightboxOpen(true)}
        />

        <ProgressSlider isLastActive={activeIndex === lastCollectionIndex} />

        <GalleryLinks />
      </div>

      {isLightboxOpen && (
        <Lightbox
          collectionName={activeCollection.titulo}
          images={activeImages}
          isLastActive={activeIndex === lastCollectionIndex}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}
    </section>
  );
};

const CollectionHeader = ({
  name,
  onNext,
}: {
  name: string;
  onNext: () => void;
}) => (
  <div className="flex items-center justify-between">
    <span className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-900">
      {name}
    </span>
    <button
      type="button"
      onClick={onNext}
      aria-label="Siguiente colección"
      className="text-neutral-900 transition-transform duration-200 hover:translate-x-1"
    >
      <ArrowIcon className="size-4" />
    </button>
  </div>
);

const MosaicGrid = ({
  images,
  collectionName,
  interactive,
  onImageClick,
}: {
  images: GaleriaImagen[];
  collectionName: string;
  interactive: boolean;
  onImageClick?: () => void;
}) => {
  const firstColumn = images.slice(0, 2);
  const secondColumn = images.slice(2, 4);

  return (
    <div className="mt-6 flex flex-col gap-6 sm:aspect-11/10 sm:grid sm:grid-cols-2">
      <div className="flex flex-col gap-6 sm:h-full">
        {firstColumn.map((image, index) => (
          <ImageTile
            key={image.id}
            image={image}
            alt={image.alt || collectionName}
            interactive={interactive}
            onClick={onImageClick}
            className={TILE_LAYOUT[index]}
          />
        ))}
      </div>
      <div className="flex flex-col gap-6 sm:h-full">
        {secondColumn.map((image, index) => (
          <ImageTile
            key={image.id}
            image={image}
            alt={image.alt || collectionName}
            interactive={interactive}
            onClick={onImageClick}
            className={TILE_LAYOUT[index + 2]}
          />
        ))}
      </div>
    </div>
  );
};

const ImageTile = ({
  image,
  alt,
  interactive,
  onClick,
  className,
}: {
  image: GaleriaImagen;
  alt: string;
  interactive: boolean;
  onClick?: () => void;
  className: string;
}) => {
  const tileClassName = `group relative w-full overflow-hidden bg-neutral-200 transition-colors duration-200 ${
    interactive ? "hover:brightness-90" : ""
  } ${className}`;

  const content = (
    <>
      <Image
        src={image.url}
        alt={alt}
        fill
        sizes="(min-width: 640px) 50vw, 100vw"
        className="object-cover"
      />
      <ExpandIcon className="absolute right-3 top-3 size-4 text-white drop-shadow" />
    </>
  );

  if (!interactive) {
    return <div className={tileClassName}>{content}</div>;
  }

  return (
    <button type="button" onClick={onClick} className={tileClassName}>
      {content}
    </button>
  );
};

const ProgressSlider = ({ isLastActive }: { isLastActive: boolean }) => (
  <div className="relative mt-8 h-px w-full bg-neutral-200">
    <div
      className={`absolute inset-y-0 left-0 h-px w-1/2 bg-neutral-900 transition-transform duration-500 ease-out ${
        isLastActive ? "translate-x-full" : "translate-x-0"
      }`}
    />
  </div>
);

const GalleryLinks = () => (
  <div className="flex items-center justify-between pt-6">
    <a
      href="#"
      className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-900 underline underline-offset-4 transition-opacity duration-200 hover:opacity-70"
    >
      Ver colección completa
    </a>
    <a
      href="#"
      className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-900 underline underline-offset-4 transition-opacity duration-200 hover:opacity-70"
    >
      Ver todas
    </a>
  </div>
);

const Lightbox = ({
  collectionName,
  images,
  isLastActive,
  onClose,
}: {
  collectionName: string;
  images: GaleriaImagen[];
  isLastActive: boolean;
  onClose: () => void;
}) => (
  <div className="fixed inset-0 z-60 overflow-y-auto bg-neutral-200 px-6 py-10 sm:px-10 lg:px-14">
    <div className="mx-auto flex max-w-6xl flex-col">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-900">
          {collectionName}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="text-neutral-900 transition-transform duration-200 hover:-translate-x-1"
        >
          <ArrowIcon className="size-4 rotate-180" />
        </button>
      </div>

      <MosaicGrid
        images={images}
        collectionName={collectionName}
        interactive={false}
      />

      <ProgressSlider isLastActive={isLastActive} />

      <GalleryLinks />
    </div>
  </div>
);

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 10" fill="none" aria-hidden="true" className={className}>
    <path
      d="M0 5H23M18 1L23 5L18 9"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ExpandIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
    <path
      d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4v-4"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
