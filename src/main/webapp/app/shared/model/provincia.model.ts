import { IRegione } from './regione.model';

export interface IProvincia {
  id?: number;
  nome?: string;
  prefisso?: string;
  codice?: string;
  abitanti?: number;
  area?: number;
  regione?: IRegione;
}

export class Provincia implements IProvincia {
  constructor(
    public id?: number,
    public nome?: string,
    public prefisso?: string,
    public codice?: string,
    public abitanti?: number,
    public area?: number,
    public regione?: IRegione
  ) {}
}
