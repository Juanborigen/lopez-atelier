import type { Coleccion, WPColeccionRaw } from "@/types/coleccion";

const WP_API_BASE_URL =
  "https://olivedrab-seahorse-981397.hostingersite.com/wp-json/wp/v2";
const COLECCION_ENDPOINT = `${WP_API_BASE_URL}/coleccion`;
const REVALIDATE_SECONDS = 3600;

export class WPFetchError extends Error {
  constructor(
    message: string,
    public readonly status?: number
  ) {
    super(message);
    this.name = "WPFetchError";
  }
}

const mapWPColeccionToColeccion = (raw: WPColeccionRaw): Coleccion => ({
  id: raw.id,
  slug: raw.slug,
  titulo: raw.title.rendered,
  fecha: raw.fecha,
  galeria: raw.galeria,
});

export const getColecciones = async (): Promise<Coleccion[]> => {
  const response = await fetch(COLECCION_ENDPOINT, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new WPFetchError(
      `No se pudo obtener el listado de colecciones (${response.status})`,
      response.status
    );
  }

  const raw = (await response.json()) as WPColeccionRaw[];

  return raw.map(mapWPColeccionToColeccion);
};

export const getColeccionBySlug = async (
  slug: string
): Promise<Coleccion | null> => {
  const response = await fetch(
    `${COLECCION_ENDPOINT}?slug=${encodeURIComponent(slug)}`,
    { next: { revalidate: REVALIDATE_SECONDS } }
  );

  if (!response.ok) {
    throw new WPFetchError(
      `No se pudo obtener la colección "${slug}" (${response.status})`,
      response.status
    );
  }

  const raw = (await response.json()) as WPColeccionRaw[];

  if (raw.length === 0) {
    return null;
  }

  return mapWPColeccionToColeccion(raw[0]);
};

export const getColeccionById = async (
  id: number
): Promise<Coleccion | null> => {
  const response = await fetch(`${COLECCION_ENDPOINT}/${id}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new WPFetchError(
      `No se pudo obtener la colección #${id} (${response.status})`,
      response.status
    );
  }

  const raw = (await response.json()) as WPColeccionRaw;

  return mapWPColeccionToColeccion(raw);
};
