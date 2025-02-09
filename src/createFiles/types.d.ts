export interface FirstPAge {
  type: Type;
  tray: string;
  code_type: string;
  code_number: string;
  gheller: string;
  description: string;
  comments: string;
  comments_2?: string;
  icon?: string;
}

export interface SecondPage {
  type: Type;
  tray: string;
  code_type: string;
  from: string;
  to: string;
  description: string;
  icon?: string;
}

export interface ThirdPage {
  type: Type;
  box: string;
  icon?: string;
}

export interface Groups {
  [type: string]: {
    [tray: string]: FirstPAge[];
  };
}



export type Type = 'default' | 'Anillos' | 'Aretes' | 'Arracadas' | 'Broqueles' | 'Cadenas' | 'Cauchos' | 'Conjunto' | 'Defectuoso' | 'Dijes' | 'Esclavas' | 'Fashion' | 'Huggies' | 'Juegos' | 'Pulseras' | 'Rosario' | 'Tobillera'| 'Cadenas Fashion'| 'Cadena Fashion' |'';

export /**
* Represents a formatted card.
*/
interface Card {
 count: string;
 title: string;
 contents: string[];
 tags: string[];
 color: string;
 icon: string;
 icon_back?: string;
 title_size: string;
 card_font_size: string;
}