import Hero from "@/components/Hero";
import { GalleryGrid } from "@/components/GalleryGrid";
import { SecondDressHome } from "@/components/SecondDressHome";
import { AboutComponent } from "@/components/AboutComponent";
import { ExperienciaHome } from "@/components/ExperienciaHome";
import { getColecciones } from "@/lib/coleccion";

export default async function Home() {
  const colecciones = await getColecciones();

  return (
    <main>
      <Hero />
      <GalleryGrid colecciones={colecciones} />
      <SecondDressHome />
      <ExperienciaHome />
      <AboutComponent />
    </main>
  );
}
