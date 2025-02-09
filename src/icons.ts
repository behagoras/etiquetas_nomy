import type { Type } from "./types";

export const iconsMap: Record<Type, { icon: string }> = {
  default: {
    icon: 'trophy'
  },
  Anillos: {
    icon: 'ring'
  },
  Aretes: {
    icon: 'earrings'
  },
  Arracadas: {
    icon: 'torc'
  },
  Broqueles: {
    icon: 'pearl-earring'
  },
  Cadenas: {
    icon: 'primitive-necklace'
  },
  Cauchos: {
    icon: ''
  },
  Conjunto: {
    icon: 'double-necklace'
  },
  Defectuoso: {
    icon: 'frozen-ring'
  },
  Dijes: {
    icon: 'crowned-heart'
  },
  Esclavas: {
    icon: 'necklace'
  },
  Fashion: {
    icon: 'cut-diamond'
  },
  'Cadenas Fashion': {
    icon: 'cut-diamond'
  },
  Huggies: {
    icon: 'torc'
  },
  Juegos: {
    icon: 'double-necklace'
  },
  Pulseras: {
    icon: 'necklace'
  },
  Rosario: {
    icon: 'prayer-beads'
  },
  Tobillera: {
    icon: 'gem-chain'
  },
  "": {
    icon: 'trophy'
  },
};

export const getIconFromType = (type: Type) => {
  return iconsMap[type]?.icon || iconsMap.default.icon;
}