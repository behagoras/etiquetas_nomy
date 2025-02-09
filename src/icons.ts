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
    color: 'indigo'
  },
  'Cadenas Fashion': {
    icon: 'cut-diamond',
    color: 'indigo'
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
    color: 'darkblue'
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
    color: 'darkblue'
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
    color: 'teal'
  },
};

export const getIconFromType = (type: Type) => {
  return iconsMap[type]?.icon || iconsMap.default.icon;
}

export const getColorFromType = (type: Type) => {
  return iconsMap[type]?.color || iconsMap.default.color;
}