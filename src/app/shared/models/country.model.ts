export interface Country {
  capital: string;
  code2: string;
  code3: string;
  name: string;
  region: string;
  states: State[];
  subregion: string;
}

export interface State {
  code: string;
  name: string;
  subdivision: string;
}
