import { IProvincia } from './provincia.model';
import { INazione } from './nazione.model';

export interface IRegione {
  id?: number;
  nome?: string;
  abitanti?: number;
  area?: number;
  provinces?: IProvincia[];
  nazione?: INazione;
}

export class Regione implements IRegione {
  constructor(
    public id?: number,
    public nome?: string,
    public abitanti?: number,
    public area?: number,
    public provinces?: IProvincia[],
    public nazione?: INazione
  ) {}
}
