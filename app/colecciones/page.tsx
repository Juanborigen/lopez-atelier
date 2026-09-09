import Image from "next/image";
import { getColecciones } from "@/lib/coleccion";

export default async function ColeccionesPage() {
  const colecciones = await getColecciones();

  if (colecciones.length === 0) {
    return (
      <main className="px-6 py-20 text-center text-sm text-neutral-500 sm:px-10 lg:px-14">
        No hay colecciones publicadas todavía.
      </main>
    );
  }

  return (
    <main className="px-6 py-20 sm:px-10 lg:px-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-20">
        {colecciones.map((coleccion) => (
          <section key={coleccion.id} className="flex flex-col gap-6">
            <div className="flex items-baseline gap-3">
              <h2 className="font-garet text-2xl">{coleccion.titulo}</h2>
              <span className="text-sm text-neutral-400">
                {coleccion.fecha}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {coleccion.galeria.map((imagen) => (
                <div
                  key={imagen.id}
                  className="relative aspect-square overflow-hidden bg-neutral-100"
                >
                  <Image
                    src={imagen.url}
                    alt={imagen.alt || coleccion.titulo}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
