import Link from "next/link";

const EYEBROW = "Experiencia López Couture";

const PARAGRAPH_PRIMARY =
  "La experiencia López Couture es la materialización de un sueño que comienza con un trazo y termina en el altar.";

const PARAGRAPH_SECONDARY =
  "Alta costura nupcial donde la elegancia contemporánea se encuentra con la tradición, dando lugar a creaciones exclusivas que celebran la individualidad de cada novia.";

export const ExperienciaHome = () => (
  <section className="bg-[#bcab98] px-6 py-24 sm:px-10 sm:py-32 lg:px-14">
    <div className="flex mx-auto flex-col gap-8 max-w-6xl">
      <span className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-900">
        {EYEBROW}
      </span>

      <p className=" font-garet max-w-lg leading-relaxed text-black">
        {PARAGRAPH_PRIMARY}
        <br />
        {PARAGRAPH_SECONDARY}
      </p>

      <Link
        href="/experiencia"
        className="w-fit text-xs font-medium uppercase tracking-[0.15em] text-neutral-900 underline underline-offset-4 transition-opacity duration-200 hover:opacity-70"
      >
        Ver más
      </Link>
    </div>
  </section>
);
