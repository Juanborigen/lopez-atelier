import Link from "next/link";
import { SLIDER_GALLERY_SLIDE_COUNT } from "@/lib/constants";

const SLIDE_INDEXES = Array.from(
  { length: SLIDER_GALLERY_SLIDE_COUNT },
  (_, index) => index
);

export type SliderGalleryProps = {
  title: string;
  year: number;
  textLink: string;
  link: string;
};

export const SliderGallery = ({
  title,
  year,
  textLink,
  link,
}: SliderGalleryProps) => (
  <section className="bg-white px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
    <div className="relative mx-auto max-w-6xl">
      <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto scrollbar-none [-ms-overflow-style:none]">
        {SLIDE_INDEXES.map((index) => (
          <div
            key={index}
            className="aspect-5/6 w-72 shrink-0 snap-start bg-neutral-200 sm:w-96 lg:w-105"
          />
        ))}
      </div>

      <SlideCaption title={title} year={year} textLink={textLink} link={link} />
    </div>
  </section>
);

const SlideCaption = ({ title, year, textLink, link }: SliderGalleryProps) => (
  <div className="absolute bottom-4 left-4 flex items-center gap-3 bg-white px-4 py-2">
    <span className="text-sm text-neutral-900">{title}</span>
    <span className="text-sm text-neutral-400">{year}</span>
    <Link
      href={link}
      className="text-xs font-medium uppercase tracking-[0.1em] text-neutral-900 underline underline-offset-4 transition-opacity duration-200 hover:opacity-70"
    >
      {textLink}
    </Link>
  </div>
);
