export type GaleriaImagen = {
  id: number;
  url: string;
  thumb: string;
  alt: string;
};

export type Coleccion = {
  id: number;
  slug: string;
  titulo: string;
  fecha: string;
  galeria: GaleriaImagen[];
};

export type WPColeccionRaw = {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  fecha: string;
  galeria: GaleriaImagen[];
};
