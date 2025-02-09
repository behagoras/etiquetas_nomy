export interface FirstPAge {
  type: Type;
  tray: string;
  code_type: string;
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



export type Type = 'default' | 'Anillos' | 'Aretes' | 'Arracadas' | 'Broqueles' | 'Cadenas' | 'Cauchos' | 'Conjunto' | 'Defectuoso' | 'Dijes' | 'Esclavas' | 'Fashion' | 'Huggies' | 'Juegos' | 'Pulseras' | 'Rosario' | 'Tobillera'| 'Cadenas Fashion' |'';
