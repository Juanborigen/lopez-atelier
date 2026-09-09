import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";

const LOGO_SIZE = 140;

const FOOTER_DESCRIPTION =
  "Vestidos únicos diseñados de manera exclusiva. Experiencia privada con cita previa.";

const SOCIAL_LINKS = [
  { label: "@lopezatelier", href: "#", Icon: InstagramIcon },
  { label: "@lopezatelier", href: "#", Icon: FacebookIcon },
  { label: "@lopezatelier", href: "#", Icon: LinkedInIcon },
  { label: "@lopezatelier", href: "#", Icon: YoutubeIcon },
];

export const Footer = () => (
  <footer className="bg-black px-6 pb-10 pt-16 text-white sm:px-10 lg:px-14">
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-y-16 md:grid-cols-3 md:gap-x-12">
      <div className="flex flex-col gap-6">
        <Link
          href="/"
          className="flex flex-col items-center transition-opacity duration-200 hover:opacity-80"
        >
          <Image
            src="/assets/images/logo-white.svg"
            alt="López Couture"
            width={LOGO_SIZE}
            height={LOGO_SIZE}
          />
        </Link>

        <p className="max-w-xs text-sm text-white/80">{FOOTER_DESCRIPTION}</p>
      </div>

      <div className="md:border-l md:border-white/10 md:pl-12">
        <span className="text-xs font-medium uppercase tracking-[0.15em] text-white/60">
          Navegación
        </span>

        <ul className="mt-4 border-t border-white/10">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="border-b border-white/10">
              <Link
                href={link.href}
                className="block py-5 text-sm text-white transition-opacity duration-200 hover:opacity-70"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="md:border-l md:border-white/10 md:pl-12">
        <div className="md:mt-32">
          <span className="text-xs font-medium uppercase tracking-[0.15em] text-white/60">
            Nuestras redes
          </span>

          <ul className="mt-4 border-t border-white/10">
            {SOCIAL_LINKS.map(({ label, href, Icon }, index) => (
              <li key={index} className="border-b border-white/10">
                <Link
                  href={href}
                  className="flex items-center gap-3 py-5 transition-opacity duration-200 hover:opacity-70"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-black">
                    <Icon className="size-4" />
                  </span>
                  <span className="text-sm text-white underline underline-offset-4">
                    {label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-2 md:col-span-2 md:col-start-2">
        <p className="text-sm text-white/50">
          Created by <span className="font-bold text-white">hipposoft</span> |
          All Right Reserved
        </p>
      </div>
    </div>
  </footer>
);

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth={1.6} />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth={1.6} />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M14.5 8.5h2V5.5h-2c-2.1 0-3.5 1.5-3.5 3.6V11H9v3h2v6h3v-6h2.3l.5-3H14v-1.4c0-.6.3-1.1 1.5-1.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="4" y="9.5" width="2.6" height="9" fill="currentColor" />
      <circle cx="5.3" cy="5.5" r="1.6" fill="currentColor" />
      <path
        d="M10 9.5h2.5v1.3c.5-.9 1.5-1.5 2.9-1.5 2.4 0 3.6 1.5 3.6 4.2V18.5h-2.6v-4.5c0-1.4-.5-2.2-1.7-2.2-1.1 0-1.7.8-1.7 2.2v4.5H10V9.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect
        x="3"
        y="6"
        width="18"
        height="12"
        rx="3.5"
        stroke="currentColor"
        strokeWidth={1.6}
      />
      <path d="M10.5 9.5v5l4.3-2.5-4.3-2.5Z" fill="currentColor" />
    </svg>
  );
}
