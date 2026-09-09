"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const QUOTE =
  '"Cada Diseño que creamos junto a mi equipo es único y exclusivo, no porque sea inalcanzable, sino porque está hecho para cada una de ustedes. Desde su esencia, desde su historia, desde sus lugares más fuertes y los más vulnerables..."';

const QUOTE_WORDS = QUOTE.split(" ");

export const AboutComponent = () => {
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".image", {
        scrollTrigger: {
          trigger: trigger.current,
          start: "15% center",
        },
        opacity: 0,
        duration: 2,
      });

      gsap.from(".reveal", {
        scrollTrigger: {
          trigger: trigger.current,
          start: "20% center",
        },
        opacity: 0,
        yPercent: 25,
        duration: 0.5,
        stagger: 0.1,
      });

      gsap.from(".reveal-cta", {
        scrollTrigger: {
          trigger: trigger.current,
          start: "20% center",
        },
        opacity: 0,
        yPercent: 25,
        duration: 0.5,
        delay: 0.3,
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} className="bg-white px-6 py-20 sm:px-10 lg:px-14">
      <div
        ref={trigger}
        className="mx-auto flex max-w-6xl justify-between flex-col items-center gap-12 md:flex-row md:gap-16"
      >
        <div className="relative aspect-742/778 w-[78vw] max-w-[420px] shrink-0 sm:max-w-[550px]">
          <Image
            src="/assets/images/about/aboutbg.webp"
            alt=""
            width={742}
            height={778}
            aria-hidden="true"
            className="h-full w-full object-contain"
          />
          <Image
            src="/assets/images/about/diego-about.png"
            alt="Diego López"
            width={542}
            height={593}
            className="image absolute left-[16%] top-[10%] w-[80%] object-cover"
          />
        </div>

        <div className="relative flex flex-col gap-6 md:max-w-[640px]">
          <Image
            src="/assets/images/background-logo.png"
            alt=""
            width={642}
            height={601}
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-96 w-[75%] max-w-none sm:-right-16 sm:w-[85%]"
          />

          <blockquote className="flex flex-wrap gap-1 text-[20px] w-[580px] font-garet text-neutral-700">
            {QUOTE_WORDS.map((word, index) => (
              <span key={index} className="reveal">
                {word}
              </span>
            ))}
          </blockquote>

          <Link
            href="#"
            className="reveal-cta w-fit text-xs font-medium uppercase tracking-[0.15em] text-neutral-900 underline underline-offset-4 transition-opacity duration-200 hover:opacity-70"
          >
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
};
