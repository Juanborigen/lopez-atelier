"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LANGUAGES, NAV_LINKS } from "@/lib/constants";

const LOGO_SIZE = 80;

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [language, setLanguage] = useState<(typeof LANGUAGES)[number]>(
    LANGUAGES[0]
  );

  return (
    <header className="sticky top-0 z-50 bg-neutral-950 text-white">
      <div className="flex items-center justify-center gap-4 px-6 py-4 sm:px-10 lg:px-14 mx-auto">
        <Link
          href="/"
          className="flex flex-col items-center gap-1 transition-opacity duration-200 hover:opacity-80"
        >
          <Image
            src="/assets/images/logo-white.png"
            alt="López Couture"
            width={LOGO_SIZE}
            height={LOGO_SIZE}
            priority
          />
        </Link>

        <nav className="hidden items-center gap-16 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium uppercase tracking-[0.15em] text-white/90 transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </Link>
          ))}

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLangOpen((prev) => !prev)}
              aria-expanded={isLangOpen}
              aria-haspopup="listbox"
              className="flex items-center gap-1 text-xs font-medium uppercase tracking-[0.15em] text-white/90 transition-colors duration-200 hover:text-white"
            >
              {language}
              <ChevronIcon
                className={`size-3 transition-transform duration-200 ${
                  isLangOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isLangOpen && (
              <ul
                role="listbox"
                className="absolute right-0 mt-3 min-w-20 rounded-md border border-white/10 bg-neutral-950 py-1 shadow-lg"
              >
                {LANGUAGES.map((lang) => (
                  <li key={lang}>
                    <button
                      type="button"
                      onClick={() => {
                        setLanguage(lang);
                        setIsLangOpen(false);
                      }}
                      className="block w-full px-3 py-1.5 text-left text-xs uppercase tracking-[0.15em] text-white/90 transition-colors duration-200 hover:text-white"
                    >
                      {lang}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-label="Abrir menú"
          className="flex flex-col gap-1.5 lg:hidden"
        >
          <span
            className={`h-px w-6 bg-white transition-transform duration-200 ${
              isMenuOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-white transition-opacity duration-200 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-white transition-transform duration-200 ${
              isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {isMenuOpen && (
        <nav className="flex flex-col gap-6 border-t border-white/10 px-6 py-8 lg:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-medium uppercase tracking-[0.15em] text-white/90 transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </Link>
          ))}

          <div className="flex gap-4 pt-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                className={`text-xs font-medium uppercase tracking-[0.15em] transition-colors duration-200 ${
                  language === lang
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

const ChevronIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 12 8"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    <path
      d="M1 1.5L6 6.5L11 1.5"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
