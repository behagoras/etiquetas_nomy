import type { Type } from "./types";

export const iconsMap: Record<Type, { icon: string, color: string }> = {
  default: {
    icon: 'trophy',
    color: 'gray'
  },
  "": {
    icon: 'trophy',
    color: 'gray'
  },
  Cauchos: {
    icon: '',
    color: 'gray'
  },
  Defectuoso: {
    icon: 'frozen-ring',
    color: 'gray'
  },
  Dijes: {
    icon: 'crowned-heart',
    color: 'purple'
  },
  Fashion: {
    icon: 'cut-diamond',
    color: 'chocolate'
  },
  'Cadenas Fashion': {
    icon: 'primitive-necklace',
    color: 'chocolate'
  },
  'Cadena Fashion': {
    icon: 'primitive-necklace',
    color: 'chocolate'
  },
  Aretes: {
    icon: 'earrings',
    color: 'darkgreen'
  },
  Esclavas: {
    icon: 'necklace',
    color: 'chocolate'
  },
  Pulseras: {
    icon: 'necklace',
    color: 'darkbrown'
  },
  Anillos: {
    icon: 'ring',
    color: 'goldenrod'
  },
  Broqueles: {
    icon: 'pearl-earring',
    color: 'darkred'
  },
  Rosario: {
    icon: 'prayer-beads',
    color: 'darkbrown'
  },
  Conjunto: {
    icon: 'double-necklace',
    color: 'crimson'
  },
  Juegos: {
    icon: 'double-necklace',
    color: 'crimson'
  },
  Arracadas: {
    icon: 'torc',
    color: 'darkgreen'
  },
  Huggies: {
    icon: 'torc',
    color: 'darkgreen'
  },
  Cadenas: {
    icon: 'primitive-necklace',
    color: 'chocolate'
  },
  Tobillera: {
    icon: 'gem-chain',
    color: 'chocolate'
  },
  Rhodio: {
    icon: 'diamond-necklace',
    color: 'teal'
  },
};

export const getIconFromType = (type: Type) => {
  return iconsMap[type]?.icon || iconsMap.default.icon;
}

export const getColorFromType = (type: Type) => {
  return iconsMap[type]?.color || iconsMap.default.color;
}